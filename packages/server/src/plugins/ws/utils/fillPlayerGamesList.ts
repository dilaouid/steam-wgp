import { PlayerInfo, Steamder } from "../types";

export const fillPlayerGamesList = (steamders: Map<any, any>) => {
  // fill the playerGames list with the games of each player
  steamders.forEach((steamder: Steamder) => {
    steamder.players.forEach((player: PlayerInfo) => {
      steamder.playerGames[player.player_id] = player.games;
    });
  });
}