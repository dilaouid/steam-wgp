import { Waitlist } from "../types";

export const updateCommonGames = (waitlist: Waitlist) => {
  const playerIds = Object.keys(waitlist.playerGames);

  let commonGamesSet = new Set<number>(waitlist.playerGames[playerIds[0]]);

  playerIds.slice(1).forEach((playerId) => {
    const gamesSet = new Set(waitlist.playerGames[playerId]);
    commonGamesSet = new Set(
      [...commonGamesSet].filter((game) => gamesSet.has(game))
    );
  });
  const common_games = Array.from(commonGamesSet);
  waitlist.commonGames = common_games;
};
