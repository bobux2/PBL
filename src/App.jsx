import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Hello from './components/Home';
import { Sign } from './components/Signin';
import Landing from './components/Landing'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/login" element={<Landing />} />
        
      </Routes>
    </Router>
  );
}

export default App;