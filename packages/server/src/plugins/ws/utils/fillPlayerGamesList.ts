import { PlayerInfo, Waitlist } from "../types";

export const fillPlayerGamesList = (waitlists: Map<any, any>) => {
  // fill the playerGames list with the games of each player
  waitlists.forEach((waitlist: Waitlist) => {
    waitlist.players.forEach((player: PlayerInfo) => {
      waitlist.playerGames[player.player_id] = player.games;
    });
  });
}