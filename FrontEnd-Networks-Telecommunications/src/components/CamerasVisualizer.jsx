import React, { useEffect, useState } from 'react'
import { deleteCameras, getCameras, patchCameras } from '../services/camerasApi'

function CamerasVisualizer() {
  const [cameras, setCameras] = useState([])
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(false)

  const [editName, setEditName] = useState("")
  const [editID, setEditID] = useState("")
  const [editLocation, setEditLocation] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editStatus, setEditStatus] = useState("")
  const [show, setShow] = useState(false)

  const [alerDelete, setAlertDelete] = useState(false)
  const [idCameraDelete, setIdCameraDelete] = useState(null)


  useEffect(() => {
    async function CamerasLoad() {
      const data = await getCameras()
      console.log("DATA:", data)
      const order = [...data].sort((a, b) => b.id - a.id)
      setCameras(order)
    }
    CamerasLoad()
  }, [reload])

// Funtion Open Modal for the Camera Edit
 function openCameraEdit(user) {
    setUser(user)
    setEditName(user.name)
    setEditID(user.id)
    setEditLocation(user.location)
    setEditDescription(user.description)
    setEditStatus(user.status)
    setShow(true)
    
 }

 // Funtion Async Update Camera Info 
 async function UpdateCInfo(id) {
  const updCamera = {
    "name": editName,
    "id_camera": editID,
    "location": editLocation,
    "description": editDescription,
    "status": editStatus,
  };
  try {
    await patchCameras(updCamera, id);
    setReload(!reload);
    setShow(false);
  } catch (error) {
    console.error("Failed to Update Camera Information") 
    alert("Failed to Update Camera Information")
  }
 }

 async function DeleteCInfo(id) {
  await deleteCameras (id, "api/cameras")
  setReload(r => !r)
  
 }

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
            <main>
            <h5> {c.name} </h5>
            <span> {c.id} </span><br />
            <span> {c.location} </span>
            <p> {c.description} </p>
            </main>
            <footer>
              <button onClick={() => {
                DeleteCInfo(c.id)
              }}>
                Delete
              </button>

              <button className='bttnOpenCEdit' onClick={() => openCameraEdit(c)}>
                Edit
              </button>
            </footer>

          </div>
        ))}
      </div>
      {show && (
        <div>

        <div><h5>Edit Camera Information</h5></div>
          <div>
            <label htmlFor=""></label>
            <input value={editName} onChange={(e) => setEditName(e.target.value)} type="text" />
          </div>
           <div>
            <label htmlFor=""></label>
            <input value={editID} onChange={(e) => setEditID(e.target.value)} type="text" />
          </div>
           <div>
            <label htmlFor=""></label>
            <input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} type="text" />
          </div>
           <div>
            <label htmlFor=""></label>
            <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} type="text" />
          </div>
           <div>
            <label htmlFor="">Camera Status</label>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="" id=""> 
              <option value="">select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <div>
              <button onClick={() => UpdateCInfo(user.id)}>Save Changes</button>
            </div>

            <div>
              <button onClick={() => setShow(false)}>Cancel Changes</button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default CamerasVisualizer