import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AIProviderProvider } from './context/AIProviderContext';
import ErrorBoundary from './components/ErrorBoundary';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AIProviderProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </AIProviderProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
