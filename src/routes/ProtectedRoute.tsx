import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute - user:", user, "loading:", loading);
  console.log("ProtectedRoute - user type:", typeof user);
  console.log("ProtectedRoute - user details:", user ? {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  } : null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute - redirecting to /");
    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute - rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
