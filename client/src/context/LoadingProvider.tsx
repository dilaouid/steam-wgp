import React, { createContext, useState } from 'react';

interface LoadingContextType {
    loadingComplete: boolean;
    setLoadingComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [loadingComplete, setLoadingComplete] = useState(false);

    return (
        <LoadingContext.Provider value={{ loadingComplete, setLoadingComplete }}>
            {children}
        </LoadingContext.Provider>
    );
};
