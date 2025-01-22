import { FastifyInstance } from "fastify";
import { updateCommonGames } from "@plugins/ws/utils";

import { Steamder } from "@plugins/ws/types";

export const WebSocketService = {
  notifyPlayersInSteamder: (
    fastify: FastifyInstance,
    steamderId: string,
    event: { action: string; [key: string]: any }
  ) => {
    const steamderEntry = fastify.steamders.get(steamderId);
    if (steamderEntry) {
      // Cast en Steamder pour l'usage interne de la méthode
      const steamder = steamderEntry as unknown as Steamder;
      steamder.sockets.forEach((socket: any) => {
        socket.send(JSON.stringify(event));
      });
    }
  },

  closeSteamderConnections: (
    fastify: FastifyInstance,
    steamderId: string
  ) => {
    const steamderEntry = fastify.steamders.get(steamderId);
    if (steamderEntry) {
      const steamder = steamderEntry as unknown as Steamder;
      steamder.sockets.forEach((socket: any) => {
        socket.close();
      });
      fastify.steamders.delete(steamderId);
    }
  },

  removePlayerFromSteamder: (
    fastify: FastifyInstance,
    steamderId: string,
    playerId: string
  ) => {
    const steamderEntry = fastify.steamders.get(steamderId);
    if (steamderEntry) {
      const steamder = steamderEntry as unknown as Steamder;
      steamder.players = steamder.players.filter(p => p.player_id !== playerId);
      delete steamder.playerGames[playerId];
      updateCommonGames(steamder);
    }
  }
};