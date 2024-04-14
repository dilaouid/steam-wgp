export const swipeCard = (socket: WebSocket, gameId: number) => {
    if (socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ action: 'swipe', payload: { gameId } });
        socket.send(message);
    }
};