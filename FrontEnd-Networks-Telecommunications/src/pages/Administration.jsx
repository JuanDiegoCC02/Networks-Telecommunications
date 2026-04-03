import React from 'react'
import AdminNav from '../components/AdminNav'
import AdminBody from '../components/AdminBody'
import NavPage from '../components/navPage'

function Administration() {
  return (
  <div>
    <nav>
        <NavPage/>
    </nav>

    <div>
        <AdminNav/>
    </div>
        
    <main>
        <AdminBody/>
    </main>

  </div>
  )
}

export default Administration