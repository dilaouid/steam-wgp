import { createContext, useContext, useEffect, useState } from 'react';
import { connectWebSocket } from '../api/websocket';
import { getCookieValue } from '../utils/getCookie';
import { Room } from '.';

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ socket, setSocket ] = useState<WebSocket | null>(null);
    const { room } = useContext(Room.Context)!;

    useEffect(() => {
        const token = getCookieValue('token');
        if (!token || !room) return;

        const newSocket = connectWebSocket(room.id, token);
        setSocket(newSocket);

        return () => newSocket && newSocket.close();
    }, [ room ]);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};