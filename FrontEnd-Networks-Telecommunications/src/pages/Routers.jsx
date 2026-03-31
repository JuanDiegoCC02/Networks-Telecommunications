import React, { useState } from 'react'
import NavPage from '../components/navPage'
import AddRouters from '../components/AddRouters'
import RoutersVisualizer from '../components/RoutersVisualizer'
import FooterPage from '../components/FooterPage'

function Routers() {
  const  [view, setView] = useState ("add")
  return (
    <div>
     <NavPage/>

    <div>
      <div>
        <button onClick={()=> setView("add")}>Add Routers</button>
      </div>

      <div>
        <button onClick={()=> setView("visualizer")}>Routers Visualizer</button>
      </div>

    </div>
    
     <div>
      {view === "add" && <AddRouters/>}
      {view === "visualizer" && <RoutersVisualizer/>}
     </div>

     
     <FooterPage/>

     
    </div>
  )
}

export default Routers