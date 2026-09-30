import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import DataSource from '../components/MainComponents/DataSource';
import FieldMapping from '../components/MainComponents/FieldMapping';
import DataRefresh from '../components/MainComponents/DataRefresh';
import Connection from '../components/MainComponents/Connection';
import DataPreview from '../components/MainComponents/DataPreview';
import DataSourceList from '../components/MainComponents/DataSourceList';

const AppRoutes = () => {
  return (
    <Router>
      <div sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* <Header />  */}
        <div sx={{ display: 'flex', flex: 1 }}>
          {/* <Sidebar />  */}
          <div sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<DataSource />} />
              <Route path="/data-source" element={<DataSource />} />
              <Route path="/field-mapping" element={<FieldMapping />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/data-refresh" element={<DataRefresh />} />
              <Route path="/data-preview" element={<DataPreview />} />
              <Route path="/data-sourceList" element={<DataSourceList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
