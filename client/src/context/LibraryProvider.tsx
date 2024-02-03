import React, { createContext, useState } from 'react';
import { ILibrary } from '../types/Library';

interface LibraryContextType {
    library: ILibrary | null;
    setLibrary: React.Dispatch<React.SetStateAction<ILibrary | null>>;
}

export const Context = createContext<LibraryContextType | null>(null);

export const Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ library, setLibrary ] = useState<ILibrary | null>(null);

    return (
        <Context.Provider value={{ library, setLibrary }}>
            {children}
        </Context.Provider>
    );
};
