import React from 'react'
import NavPage from '../components/navPage'
import ContactUsBody from '../components/ContactUsBody'
import FooterPage from '../components/FooterPage'

function ContactUs() {
  return (
    <div>
        <nav>
          <NavPage/>  
        </nav>

        <main>
           <ContactUsBody/> 
        </main>

        <footer>
            <FooterPage/>
        </footer>
    </div>
  )
}

export default ContactUs