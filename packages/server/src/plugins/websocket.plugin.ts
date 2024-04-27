import { FastifyInstance } from 'fastify';
import { RawData, WebSocket } from 'ws';
import websocket from '@fastify/websocket'

import { and, eq } from 'drizzle-orm';

import jwt from 'jsonwebtoken';

import { Games, Libraries, Players, Waitlists, WaitlistsPlayers } from '../models';
import { Game } from '../models/Games';

import { calculateAllGames, checkCommonGames, deleteWaitlist } from './ws/utils';
import { Waitlist, PlayerInfo } from './ws/types';
import { swipe, leave, kick, unswipe, update, allGamesSwitch } from './ws/actions';

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

  const fillPlayerGamesList = () => {
    // fill the playerGames list with the games of each player
    waitlists.forEach((waitlist: Waitlist) => {
      waitlist.players.forEach((player: PlayerInfo) => {
        waitlist.playerGames[player.player_id] = player.games;
      });
    });
  }

  const createWaitlist = async (waitlistId: string, player: PlayerInfo): Promise<void> => {
    fastify.log.info(`---------Creating waitlist ${waitlistId}---------`);
    const existingWaitlist = await fastify.db.select()
      .from(Waitlists.model)
      .leftJoin(WaitlistsPlayers.model, eq(Waitlists.model.id, WaitlistsPlayers.model.waitlist_id))
      .where(and(
        eq(Waitlists.model.id, waitlistId),
        eq(Waitlists.model.complete, false)
      ))
      .execute();

    if (existingWaitlist.length === 0) {
      fastify.log.error(`Waitlist ${waitlistId} doesn't exists`);
      return;
    }

    // check if player is in the waitlist
    const IsPlayerInWaitlist = existingWaitlist.some((row: any) => {
      return row.waitlists_players.player_id === BigInt(player.player_id);
    });
    if (!IsPlayerInWaitlist) {
      fastify.log.error(`Player ${player.player_id} is not in waitlist ${waitlistId}`);
      return;
    }

    const adminId = existingWaitlist[0].waitlists.admin_id.toString();
    const waitlist: Waitlist = {
      adminId,
      players: [player],
      playerGames: {},
      commonGames: [],
      swipedGames: {},
      started: existingWaitlist[0].waitlists.started,
      display_all_games: existingWaitlist[0].waitlists.display_all_games,
      ended: false,
      sockets: new Set()
    };
    waitlists.set(waitlistId, waitlist);
  };

  const joinWaitlist = async (waitlistId: string, player: PlayerInfo): Promise<boolean> => {
    const playerInDb = await fastify.db.select()
      .from(WaitlistsPlayers.model)
      .where(and(
        eq(WaitlistsPlayers.model.waitlist_id, waitlistId),
        eq(WaitlistsPlayers.model.player_id, BigInt(player.player_id))
      ))
      .execute();

    if (playerInDb.length === 0) {
    // L'utilisateur n'est pas dans la liste d'attente en base de données
      fastify.log.warn(`Player ${player.player_id} is not in waitlist ${waitlistId} in the database.`);
      return false;
    }

    if (!player.username) {
      fastify.log.warn(`Player ${player.player_id} doesn't have a username.`);
      return false;
    }

    const waitlist: Waitlist = waitlists.get(waitlistId);
    if (!waitlist) return false;

    const existingPlayerIndex = waitlist.players.findIndex(p => p.player_id === player.player_id);
    if (existingPlayerIndex > -1) {
      waitlist.players[existingPlayerIndex] = player;
    } else {
      fastify.log.info(`Player ${player.player_id} joined waitlist ${waitlistId}`);
      waitlist.players.push(player);
    }

    fillPlayerGamesList();

    const initialGames = waitlist.playerGames[waitlist.players[0].player_id] || [];
    waitlist.commonGames = waitlist.players.reduce((commonGames, player) => {
      const currentGames = waitlist.playerGames[player.player_id] || [];
      if (commonGames.length === 0) return currentGames;
      return commonGames.filter(game => currentGames.includes(game));
    }, initialGames);

    return true;
  };

  const startWaitlist = async (waitlistId: string, allGames: number[]): Promise<void> => {
    const waitlist: Waitlist = waitlists.get(waitlistId);
    if (!waitlist || waitlist.players.length < 2) return;

    const playersAndGamesInfo = await fastify.db.select().from(WaitlistsPlayers.model)
      .leftJoin(
        Libraries.model,
        and(
          eq(WaitlistsPlayers.model.player_id, Libraries.model.player_id),
          eq(Libraries.model.hidden, false)
        )
      )
      .where(
        eq(WaitlistsPlayers.model.waitlist_id, waitlistId)
      )
      .execute();

    // check if all players are in the waitlist
    const allPlayersPresent = waitlist.players.every((player: PlayerInfo) =>
      playersAndGamesInfo.some((row: any) => row.waitlists_players.player_id !== BigInt(player?.player_id)));

    if (!allPlayersPresent) {
      fastify.log.error(`Mismatch in players present in the room ${waitlistId}`);
      return;
    }
    fillPlayerGamesList();

    if (!waitlist.display_all_games) {
      const commonSelectableGames = await checkCommonGames(waitlist, waitlistId, fastify);
      if (!commonSelectableGames) return;
      waitlist.commonGames = commonSelectableGames.map((game: Game) => game.id)
    } else {
      waitlist.commonGames = allGames;
    }

    // update the waitlist in the database (start: true)
    await fastify.db.update(Waitlists.model)
      .set({ started: true })
      .where(eq(Waitlists.model.id, waitlistId))
      .execute();
    waitlist.started = true;
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
          await createWaitlist(waitlistId, player);
          waitlistEntry = waitlists.get(waitlistId);
          if (!waitlistEntry) {
            fastify.log.error(`Waitlist ${waitlistId} couldn't be created`);
            connection.socket.close();
            return;
          }
        } else {
          const joined = await joinWaitlist(waitlistId, player); // push the add who join?
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
            try {
              if (waitlistClients.players.length < 2) return;
              // cannot start if the waitlist is already started or ended
              if (waitlistClients.started || waitlistClients.ended) return;
              if (playerId !== waitlistClients.adminId) return;

              const allGames = waitlistClients.display_all_games ? calculateAllGames(waitlistClients) : [];
              await startWaitlist(waitlistId, allGames);

              // count 5 seconds per game
              const timing = (waitlistClients.display_all_games ? allGames.length : waitlistClients.commonGames.length) * 2000;

              const endTime = Date.now() + timing + 20000;
              waitlistClients.endTime = endTime;

              // send message to all players
              waitlistEntry.sockets.forEach((client: any) => {
                fastify.log.info(`Starting waitlist ${waitlistId}`);
                client.send(JSON.stringify({ action: 'start', endTime: waitlistClients.endTime }));
              });

              // wait for x minutes before ending the waitlist
              setTimeout(() => {
                if (!waitlistClients || !waitlistClients.started || waitlistClients.ended) return;
                waitlistClients.ended = true;

                const swipedGames = Object.keys(waitlistClients.swipedGames);
                // pick the most swiped game, if there is one
                if (swipedGames.length > 0) {
                  const mostSwipedGame = swipedGames.reduce((a, b) => waitlistClients.swipedGames[a].length > waitlistClients.swipedGames[b].length ? a : b);
                  waitlistClients.winner = parseInt(mostSwipedGame);
                } else {
                  // check if display_all_games is true, the random game will be picked from all games otherwise from common games
                  waitlistClients.winner =
                    waitlistClients.display_all_games ?
                      allGames[Math.floor(Math.random() * allGames.length)] :
                      waitlistClients.commonGames[Math.floor(Math.random() * waitlistClients.commonGames.length)];
                }

                waitlistEntry.sockets.forEach((client: any) => {
                  client.send(JSON.stringify({ action: 'gameEnd', choosed_game: waitlistClients.winner }));
                });
                deleteWaitlist(fastify, waitlistId, waitlistClients.winner);
              }, timing + 20000);

            } catch (error) {
              fastify.log.error(`Error in 'start' action: ${error}`);
            }
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