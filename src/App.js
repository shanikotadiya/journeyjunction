import React from "react";
import "./App.css";
import Login from "./component/login-register/Loginregister.jsx";
import Home from "./component/body-content/body.jsx"
// import Sourcedest from './component/source-dest/Sourcedest.jsx';
// import Navbar from "./component/Navbar/navbar.jsx";
import test from './test.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/test' Component={test}/> */}
        <Route path='/' Component={Login} />
        <Route path='/body' Component={Home}/>
      </Routes>
    </Router>
  );
}
export default App;
