import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavPage from '../components/navPage'
import AddCameras from '../components/AddCameras'
import CamerasVisualizer from '../components/CamerasVisualizer'
import FooterPage from '../components/FooterPage'
import NavCameras from '../components/NavCameras'


function Cameras() {
  const [view, setView] = useState("add")
  return (
  <div>  
    
    <nav>
      <NavPage/>
    </nav>


    <main>
      <NavCameras view={view} setView={setView} />
      
      <div className="contentSection">
        {view === "add" && <AddCameras />}
        {view === "visualizer" && <CamerasVisualizer />}
      </div>
    </main>
       
        
    <footer>
      <FooterPage/>
    </footer>
    
  </div>
  )
}

export default Cameras