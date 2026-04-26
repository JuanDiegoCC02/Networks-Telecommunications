import React from 'react'
import NavPage from '../components/navPage'
import AdminUsersBody from '../components/AdminUsersBody'
import FooterPage from '../components/FooterPage'

function AdminUsers() {
  return (
    <div>

     <nav><NavPage/></nav>

     <main><AdminUsersBody/></main>

     <footer><FooterPage/></footer>

    </div>
  )
}

export default AdminUsers