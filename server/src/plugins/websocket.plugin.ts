import { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket'
import jwt from 'jsonwebtoken';
import { Games, Libraries, Waitlists, WaitlistsPlayers } from '../models';
import { and, eq, inArray } from 'drizzle-orm';
import { Game } from '../models/Games';

export const websocketPlugin = (fastify: FastifyInstance) => {

  const waitlists = new Map();

  fastify.decorate('waitlists', waitlists);

  const createWaitlist = async (waitlistId: string, adminId: string): Promise<void> => {
    const existingWaitlist = await fastify.db.select()
      .from(Waitlists.model)
      .where(and(
        eq(Waitlists.model.id, waitlistId),
        eq(Waitlists.model.admin_id, BigInt(adminId))
      ))
      .execute();

    if (existingWaitlist.length === 0) {
      fastify.log.error(`Waitlist ${waitlistId} doesn't exists or user ${adminId} is not the admin`);
      return;
    }

    const waitlist = {
      adminId,
      players: [],
      playerGames: {},
      commonGames: [],
      swipedGames: [],
      started: false,
      ended: false
    }
    waitlists.set(waitlistId, waitlist);
  };

  const joinWaitlist = async (waitlistId: string, playerId: string, games: number[]): Promise<boolean> => {

    const playerInDb = await fastify.db.select()
      .from(WaitlistsPlayers.model)
      .where(and(
        eq(WaitlistsPlayers.model.waitlist_id, waitlistId),
        eq(WaitlistsPlayers.model.player_id, BigInt(playerId))
      ))
      .execute();

    if (playerInDb.length === 0) {
    // L'utilisateur n'est pas dans la liste d'attente en base de données
      fastify.log.warn(`Player ${playerId} is not in waitlist ${waitlistId} in the database.`);
      return false;
    }

    const waitlist = waitlists.get(waitlistId);
    if (waitlist) {
      waitlist.players.push(playerId);
      waitlist.playerGames[playerId] = games;
    }

    return true;
  };

  const leaveWaitlist = (waitlistId: string, playerId: string): void => {
    const waitlist = waitlists.get(waitlistId);
    if (waitlist) {
      waitlist.players = waitlist.players.filter((id: string) => id !== playerId);
      delete waitlist.playerGames[playerId];
    }
  };

  const swipeGame = (waitlistId: string, playerId: string, gameId: number, positive: boolean): void => {
    const waitlist = waitlists.get(waitlistId);
    if (waitlist && positive) {
      // check if the game is in the common games
      if (!waitlist.commonGames.includes(gameId)) return;

      if (!waitlist.swipedGames[gameId]) {
        waitlist.swipedGames[gameId] = [];
      }

      if (!waitlist.swipedGames[gameId]) {
        waitlist.swipedGames[gameId].push(playerId);
      }

      // check if the player already swiped the game
      if (waitlist.swipedGames[gameId].includes(playerId)) return;
    }
  };

  // check if a game is swiped by all the players
  const checkGameEnd = (waitlistId: string): boolean => {
    const waitlist = waitlists.get(waitlistId);
    if (waitlist) {
      const swipedGames = waitlist.swipedGames;
      const commonGames = waitlist.commonGames;
      const players = waitlist.players;

      const gameEnd = commonGames.find((game: number) => {
        const swipedPlayers = swipedGames[game];
        return swipedPlayers.length === players.length;
      });

      waitlist.ended = !!gameEnd;

      return !!gameEnd;
    }
    return false;
  };

  const startWaitlist = async (waitlistId: string): Promise<void> => {
    const waitlist = waitlists.get(waitlistId);
    if (!waitlist) return;

    const playersInDb = await fastify.db.select()
      .from(WaitlistsPlayers.model)
      .where(eq(WaitlistsPlayers.model.waitlist_id, waitlistId))
      .execute();

    const allPlayersPresent = waitlist.players.every((playerId: string) =>
      playersInDb.some((dbPlayer: any) => dbPlayer.player_id as string === playerId));

    if (!allPlayersPresent) {
      fastify.log.error(`Mismatch in players present in the room ${waitlistId}`);
      return;
    }

    // get all common games between all the players
    const allPlayerGames = waitlist.players.map((playerId: string) => waitlist.playerGames[playerId]);
    const initialGames = waitlist.playerGames[waitlist.players[0]] || [];
    waitlist.commonGames = allPlayerGames.reduce((commonGames: number[], currentGames: number[]) => {
      if (!commonGames) return currentGames;
      return commonGames.filter(game => currentGames.includes(game));
    }, initialGames);

    const selectableGames = await fastify.db.select()
      .from(Games.model)
      .where(inArray(Games.model.id, waitlist.commonGames))
      .andWhere(eq(Games.model.is_selectable, true))
      .execute();

    waitlist.commonGames = selectableGames.map((game: Game) => game.id);

    const libraryEntries = await fastify.db.select()
      .from(Libraries.model)
      .where(inArray(Libraries.model.game_id, waitlist.commonGames))
      .execute();

    const allGamesInLibrary = waitlist.commonGames.every((gameId: number) =>
      libraryEntries.some((entry: any) => entry.game_id === gameId));

    if (!allGamesInLibrary) {
      fastify.log.error(`Not all common games are in the players' libraries for room ${waitlistId}`);
      return;
    }

    waitlist.started = true;
  };

  return fastify.register(websocket, { options: {
    maxPayload: 1048576,
    server: fastify.server,
    verifyClient: function (info, next) {
      try {
        const token = info.req.headers['sec-websocket-protocol'];
        if (!token) throw new Error('No token provided');
        const decoded = jwt.verify(token, fastify.config.SECRET_KEY);
        (info.req as any).user = decoded;
        next(true);
      } catch (err) {
        fastify.log.error('WebSockets Authentification error', err);
        next(false, 401, 'Unauthorized');
      }
    }
  }}).after(() => {

    // websocket route for waitlist actions
    fastify.get('/ws/:waitlistId', { websocket: true }, async (connection, req) => {
      const { waitlistId } = req.params as { waitlistId: string };
      const playerId = (req as any).user.id;

      const joined = await joinWaitlist(waitlistId, playerId, []);
      if (!joined) {
        connection.socket.close();
        return;
      }

      let waitlistEntry = waitlists.get(waitlistId);
      if (!waitlistEntry) {
        await createWaitlist(waitlistId, playerId);
        waitlistEntry = waitlists.get(waitlistId);
        if (!waitlistEntry) {
          connection.socket.close();
          return;
        }
      }

      waitlistEntry.sockets.add(connection.socket);

      const waitlistClients = waitlists.get(waitlistId);
      if (!waitlistClients)
        throw new Error('waitlistClients is undefined');
      waitlistClients.add(connection.socket);

      connection.socket.on('close', () => {
        waitlistClients.delete(connection.socket);
      });
    });

  });
};