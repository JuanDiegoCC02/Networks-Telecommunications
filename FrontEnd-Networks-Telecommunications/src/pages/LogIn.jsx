import React from 'react'
import LogInForm from '../components/logInForm'
import NavPage from '../components/navPage'
import FooterPage from '../components/FooterPage'

function LogIn() {
  return (

  <div>

     <nav>
      <NavPage/>
    </nav>


    <main>
      <LogInForm/> 
    </main>


    <footer>
      <FooterPage/>
    </footer>

      
  </div>
    
  )
}

export default LogIn