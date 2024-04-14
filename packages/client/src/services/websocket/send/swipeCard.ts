export const swipeCard = (gameId: number) => {
    return JSON.stringify({ action: 'swipe', payload: { gameId } });
};