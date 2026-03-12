import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from '../pages/Register';
import LogIn from '../pages/LogIn';
import Home from '../pages/Home';




function Routing() {
  return (
    <Router>
        <Routes>
             <Route path = '/' element = {<Register/>}/> 
             <Route path = '/logIn' element = {<LogIn/>}/> 
             <Route path = '/home' element = {<Home/>}/> 
        </Routes>
    </Router>
  )
}

export default Routing