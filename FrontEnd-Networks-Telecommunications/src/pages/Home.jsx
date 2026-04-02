import React from 'react'
import NavPage from '../components/navPage'
import HomeBody from '../components/HomeBody'
import FooterPage from '../components/FooterPage'

function Home() {
  return (

  <div>

    <nav>
      <NavPage/>
    </nav>


    <body>
      <HomeBody/>
    </body>


    <footer>
      <FooterPage/>
    </footer>
     
  </div>
    
  )
}

export default Home