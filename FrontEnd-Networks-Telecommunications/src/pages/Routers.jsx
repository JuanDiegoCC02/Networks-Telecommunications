import React, { useState } from 'react'
import NavPage from '../components/navPage'
import AddRouters from '../components/AddRouters'
import RoutersVisualizer from '../components/RoutersVisualizer'
import FooterPage from '../components/FooterPage'
import "../styles/PageRouters.css"

function Routers() {
  const  [view, setView] = useState ("add")
  return (
  <div>
    <nav>
      <NavPage/>
    </nav>
     

    <main>
      <div>
      <div className='bttnsNavContainer'>
        <button className='bttnsNav' onClick={()=> setView("add")}>Add Routers</button>
      </div>

      <div>
        <button className='bttnsNav' onClick={()=> setView("visualizer")}>Routers Visualizer</button>
      </div>
      
      </div>
      
      <div>
        {view === "add" && <AddRouters/>}
        {view === "visualizer" && <RoutersVisualizer/>}
      </div>
    </main>
    

    <footer>
      <FooterPage/>
    </footer>
     

     
  </div>
  )
}

export default Routers