import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '../context/AuthContext';

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx || typeof ctx !== 'object' || !('user' in ctx)) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx as AuthContextType;
};
