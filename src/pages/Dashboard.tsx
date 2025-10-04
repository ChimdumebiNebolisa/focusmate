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
      <main className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <DashboardLayout 
            showHistory={showHistory}
            onCloseHistory={() => setShowHistory(false)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;