import { useSteamderStore } from "@store/steamderStore";

export const retrieveSteamder = (swipedGames: string[], endTime: number) => {
    const { setSteamder, steamder } = useSteamderStore.getState();
    if (!steamder) return;

    const swipped = swipedGames.map(game => parseInt(game));
    setSteamder({
        ...steamder,
        common_games: steamder.common_games.filter(game => !swipped.includes(game)),
        all_games: steamder.all_games.filter(game => !swipped.includes(game)),
        swiped_games: swipped,
        endTime
    });
    
}