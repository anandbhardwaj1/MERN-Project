import React,{useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css';
import { NavLink } from 'reactstrap';
import {  Routes, Route, NavLink as ReactLink } from "react-router-dom";
import ProfileUpdate from './components/ProfileUpdate';
import SignUp from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import {UserContext}  from './UserContext';
function App() {
  const [CurrentUser,setCurrentUser]=useState({});
  var buttonName ="Login";
  var S="SignUp";
  if(CurrentUser.email)
 { buttonName="Logout"
 S=""
}
  
 
  return (
    
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
         <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <NavLink tag={ReactLink} className="navbar-brand"   to='/Login'>{buttonName}</NavLink>
              </li>
              <li className="nav-item">
              <NavLink  tag={ReactLink} className="navbar-brand"  to='/Signup'>{S}</NavLink>
            </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
        <UserContext.Provider value={{CurrentUser,setCurrentUser}}>
          <Routes>
            <Route exact path='/' element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            
            <Route path="/Login" element={<Login/>} />
            <Route path="/about" element={<About/>} /> 
            <Route path="/update" element={<ProfileUpdate/>} />
          </Routes>
          </UserContext.Provider>
        </div>
      </div>
    </div>
  );
 
}

export default App;

