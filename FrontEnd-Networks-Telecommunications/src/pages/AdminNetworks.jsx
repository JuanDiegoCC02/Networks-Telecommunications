import React from 'react'
import AdminNav from '../components/AdminNetworksNav'
import AdminNetworksBody from '../components/AdminNetworksBody'
import NavPage from '../components/navPage'
import FooterPage from '../components/FooterPage'

function Administration() {
  return (
  <div>

    <nav>
        <NavPage/>
    </nav>
  
    <main>
        <AdminNetworksBody/>
    </main>


    <footer>
      <FooterPage/>
    </footer>

  </div>
  )
}

export default Administration