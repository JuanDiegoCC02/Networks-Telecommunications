import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from '../pages/Register';
import LogIn from '../pages/LogIn';
import Home from '../pages/Home';
import Cameras from '../pages/Cameras';




function Routing() {
  return (
    <Router>
        <Routes>
             <Route path = '/register' element = {<Register/>}/> 
             <Route path = '/logIn' element = {<LogIn/>}/> 
             <Route path = '/' element = {<Home/>}/> 

              <Route path = '/cameras' element = {<Cameras/>}/> 
        </Routes>
    </Router>
  )
}

export default Routing