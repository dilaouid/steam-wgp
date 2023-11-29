import React, { createContext, useState } from 'react';

interface Player {
  id: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: Player;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: {
    id: '',
    username: ''
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(initialAuthState);

  return (
    <AuthContext.Provider value={ { auth, setAuth } }>
      {children}
    </AuthContext.Provider>
  );
};