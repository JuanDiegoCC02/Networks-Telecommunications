import React from 'react'
import AdminNav from '../components/AdminNav'
import AdminBody from '../components/AdminBody'
import NavPage from '../components/navPage'
import FooterPage from '../components/FooterPage'

function Administration() {
  return (
  <div>

    <nav>
        <NavPage/>
    </nav>
  
    <main>
        <AdminBody/>
    </main>


    <footer>
      <FooterPage/>
    </footer>

  </div>
  )
}

export default Administration