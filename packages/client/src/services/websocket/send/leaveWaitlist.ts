export const leaveWaitlist = (socket: WebSocket) => {
    const message = JSON.stringify({ action: 'leave' });
    socket.send(message);
};