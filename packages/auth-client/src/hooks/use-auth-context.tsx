"use client"

import { LogtoContext} from "@logto/next"
import { useContext, createContext } from "react"

interface Context {
  state?: LogtoContext;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<Context | undefined>(undefined);

export function useAuthContext(): Context {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
  state: LogtoContext;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function AuthProvider({ children, state, signIn, signOut }: AuthProviderProps) {
  const value = { state, signIn, signOut };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
