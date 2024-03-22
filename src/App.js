import React from "react";
import "./App.css";
import Login from "./component/login-register/Loginregister.jsx";
// import Body from "./component/body-content/body.jsx";
// import Sourcedest from './component/source-dest/Sourcedest.jsx';
// import Navbar from "./component/Navbar/navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Login} />
      </Routes>
    </Router>
  );
}
export default App;
