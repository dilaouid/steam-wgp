import React, { createContext, useState } from 'react';

interface LoadingContextType {
    loadingComplete: boolean;
    setLoadingComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<LoadingContextType | null>(null);

export const Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [loadingComplete, setLoadingComplete] = useState(false);

    return (
        <Context.Provider value={{ loadingComplete, setLoadingComplete }}>
            {children}
        </Context.Provider>
    );
};
