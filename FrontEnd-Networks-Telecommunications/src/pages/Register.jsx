import React from 'react'
import RegisterForm from '../components/RegisterForm';
import NavPage from '../components/navPage';
import FooterPage from '../components/FooterPage';


function Register() {
  return (
    <div>
      <NavPage/>
      <RegisterForm/>
      <FooterPage/>
    </div>
  )
}

export default Register