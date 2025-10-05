import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in...");
      console.log("Firebase config:", {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? "Set" : "Missing",
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "Missing",
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "Missing",
      });
      
      // Configure Google provider
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      console.log("Signed in successfully:", result.user);
      // Let React Router handle navigation instead of forcing page reload
      // The onAuthStateChanged listener will update the user state
      // and the ProtectedRoute will handle navigation
    } catch (error: any) {
      console.error("Login failed:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("User closed the popup");
      } else if (error.code === 'auth/popup-blocked') {
        console.error("Popup was blocked by browser");
        alert("Please allow popups for this site and try again.");
      } else if (error.code === 'auth/unauthorized-domain') {
        console.error("Domain not authorized for Google OAuth");
        alert("This domain is not authorized for Google sign-in. Please contact support.");
      }
      
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("AuthContext: Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      console.log("Auth state changed - user details:", currentUser ? {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName
      } : null);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      console.log("AuthContext: Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
