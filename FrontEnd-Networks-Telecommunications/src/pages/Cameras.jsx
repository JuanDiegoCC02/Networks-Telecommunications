import React from 'react'
import { Link } from 'react-router-dom'
import NavPage from '../components/navPage'
import AddCameras from '../components/AddCameras'
import CamerasVisualizer from '../components/CamerasVisualizer'


function Cameras() {
  return (
    <div>  
        <NavPage/>
        <div>
        <Link to="/cameras/visualizer">View</Link>
        <Link to="/cameras/add">Add</Link>
        </div>
        <AddCameras/>
        <CamerasVisualizer/>
    
    </div>
  )
}

export default Cameras