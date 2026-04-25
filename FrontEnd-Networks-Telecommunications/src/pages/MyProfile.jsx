import React from 'react'
import NavPage from '../components/navPage'
import FooterPage from '../components/FooterPage'
import MyProfileBody from '../components/MyProfileBody'

function MyProfile() {
  return (
    <div>
        <nav>
           <NavPage/>
        </nav>

        <main>
            <MyProfileBody/>
        </main>

        <footer>
            <FooterPage/>
        </footer>
    </div>
  )
}

export default MyProfile