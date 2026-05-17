import React, { useEffect, useState } from 'react'
import { deleteCameras, getCameras, patchCameras } from '../services/camerasApi'
import ViewGeolocationCamera from './ViewGeolocationCamera'
import "../styles/CamerasVisualizer.css"

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
 function openCameraEdit(c) {
    setUser(c)
    setEditName(c.name)
    setEditIp_Address(c.ip_address)
    setEditUrl_Address(c.url_address)
    setEditLocation(c.location)
    setEditDescription(c.description)
    setEditStatus(c.status)
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
    <div className='cVisualizerContainerFull'>

      <div className='cVisualizerContianerTitle'>
        <h3 className='cVizualizerTitle'>Cameras Visualizer</h3>
      </div>

    <div className='cVisualizerNavFull'>
      <div className='cVisualizerContainerSearch'>
        <input className='cVisualizerSearch' value={search} onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='Camera Search' name="" id="" />
      </div>

      <div className='cVisualizerContainerSelectSearch'>
        <select className='cVisualizerSelectSearch' value={filterLocation} onChange={(e)=> setFilterLocation(e.target.value)} name="" id="">
          <option className='cVisualizerOptSearch' value="">select location</option>
          <option className='cVisualizerOptSearch' value="San José">San José</option>
          <option className='cVisualizerOptSearch' value="Cartago">Cartago</option>
          <option className='cVisualizerOptSearch' value="Heredia">Heredia</option>
          <option className='cVisualizerOptSearch' value="Alajuela">Alajuela</option>
          <option className='cVisualizerOptSearch' value="Limón">Limón</option>
          <option className='cVisualizerOptSearch' value="Puntarenas">Puntarenas</option>
          <option className='cVisualizerOptSearch' value="Guanacaste">Guanacaste</option>
        </select>
      </div>

       <div className='cVisualizerContainerSelectSearch'>
        <select className='cVisualizerSelectSearch' value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)} name="" id="">
          <option className='cVisualizerOptSearch' value="">select status</option>
          <option className='cVisualizerOptSearch' value="Active">Active</option>
          <option className='cVisualizerOptSearch' value="Inactive">Inactive</option>
        </select>
      </div>

      </div>

      <div className='cVizualizerContainerCamerasFull'>
        {filteredCameras.map((c) => (
          <div className='cVisualizerContainerCameraOwn' key={c.id}>
            <header className='cVisualizerHeaderCamera'> 
             <h2 className='cVisualizerTitleCamera'> {c.name} </h2>
             <span className='cVisualizerStatusCamera'> Status Camera:  {c.status} </span>
             <span className='cVisualizerLocationCamera'>Location: {c.location} </span><br />
            </header>
          
            <main className='cVisualizerMainCamera'>
            <h5 className='cVisualizerNameCamera'>Name: {c.name} </h5>
            <p className='cVisualizerDescriptionCamera'>Description: {c.description} </p>                                       
  
            <span className='cVisualizerIPAddressCamera'>IP Address: {c.ip_address} </span><br />
            <span className='cVisualizerURLAddressCamera'>URL Address: {c.url_address} </span><br />

            <video width="100%" controls autoPlay muted loop className='cVisualizerVideoCamera'> 
            <source src={c.stream_url} type="video/mp4" />
            </video>
            
            
            
            <div className='cVisualizerViewGeolocation'>
              <ViewGeolocationCamera cameras={[c]}/>
            </div>
            </main>

            <footer className='cVisualizerFooterCamera'>
              <div className='cVisualizerContainerBttn'>
              <button className='cVisualizerBttnDelete' onClick={() => {
                DeleteCInfo(c.id)
              }}>
                Delete
              </button>
              </div>

              <div className='cVisualizerContainerBttn'>
              <button className='cVisualizerBttnEdit' onClick={() => openCameraEdit(c)}>
                Edit
              </button>
              </div>
            </footer>

          </div>
        ))}
      </div>
      {show && (
        <div className='cVisualizerModalEditFull'>

        <div className='cVisualizerContainerTitleMEdit'>
          <h5 className='cVisualizerTitleMEdit'>Edit Camera Information</h5>
        </div>

        <div className='cVisualizerEditFormFull' >
          <div className='cVisualizerContainerOwnEdit'>
            <label className='cVisualizerLabelFormEdit' htmlFor="">Name</label>
            <input className='cVisualizerInputFormEdit' value={editName} onChange={(e) => setEditName(e.target.value)} type="text" />
          </div>

           <div className='cVisualizerContainerOwnEdit'>
            <label className='cVisualizerLabelFormEdit' htmlFor="">Ip_Address</label>
            <input className='cVisualizerInputFormEdit' value={editIp_Address} onChange={(e) => setEditIp_Address(e.target.value)} type="text" />
          </div>

           <div className='cVisualizerContainerOwnEdit'>
            <label className='cVisualizerLabelFormEdit' htmlFor="">URL_ Address</label>
            <input className='cVisualizerInputFormEdit' value={editUrl_Address} onChange={(e) => setEditUrl_Address(e.target.value)} type="text" />
          </div>

          <div className='cVisualizerContainerOwnEdit'>
            <label className='cVisualizerLabelFormEdit' htmlFor="">Description</label>
            <input className='cVisualizerInputFormEdit' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} type="text" />
          </div>

           <div className='cVisualizerContainerOwnEdit'>
          <label className='cVisualizerLabelFormEdit' htmlFor="">Location </label>
          <select className='cVisualizerSelectEditForm' name="" id="" value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
            <option className='cVisualizerOptEditForm' value="">Select Location</option>
            <option className='cVisualizerOptEditForm' value="San José">San José</option>
            <option className='cVisualizerOptEditForm' value="Cartago">Cartago</option>
            <option className='cVisualizerOptEditForm' value="Heredia">Heredia</option>
            <option className='cVisualizerOptEditForm' value="Alajuela">Alajuela</option>
            <option className='cVisualizerOptEditForm' value="Limón">Limón</option>
            <option className='cVisualizerOptEditForm' value="Puntarenas">Puntarenas</option>
            <option className='cVisualizerOptEditForm' value="Guanacaste">Guanacaste</option>
          </select>
          </div>
           
           <div className='cVisualizerContainerOwnEdit'>
            <label className='cVisualizerLabelFormEdit' htmlFor="">Camera Status</label>
            <select className='cVisualizerSelectEditForm' value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="" id=""> 
              <option className='cVisualizerOptEditForm' value="">select status</option>
              <option className='cVisualizerOptEditForm' value="Active">Active</option>
              <option className='cVisualizerOptEditForm' value="Maintenance">Maintenance</option>
              <option className='cVisualizerOptEditForm' value="Inactive">Inactive</option>
            </select>
          </div>

          <div className='cVisualizerContainerBttnsEdit'>
            <div className='cVisualizerContainerBtnSaveEdit'>
              <button className='cVisualizerBtnSaveEdit' onClick={() => UpdateCInfo(user.id)}>Save Changes</button>
            </div>

            <div className='cVisualizerContainerBtnCancelEdit'>
              <button className='cVisualizerBtnCancelEdit' onClick={() => setShow(false)}>Cancel Changes</button>
            </div>

          </div>
        </div>
        </div>
      )}

    </div>
  )
}

export default CamerasVisualizer