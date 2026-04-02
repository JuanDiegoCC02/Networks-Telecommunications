import React from 'react'
import RegisterForm from '../components/RegisterForm';
import NavPage from '../components/navPage';
import FooterPage from '../components/FooterPage';


function Register() {
  return (
  <div>
    
    <nav>
      <NavPage/>
    </nav>


    <body>
      <RegisterForm/>
    </body>


    <footer>
      <FooterPage/>
    </footer>
 
  </div>
  )
}

export default Register