export const updateLibrary = (socket: WebSocket, library: string[]) => {
    const message = JSON.stringify({ action: 'update', payload: { library } });
    socket.send(message);
};