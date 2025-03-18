import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hello from './components/Home';
import { Sign } from './components/Signin';
import Landing from './components/Landing';
import CreditCalculator from './components/CreditCalculator';
import Dashboard from './components/Dashboard';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Hello /></MainLayout>} />
        <Route path="/signin" element={<MainLayout><Sign /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Landing /></MainLayout>} />
        <Route path="/calculator" element={<MainLayout><CreditCalculator /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;