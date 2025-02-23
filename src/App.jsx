import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Todo from "./components/Todo"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import LogOut from "./components/LogOut"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from "./components/Navigation"
//navbar
import Container from 'react-bootstrap/Container';
import Navv from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {
  

  return (
    <>
   
    <Router>
    <Navigation/>
    <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/LogOut" element={<LogOut />} />
      </Routes>
     
    </Router>
    </>
  )
}

export default App
