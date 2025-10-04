import React from 'react';
import Navbar from '../components/Navbar';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="pt-4">
        <DashboardLayout />
      </main>
    </div>
  );
};

export default Dashboard;