const BASE_URL = import.meta.env.VITE_BASE_WS_URL;

export const connectWebSocket = (waitlistId: string, token: string): WebSocket => {
    const wsUrl = `${BASE_URL}/ws/${waitlistId}`;
    const socket = new WebSocket(wsUrl, [token]);

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Data received from server', data);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error', error);
    };

    return socket;
};

export const swipeCard = (socket: WebSocket, gameId: number) => {
    if (socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ action: 'swipe', payload: { gameId } });
        socket.send(message);
    }
};

export const unswipeCard = (socket: WebSocket, gameId: number) => {
    if (socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ action: 'unswipe', payload: { gameId } });
        socket.send(message);
    }
};

export const startWaitlist = (socket: WebSocket) => {
    const message = JSON.stringify({ action: 'start' });
    socket.send(message);
};

export const leaveWaitlist = (socket: WebSocket) => {
    const message = JSON.stringify({ action: 'leave' });
    socket.send(message);
};

export const updateLibrary = (socket: WebSocket, library: string[]) => {
    const message = JSON.stringify({ action: 'update', payload: { library } });
    socket.send(message);
};