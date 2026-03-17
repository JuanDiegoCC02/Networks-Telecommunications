import React from 'react'
import NavPage from '../components/navPage'
import AddCameras from '../components/AddCameras'
import CamerasVisualizer from '../components/CamerasVisualizer'

function Cameras() {
  return (
    <div>  
        <NavPage/>
        <AddCameras/>
        <CamerasVisualizer/>
    
    </div>
  )
}

export default Cameras