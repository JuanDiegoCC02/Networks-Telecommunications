import React, { useEffect, useState } from 'react'
import { deleteCameras, getCameras, patchCameras } from '../services/camerasApi'

function CamerasVisualizer() {
  const [cameras, setCameras] = useState([])
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(false)

  const [search, setSearch] = useState("")
  const [filterLocation, setFilterLocation] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  const [editName, setEditName] = useState("")
  const [editIp_Address, setEditIp_Address] = useState("")
  const [editUrl_Address, setEditUrl_Address] = useState("")
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

// Filter cameras
  const filteredCameras = cameras.filter((c)=>{
    const searchText = search.toLowerCase()
    
    // funtion inpt search 
    const requestedSearch =
    c.name.toLowerCase().includes(searchText) ||
    c.ip_address.toLowerCase().includes(searchText) ||
    c.url_address.toLowerCase().includes(searchText)

    const requestedLocation = 
    filterLocation === "" || c.location === filterLocation

    const requestedStatus = 
    filterStatus === "" || c.status === filterStatus

    return requestedSearch && requestedLocation && requestedStatus
  })

// Funtion Open Modal for the Camera Edit
 function openCameraEdit(user) {
    setUser(user)
    setEditName(user.name)
    setEditIp_Address(user.ip_address)
    setEditUrl_Address(user.url_address)
    setEditLocation(user.location)
    setEditDescription(user.description)
    setEditStatus(user.status)
    setShow(true)
    
 }

 // Funtion Async Update Camera Info 
 async function UpdateCInfo(id) {
  const updCamera = {
    "name": editName,
    "ip_address": editIp_Address,
    "url_address": editUrl_Address,
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
      <div>
        <input value={search} onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='Camera Search' name="" id="" />
      </div>

      <div>
        <select value={filterLocation} onChange={(e)=> setFilterLocation(e.target.value)} name="" id="">
          <option value="">select location</option>
          <option value="San José">San José</option>
          <option value="Cartago">Cartago</option>
          <option value="Heredia">Heredia</option>
          <option value="Alajuela">Alajuela</option>
          <option value="Limón">Limón</option>
          <option value="Puntarenas">Puntarenas</option>
          <option value="Guanacaste">Guanacaste</option>
        </select>
      </div>

       <div>
        <select value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)} name="" id="">
          <option value="">select status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      </div>

      <div>
        {filteredCameras.map((c) => (
          <div key={c.id}>
            <header> 
             <h4> {c.name} </h4>
             <span> Status Camera:  {c.status} </span>

            </header>
            <main>
            <h5>Name: {c.name} </h5>
            <span>IP Address: {c.ip_address} </span><br /><br />
            <span>URL Address: {c.url_address} </span><br /><br />
            <span>Location: {c.location} </span><br />
            <p>Description: {c.description} </p>
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
            <label htmlFor="">Name</label>
            <input value={editName} onChange={(e) => setEditName(e.target.value)} type="text" />
          </div>
           <div>
            <label htmlFor="">Ip_Address</label>
            <input value={editIp_Address} onChange={(e) => setEditIp_Address(e.target.value)} type="text" />
          </div>
           <div>
            <label htmlFor="">URL_ Address</label>
            <input value={editUrl_Address} onChange={(e) => setEditUrl_Address(e.target.value)} type="text" />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} type="text" />
          </div>
           <div>
             <label htmlFor="">Location </label>
          <select name="" id="" value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
            <option value="">Select Location</option>
            <option value="San José">San José</option>
            <option value="Cartago">Cartago</option>
            <option value="Heredia">Heredia</option>
            <option value="Alajuela">Alajuela</option>
            <option value="Limón">Limón</option>
            <option value="Puntarenas">Puntarenas</option>
            <option value="Guanacaste">Guanacaste</option>
          </select>
          </div>
           
           <div>
            <label htmlFor="">Camera Status</label>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="" id=""> 
              <option value="">select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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