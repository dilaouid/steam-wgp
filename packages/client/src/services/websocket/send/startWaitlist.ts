export const startWaitlist = (socket: WebSocket) => {
    const message = JSON.stringify({ action: 'start' });
    socket.send(message);
};