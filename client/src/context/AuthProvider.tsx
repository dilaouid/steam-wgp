import React, { createContext, useState } from 'react';

interface Player {
  id: string;
  username: string;
  waitlist: string | null;
}

export interface State {
  isAuthenticated: boolean;
  user: Player;
}

interface AuthContextType {
  auth: State;
  setAuth: React.Dispatch<React.SetStateAction<State>>;
}

const initialAuthState: State = {
  isAuthenticated: false,
  user: {
    id: '',
    username: '',
    waitlist: ''
  }
};

export const Context = createContext<AuthContextType | null>(null);

export const Provider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [auth, setAuth] = useState<State>(initialAuthState);

  return (
    <Context.Provider value={ { auth, setAuth } }>
      {children}
    </Context.Provider>
  );
};