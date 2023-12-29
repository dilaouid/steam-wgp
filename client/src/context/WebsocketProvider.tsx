import { createContext, useContext, useEffect, useState } from 'react';
import { connectWebSocket } from '../api/websocket';
import { getCookieValue } from '../utils/getCookie';
import { Room } from '.';

interface WebSocketContextType {
    socket: WebSocket | null;
    setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>;
}

export const Context = createContext<WebSocketContextType | null>(null);

export const Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const { room } = useContext(Room.Context)!;

    useEffect(() => {
        const token = getCookieValue('token');
        const roomId = room?.id;
        if (!token || !roomId) return;

        const newSocket = connectWebSocket(roomId, token);
        setSocket(newSocket);

        return () => {
            if (newSocket) newSocket.close();
        };
    }, [room?.id]);

    return (
        <Context.Provider value={ { socket, setSocket } }>
            {children}
        </Context.Provider>
    );
};