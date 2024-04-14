export const unswipeCard = (socket: WebSocket, gameId: number) => {
    if (socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ action: 'unswipe', payload: { gameId } });
        socket.send(message);
    }
};