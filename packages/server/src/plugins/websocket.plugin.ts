import { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket'
import jwt from 'jsonwebtoken';
import { Games, Libraries, Players, Waitlists, WaitlistsPlayers } from '../models';
import { and, eq, inArray } from 'drizzle-orm';
import { Game } from '../models/Games';
import { RawData, WebSocket } from 'ws';

interface PlayerInfo {
    avatar_hash: string;
    player_id: string;
    username: string;
    games: number[];
}

interface Waitlist {
  adminId: string;
  players: PlayerInfo[];
  playerGames: Record<string, number[]>;
  commonGames: number[];
  swipedGames: Record<number, string[]>;
  started: boolean;
  ended: boolean;
  winner?: number;
  sockets: Set<any>;
}

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

  const deleteWaitlist = async (waitlistId: string): Promise<void> => {
    const waitlist: Waitlist = waitlists.get(waitlistId);
    if (!waitlist) return;

    // delete the waitlist in the database
    await fastify.db.delete(Waitlists.model)
      .where(eq(Waitlists.model.id, waitlistId))
      .execute();

    // delete the waitlist in the memory
    waitlists.delete(waitlistId);
  };

  const createWaitlist = async (waitlistId: string, player: PlayerInfo): Promise<void> => {
    fastify.log.info(`---------Creating waitlist ${waitlistId}---------`);
    const existingWaitlist = await fastify.db.select()
      .from(Waitlists.model)
      .leftJoin(WaitlistsPlayers.model, eq(Waitlists.model.id, WaitlistsPlayers.model.waitlist_id))
      .where(and(
        eq(Waitlists.model.id, waitlistId)
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

  const leaveWaitlist = (waitlistId: string, playerId: string): void => {
    const waitlist: Waitlist = waitlists.get(waitlistId);
    if (waitlist) {
      waitlist.players = waitlist.players.filter((player: PlayerInfo) => player.player_id !== playerId);
      delete waitlist.playerGames[playerId];
    }
  };

  const swipeGame = (waitlistId: string, playerId: string, gameId: number): void => {
    const waitlist: Waitlist = waitlists.get(waitlistId);
    if (waitlist && waitlist.started && !waitlist.ended && waitlist.commonGames.includes(gameId)) {
      if (waitlist.swipedGames[gameId] && !waitlist.swipedGames[gameId].includes(playerId)) {
        waitlist.swipedGames[gameId].push(playerId);
      } else {
        waitlist.swipedGames[gameId] = [playerId];
      }
    }
  };

  // check if a game is swiped by all the players
  const checkGameEnd = (waitlistId: string, gameId: number): boolean => {
    const waitlist: Waitlist = waitlists.get(waitlistId);
    if (waitlist && waitlist.started && !waitlist.ended) {
      const swipedGames = waitlist.swipedGames[gameId];
      const players = waitlist.players;

      const gameEnd = swipedGames.length === players.length;

      waitlist.ended = gameEnd;
      if (waitlist.ended)
        waitlist.winner = gameId;
      return gameEnd;
    }
    return false;
  };

  const startWaitlist = async (waitlistId: string): Promise<void> => {
    const waitlist: Waitlist = waitlists.get(waitlistId);
    if (!waitlist || waitlist.players.length < 2) return;

    const playersAndGamesInfo = await fastify.db.select().from(WaitlistsPlayers.model)
      .leftJoin(Libraries.model, eq(WaitlistsPlayers.model.player_id, Libraries.model.player_id))
      .where(
        and(
          eq(WaitlistsPlayers.model.waitlist_id, waitlistId),
          eq(Libraries.model.hidden, false)
        )
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

    const initialGames = waitlist.playerGames[waitlist.players[0].player_id] || [];
    waitlist.commonGames = waitlist.players.reduce((commonGames, player) => {
      const currentGames = waitlist.playerGames[player.player_id] || [];
      if (commonGames.length === 0) return currentGames;
      return commonGames.filter(game => currentGames.includes(game));
    }, initialGames);

    const commonSelectableGames = await fastify.db.select({ id: Games.model.id })
      .from(Games.model)
      .where(
        and(
          inArray(Games.model.id, waitlist.commonGames),
          eq(Games.model.is_selectable, true)
        )
      )
      .execute();

    if (commonSelectableGames.length !== waitlist.commonGames.length) {
      fastify.log.error(`Not all common games are selectable for room ${waitlistId}`);
      return;
    }

    // update the waitlist in the database (start: true)
    await fastify.db.update(Waitlists.model)
      .set({ started: true })
      .where(eq(Waitlists.model.id, waitlistId))
      .execute();

    waitlist.commonGames = commonSelectableGames.map((game: Game) => game.id)
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
          .rightJoin(Libraries.model, eq(Players.model.id, Libraries.model.player_id))
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
              games: []
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
          games: playersInfo[playerId].games
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

          fastify.log.info(swipedGames);
          fastify.log.info(`Player ID: ${playerId}`);

          const swipedGamesPlayer = swipedGames.filter((gameId: string) => waitlistClients.swipedGames[gameId].includes(playerId));

          waitlistClients.sockets.forEach((client: any) => {
            if (client === connection.socket) {
              fastify.log.info(swipedGamesPlayer);
              client.send(JSON.stringify({ action: 'retrieve', swipedGames: swipedGamesPlayer } ));
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
            try {
              swipeGame(waitlistId, playerId, payload.gameId);
              if (checkGameEnd(waitlistId, payload.gameId)) {
                // get the game that is swiped by all the players
                waitlistEntry.sockets.forEach((client: any) => {
                  client.send(JSON.stringify({ action: 'gameEnd', winner: waitlistClients.winner }));
                });
                deleteWaitlist(waitlistId);
              }
            } catch (error) {
              fastify.log.error(`Error in 'swipe' action: ${error}`);
            }
            break;

            // when the admin starts the waitlist
          case 'start':
            try {
              if (waitlistClients.players.length < 2) return;

              // cannot start if the waitlist is already started or ended
              if (waitlistClients.started || waitlistClients.ended) return;
              await startWaitlist(waitlistId);
              // send message to all players
              waitlistEntry.sockets.forEach((client: any) => {
                client.send(JSON.stringify({ action: 'start' }));
              });

              // wait for 10 minutes before ending the waitlist
              setTimeout(() => {
                if (!waitlistClients || !waitlistClients.started || waitlistClients.ended) return;
                waitlistClients.ended = true;

                const swipedGames = Object.keys(waitlistClients.swipedGames);
                // pick the most swiped game, if there is one
                if (swipedGames.length > 0) {
                  const mostSwipedGame = swipedGames.reduce((a, b) => waitlistClients.swipedGames[a].length > waitlistClients.swipedGames[b].length ? a : b);
                  waitlistClients.winner = parseInt(mostSwipedGame);
                } else {
                  waitlistClients.winner = waitlistClients.commonGames[Math.floor(Math.random() * waitlistClients.commonGames.length)];
                }

                waitlistEntry.sockets.forEach((client: any) => {
                  client.send(JSON.stringify({ action: 'gameEnd', winner: waitlistClients.winner }));
                });
                deleteWaitlist(waitlistId);
              }, 600000);

            } catch (error) {
              fastify.log.error(`Error in 'start' action: ${error}`);
            }
            break;

            // when a player leaves the waitlist
          case 'leave':
            if (waitlistClients.started || waitlistClients.ended) return;
            leaveWaitlist(waitlistId, playerId);
            // send message to all players
            waitlistEntry.sockets.forEach((client: any) => {
              const data = playerId === waitlistClients.adminId ? { action: 'end' } : { action: 'leave', player };
              client.send(JSON.stringify(data));
            });
            break;

          // when a player is kicked from the waitlist
          case 'kick':
            try {
              if (waitlistClients.started || waitlistClients.ended) return;
              leaveWaitlist(waitlistId, payload.playerId);
              // send message to all players
              waitlistEntry.sockets.forEach((client: any) => {
                client.send(JSON.stringify({ action: 'kicked', playerId: payload.playerId }));
              });
            } catch (error) {
              fastify.log.error(`Error in 'kick' action: ${error}`);
            }
            break;

          // when a player unswipes a game
          case 'unswipe':
            try {
              if (!waitlistClients.started || waitlistClients.ended) return;
              const swipedGames = waitlistClients.swipedGames[payload.gameId];
              if (swipedGames) {
                waitlistClients.swipedGames[payload.gameId] = swipedGames.filter((playerId: string) => playerId !== playerId);
              }
            } catch (error) {
              fastify.log.error(`Error in 'unswipe' action: ${error}`);
            }
            break;

          // when a player updates his library
          case 'update':
            try {
              if (waitlistClients.started || waitlistClients.ended) return;
              const playerGames = payload.library.map(Number);
              waitlistClients.playerGames[playerId] = playerGames;
              const allPlayerGameArrays: number[][] = Object.values(waitlistClients.playerGames);
              const commonGames = allPlayerGameArrays.reduce<number[] | null>((common, games) => {
                if (!common) return games;
                return common.filter(game => games.includes(game));
              }, null);

              waitlistClients.commonGames = commonGames || [];

              waitlistEntry.sockets.forEach((client: any) => {
                client.send(JSON.stringify({ action: 'update', player: { player_id: playerId, games: playerGames }, commonGames: waitlistClients.commonGames }));
              });
            } catch (error) {
              fastify.log.error(`Error in 'update' action: ${error}`);
            }
            break;

          default:
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