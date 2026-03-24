import React from 'react'
import NavPage from '../components/navPage'
import AddRouters from '../components/AddRouters'
import RoutersVisualizer from '../components/RoutersVisualizer'

function Routers() {
  return (
    <div>
     <NavPage/>

    <div>
      <div><button>Add Routers</button></div>
      <div><button>Routers Visualizer</button></div>

    </div>
    
     <div>
      <AddRouters/>
      <RoutersVisualizer/>
     </div>
     
    </div>
  )
}

export default Routers