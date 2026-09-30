
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; // Correct imports
import Homedashboard from '../components/Homedashboard'; // Import components

const AppRoutes = () => {
  return (
    <HashRouter> {/* Wrap the app in HashRouter */}
      <Routes>
      <Route path="/" element={<Homedashboard />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;

