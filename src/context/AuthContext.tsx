import { createContext } from "react";
import { type User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle(): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
