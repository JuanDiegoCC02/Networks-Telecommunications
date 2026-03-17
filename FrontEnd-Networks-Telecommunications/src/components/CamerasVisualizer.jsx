import React, { useEffect, useState } from 'react'
import { getCameras } from '../services/camerasApi'

function CamerasVisualizer() {

  const [cameras, setCameras] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    async function CamerasLoad() {
      const data = await getCameras()
      console.log("DATA:", data)
      const order = [...data].sort((a, b) => b.id - a.id)
      setCameras(order)
    }
    CamerasLoad()
  }, [reload])

  return (
    <div>

      <div>
        <h3>Cameras Visualizer</h3>
      </div>

      <div>
        {cameras.map((c) => (
          <div key={c.id}>
            <header> 
             <h4> {c.name} </h4>
             <span> {c.status} </span>

            </header>
            <h5> {c.name} </h5>
            <span> {c.id} </span><br />
            <span> {c.location} </span>
            <p> {c.description} </p>

          </div>
        ))}
      </div>

    </div>
  )
}

export default CamerasVisualizer