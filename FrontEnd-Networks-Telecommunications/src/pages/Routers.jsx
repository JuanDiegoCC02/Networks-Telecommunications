import React, { useState } from 'react'
import NavPage from '../components/navPage'
import AddRouters from '../components/AddRouters'
import RoutersVisualizer from '../components/RoutersVisualizer'
import FooterPage from '../components/FooterPage'
import NavRouters from '../components/NavRouters'

function Routers() {
  const  [view, setView] = useState ("add")
  return (
  <div>
    <nav>
      <NavPage/>
    </nav>
     

    <main>
      <NavRouters view={view} setView={setView} />
      
      <div className="contentSection">
        {view === "add" && <AddRouters />}
        {view === "visualizer" && <RoutersVisualizer />}
      </div>
    </main>
    

    <footer>
      <FooterPage/>
    </footer>
     

     
  </div>
  )
}

export default Routers