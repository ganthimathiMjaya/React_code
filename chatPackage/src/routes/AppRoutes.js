
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; // Correct imports
import DataRefresh from "../components/DataRefresh";
import Chat from "../components/Chat";


const AppRoutes = () => {
  return (
    <HashRouter> {/* Wrap the app in HashRouter */}
      <Routes>
        <Route path="/" element={<Navigate to="/data-refresh" />} />
        <Route path="/data-refresh" element={<DataRefresh />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;

