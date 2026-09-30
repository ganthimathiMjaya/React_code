import React from "react";
import Sidebar from "./components/Sidebar";
// import { BrowserRouter } from "react-router-dom";
const App = (props) => (
   // <BrowserRouter>
   <Sidebar {...props} />
   // </BrowserRouter>     
);
export default App;
