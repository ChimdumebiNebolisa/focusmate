import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DashboardLayout from '../components/DashboardLayout';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const handleNewSession = () => {
    window.location.reload();
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  console.log('Dashboard component rendering');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
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
      <Footer />
    </div>
  );
};

export default Dashboard;