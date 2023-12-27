import { createContext, useContext, useEffect, useState } from 'react';
import { connectWebSocket } from '../api/websocket';
import { getCookieValue } from '../utils/getCookie';
import { Room } from '.';

export const Context = createContext<WebSocket | null>(null);

export const Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
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
        <Context.Provider value={socket}>
            {children}
        </Context.Provider>
    );
};