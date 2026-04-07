import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from '../pages/register';
import LogIn from '../pages/LogIn';
import Cameras from '../pages/Cameras';
import Home from '../pages/home';
import Routers from '../pages/Routers';
import Administration from '../pages/Administration';




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
              <Route path = '/routers' element = {<Routers/>}/> 

             <Route path = '/administration' element = {<Administration/>}/> 

 
        </Routes>
    </Router>
  )
}

export default Routing