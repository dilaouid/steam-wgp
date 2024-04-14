export const unswipeCard = (gameId: number) => {
    return JSON.stringify({ action: 'unswipe', payload: { gameId } });
};