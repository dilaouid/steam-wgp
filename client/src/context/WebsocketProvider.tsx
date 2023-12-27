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
        if (!token || !room) return;

        const newSocket = connectWebSocket(room.id, token);
        setSocket(newSocket);

        return () => {
            if (newSocket) newSocket.close();
        };
    }, [room]);

    return (
        <Context.Provider value={ { socket, setSocket } }>
            {children}
        </Context.Provider>
    );
};