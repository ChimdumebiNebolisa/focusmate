import React from 'react';
import Navbar from '../components/Navbar';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <DashboardLayout />
      </main>
    </div>
  );
};

export default Dashboard;