import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from '../pages/Register';
import LogIn from '../pages/LogIn';
import Cameras from '../pages/Cameras';
import Home from '../pages/home';




function Routing() {
  return (
    <Router>
        <Routes>
            {/* Public Routes  */} 
             <Route path = '/register' element = {<Register/>}/> 
             <Route path = '/logIn' element = {<LogIn/>}/> 
             <Route path = '/' element = {<Home/>}/> 

            {/* Private Routes */} 
              <Route path = '/cameras' element = {<Cameras/>}/> 
        </Routes>
    </Router>
  )
}

export default Routing