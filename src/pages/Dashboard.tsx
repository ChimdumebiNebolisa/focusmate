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
    <div className="min-h-screen">
      <Navbar 
        onNewSession={handleNewSession}
        onHistoryClick={handleHistoryClick}
      />
      <main>
        <DashboardLayout 
          showHistory={showHistory}
          onCloseHistory={() => setShowHistory(false)}
        />
      </main>
    </div>
  );
};

export default Dashboard;