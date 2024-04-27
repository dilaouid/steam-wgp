import { FastifyInstance } from 'fastify';
import { RawData, WebSocket } from 'ws';
import websocket from '@fastify/websocket'

import { and, eq } from 'drizzle-orm';

import jwt from 'jsonwebtoken';

import { Games, Libraries, Players } from '../models';

import { createWaitlist, joinWaitlist } from './ws/utils';
import { PlayerInfo } from './ws/types';
import { swipe, leave, kick, unswipe, update, allGamesSwitch } from './ws/actions';
import { start } from './ws/actions/start';

export const websocketPlugin = (fastify: FastifyInstance) => {

  const waitlists = new Map();
  const userAuthMap = new Map();

  fastify.decorate('waitlists', waitlists);

  const handleSocketClose = (waitlistId: string, socket: WebSocket, clientId: string) => {
    const waitlistEntry = waitlists.get(waitlistId);
    if (waitlistEntry)
      waitlistEntry.sockets.delete(socket);
    userAuthMap.delete(clientId);
  };

  return fastify.register(websocket, { options: {
    maxPayload: 1048576,
    server: fastify.server,
    verifyClient: function (info: any, next: any) {
      try {
        const token = info.req.headers['sec-websocket-protocol'];
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, fastify.config.SECRET_KEY);

        const clientId = info.req.socket.remoteAddress + ":" + info.req.socket.remotePort;
        const userId = (decoded as { id: string }).id;
        userAuthMap.set(clientId, userId);

        next(true);
      } catch (err) {
        fastify.log.error(err);
        fastify.log.error('WebSockets Authentification error', err);
        next(false, 401, 'Unauthorized');
      }
    }
  }}).after(() => {

    // websocket route for waitlist actions
    fastify.get('/ws/:waitlistId', { websocket: true },
      async (connection, req) => {
        const { waitlistId } = req.params as { waitlistId: string };
        const clientId = req.socket.remoteAddress + ":" + req.socket.remotePort;
        if (!clientId) throw new Error('No user provided');

        const playerId = userAuthMap.get(clientId);
        const playerData = await fastify.db.selectDistinct()
          .from(Players.model)
          .rightJoin(Libraries.model,
            and(
              eq(Players.model.id, Libraries.model.player_id),
              eq(Libraries.model.hidden, false)
            )
          )
          .rightJoin(Games.model, eq(Libraries.model.game_id, Games.model.id))
          .where(
            and(
              eq(Players.model.id, BigInt(playerId)),
              eq(Games.model.is_selectable, true)
            )
          ).execute();

        const playersInfo: any = {};

        playerData.forEach((entry: any) => {
          // Utiliser l'ID du joueur comme clé pour regrouper les données
          const id = entry.players.id.toString();

          if (!playersInfo[id]) {
            playersInfo[id] = {
              avatar_hash: entry.players.avatar_hash,
              player_id: id,
              username: entry.players.username,
              games: [],
              profileurl: entry.players.profileurl
            };
          }

          // Ajouter l'ID du jeu à la liste des jeux du joueur
          if (entry.games && entry.games.id) {
            playersInfo[id].games.push(entry.games.id);
          }
        });

        if (playerData.length === 0) {
          fastify.log.error(`Player ${playerId} doesn't exists`);
          connection.socket.close();
          return;
        }

        const player: PlayerInfo = {
          avatar_hash: playersInfo[playerId].avatar_hash,
          player_id: playerId,
          username: playersInfo[playerId].username,
          games: playersInfo[playerId].games,
          profileurl: playerData[0].players.profileurl
        }

        // create the waitlist if it doesn't exist yet
        let waitlistEntry = waitlists.get(waitlistId);

        if (!waitlistEntry) {
          await createWaitlist(fastify, waitlistId, player, waitlists);
          waitlistEntry = waitlists.get(waitlistId);
          if (!waitlistEntry) {
            fastify.log.error(`Waitlist ${waitlistId} couldn't be created`);
            connection.socket.close();
            return;
          }
        } else {
          const joined = await joinWaitlist(fastify, waitlistId, player, waitlists);
          if (!joined) {
            fastify.log.error(`Player ${playerId} couldn't join waitlist ${waitlistId}`);
            connection.socket.close();
            return;
          }
        }

        // add the socket to the waitlist
        waitlistEntry.sockets.add(connection.socket);

        const waitlistClients = waitlists.get(waitlistId);
        if (!waitlistClients)
          throw new Error('waitlistClients is undefined');
        waitlistEntry.sockets.add(connection.socket);

        // inform every player that a new player joined the waitlist (except the new player)
        waitlistEntry.sockets.forEach((client: any) => {
          if (client !== connection.socket) {
            client.send(JSON.stringify({ action: 'join', player }));
          }
        });

        // get the all the swipped games from waitlistEntry of the player with the playerId
        if (waitlistClients.started && !waitlistClients.ended && waitlistClients.swipedGames) {
          const swipedGames = Object.keys(waitlistClients.swipedGames);
          const swipedGamesPlayer = swipedGames.filter((gameId: string) => waitlistClients.swipedGames[gameId].includes(playerId));
          waitlistClients.sockets.forEach((client: any) => {
            if (client === connection.socket) {
              client.send(JSON.stringify({ action: 'retrieve', swipedGames: swipedGamesPlayer, endTime: waitlistClients.endTime }));
            }
          });
        }

        connection.socket.on('message', async (message: RawData) => {
          let data;
          try {
            data = JSON.parse(message.toString());
          } catch (error) {
            fastify.log.error(`Error parsing message: ${error}`);
          }
          const { action, payload } = data;
          switch (action) {

          // when a player swipes a game
          case 'swipe':
            swipe(fastify, waitlistClients, waitlistId, payload.gameId, playerId);
            break;

            // when the admin starts the waitlist
          case 'start':
            start(fastify, waitlistClients, waitlistId, playerId, waitlists);
            break;

            // when a player leaves the waitlist
          case 'leave': {
            leave(fastify, waitlistId, waitlistClients, playerId);
            break;
          }
          // when a player is kicked from the waitlist
          case 'kick': {
            kick(fastify, waitlistId, playerId, payload.playerId, waitlistClients);
            break;
          }
          // when a player unswipes a game
          case 'unswipe':
            unswipe(fastify, waitlistClients, payload.gameId);
            break;

          // when a player updates his library
          case 'update': {
            update(fastify, waitlistClients, waitlistId, payload.publicGames, playerId);
            break;
          }
          // when the admin switch between common games and all games
          case 'allGamesSwitch':
            allGamesSwitch(fastify, waitlistClients, waitlistId, playerId);
            break;

          default:
            fastify.log.error(`Unknown action: ${action}`);
            break;
          }
        });

        connection.socket.on('close', () => {
          const clientId = req.socket.remoteAddress + ":" + req.socket.remotePort;
          handleSocketClose(waitlistId, connection.socket, clientId);
        });
      });

  });
};