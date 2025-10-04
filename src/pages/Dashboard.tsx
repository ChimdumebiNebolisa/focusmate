import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const handleNewSession = () => {
    window.location.reload();
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <Navbar 
        onNewSession={handleNewSession}
        onHistoryClick={handleHistoryClick}
      />
      <main className="pt-20">
        <DashboardLayout 
          showHistory={showHistory}
          onCloseHistory={() => setShowHistory(false)}
        />
      </main>
    </div>
  );
};

export default Dashboard;