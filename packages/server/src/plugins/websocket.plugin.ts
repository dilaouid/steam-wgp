import { FastifyInstance } from 'fastify';
import { RawData, WebSocket } from 'ws';
import websocket from '@fastify/websocket'

import { and, eq } from 'drizzle-orm';

import jwt from 'jsonwebtoken';

import { games, libraries, players } from '../infrastructure/data/schemas';

import { createSteamder, joinSteamder } from './ws/utils';
import { PlayerInfo } from './ws/types';
import { swipe, leave, kick, unswipe, update, allGamesSwitch } from './ws/actions';
import { start } from './ws/actions/start';

export const websocketPlugin = (fastify: FastifyInstance) => {

  const steamders = new Map();
  const userAuthMap = new Map();

  fastify.decorate('steamders', steamders);

  const handleSocketClose = (steamderId: string, socket: WebSocket, clientId: string) => {
    const steamderEntry = steamders.get(steamderId);
    if (steamderEntry)
      steamderEntry.sockets.delete(socket);
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

    // websocket route for steamder actions
    fastify.get('/ws/:steamderId', { websocket: true },
      async (connection, req) => {
        const { steamderId } = req.params as { steamderId: string };
        const clientId = req.socket.remoteAddress + ":" + req.socket.remotePort;
        if (!clientId) throw new Error('No user provided');

        const playerId = userAuthMap.get(clientId);
        const playerData = await fastify.db.selectDistinct()
          .from(players)
          .rightJoin(libraries,
            and(
              eq(players.id, libraries.player_id),
              eq(libraries.hidden, false)
            )
          )
          .rightJoin(games, eq(libraries.game_id, games.id))
          .where(
            and(
              eq(players.id, BigInt(playerId)),
              eq(games.is_selectable, true)
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

        // create the steamder if it doesn't exist yet
        let steamderEntry = steamders.get(steamderId);

        if (!steamderEntry) {
          await createSteamder(fastify, steamderId, player, steamders);
          steamderEntry = steamders.get(steamderId);
          if (!steamderEntry) {
            fastify.log.error(`Steamder ${steamderId} couldn't be created`);
            connection.socket.close();
            return;
          }
        } else {
          const joined = await joinSteamder(fastify, steamderId, player, steamders);
          if (!joined) {
            fastify.log.error(`Player ${playerId} couldn't join steamder ${steamderId}`);
            connection.socket.close();
            return;
          }
        }

        // add the socket to the steamder
        steamderEntry.sockets.add(connection.socket);

        const steamderClients = steamders.get(steamderId);
        if (!steamderClients)
          throw new Error('steamderClients is undefined');
        steamderEntry.sockets.add(connection.socket);

        // inform every player that a new player joined the steamder (except the new player)
        steamderEntry.sockets.forEach((client: any) => {
          if (client !== connection.socket) {
            client.send(JSON.stringify({ action: 'join', player }));
          }
        });

        // get the all the swipped games from steamderEntry of the player with the playerId
        if (steamderClients.started && !steamderClients.ended && steamderClients.swipedGames) {
          const swipedGames = Object.keys(steamderClients.swipedGames);
          const swipedGamesPlayer = swipedGames.filter((gameId: string) => steamderClients.swipedGames[gameId].includes(playerId));
          steamderClients.sockets.forEach((client: any) => {
            if (client === connection.socket) {
              client.send(JSON.stringify({ action: 'retrieve', swipedGames: swipedGamesPlayer, endTime: steamderClients.endTime }));
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
            swipe(fastify, steamders, steamderId, payload.gameId, playerId);
            break;

            // when the admin starts the steamder
          case 'start':
            start(fastify, steamderClients, steamderId, playerId, steamders);
            break;

            // when a player leaves the steamder
          case 'leave': {
            leave(fastify, steamderId, steamderClients, playerId);
            break;
          }
          // when a player is kicked from the steamder
          case 'kick': {
            await kick(fastify, steamderId, playerId, payload.playerId, steamderClients);
            break;
          }
          // when a player unswipes a game
          case 'unswipe':
            unswipe(fastify, steamderClients, payload.gameId);
            break;

          // when a player updates his library
          case 'update': {
            update(fastify, steamderClients, steamderId, payload.publicGames, playerId);
            break;
          }
          // when the admin switch between common games and all games
          case 'allGamesSwitch':
            allGamesSwitch(fastify, steamderClients, steamderId, playerId);
            break;

          default:
            fastify.log.error(`Unknown action: ${action}`);
            break;
          }
        });

        connection.socket.on('close', () => {
          const clientId = req.socket.remoteAddress + ":" + req.socket.remotePort;
          handleSocketClose(steamderId, connection.socket, clientId);
        });
      });

  });
};