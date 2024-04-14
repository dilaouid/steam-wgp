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