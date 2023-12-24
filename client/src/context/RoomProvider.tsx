import React, { createContext, useState } from 'react';
import { RoomInfo } from '../types/Room';

interface RoomContextType {
    room: RoomInfo | null;
    setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>;
}

export const Context = createContext<RoomContextType | null>(null);

export const Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ room, setRoom ] = useState<RoomInfo | null>(null);

    return (
        <Context.Provider value={{ room, setRoom }}>
            {children}
        </Context.Provider>
    );
};
