import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNewArticle from '../components/ArticleCreation/CreateNewArticle';
import ArticleTable from '../components/ArticleCreation/Sidebar';
import ListTable from '../components/ListOfValue/List';
import ApprovalTable from '../components/ListOfValue/Approval';
import Header from '../components/ArticleCreation/Header';


const AppRoutes = () => {
  return (
    <Router>
    <Header />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/articletable" element={<ArticleTable />} />
        <Route path="/createNewArticle" element={<CreateNewArticle />} />
        <Route path="/listTable" element={<ListTable />} />
        <Route path="/approvalTable" element={<ApprovalTable />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;