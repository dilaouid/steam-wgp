import React, { createContext, useState } from 'react';
import { RoomInfo } from '../types/Room';

interface RoomContextType {
    room: RoomInfo | null;
    setRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ room, setRoom ] = useState<RoomInfo | null>(null);

    return (
        <RoomContext.Provider value={{ room, setRoom }}>
            {children}
        </RoomContext.Provider>
    );
};
