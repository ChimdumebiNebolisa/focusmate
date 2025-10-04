import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Coming Soon</h2>
              <p className="text-base-content/70 mb-4">
                Settings panel is under development. Here's your current profile information:
              </p>
              
              {user && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img
                          src={user.photoURL || ''}
                          alt={user.displayName || 'User'}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{user.displayName}</h3>
                      <p className="text-base-content/70">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="divider"></div>
                  
                  <div className="space-y-2">
                    <p><strong>User ID:</strong> {user.uid}</p>
                    <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
                    <p><strong>Account Created:</strong> {user.metadata.creationTime}</p>
                    <p><strong>Last Sign In:</strong> {user.metadata.lastSignInTime}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
