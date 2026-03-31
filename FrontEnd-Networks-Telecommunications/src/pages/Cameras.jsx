import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavPage from '../components/navPage'
import AddCameras from '../components/AddCameras'
import CamerasVisualizer from '../components/CamerasVisualizer'
import FooterPage from '../components/FooterPage'


function Cameras() {
  const [view, setView] = useState("add")
  return (
    <div>  
        <NavPage/>

        <div>
          <div>
            <button onClick={()=> setView("add")}>
              Add Cameras 
            </button>
          </div>
          <div>
            <button onClick={()=> setView("visualizer")}>
               Cameras Visualizer
            </button>
          </div>
        </div>

        {/*Show Container Cameras Components*/}
        <div>
          {view === "add" && <AddCameras/>}
          {view === "visualizer" && <CamerasVisualizer/>}
        </div>
        

       <FooterPage/>

    
    </div>
  )
}

export default Cameras