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
    <div className='cVizualizerContainerFull'>

      <div className='cVizualizerContianerTitle'>
        <h3 className='cVizualizerTitle'>Cameras Visualizer</h3>
      </div>

    <div className='cVizualizerNavFull'>
      <div className='cVizualizerContainerSearch'>
        <input className='cVizualizerSearch' value={search} onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='Camera Search' name="" id="" />
      </div>

      <div className='cVizualizerContainerSelectSearch'>
        <select className='cVizualizerSelectSearch' value={filterLocation} onChange={(e)=> setFilterLocation(e.target.value)} name="" id="">
          <option className='cVizualizerOptSearch' value="">select location</option>
          <option className='cVizualizerOptSearch' value="San José">San José</option>
          <option className='cVizualizerOptSearch' value="Cartago">Cartago</option>
          <option className='cVizualizerOptSearch' value="Heredia">Heredia</option>
          <option className='cVizualizerOptSearch' value="Alajuela">Alajuela</option>
          <option className='cVizualizerOptSearch' value="Limón">Limón</option>
          <option className='cVizualizerOptSearch' value="Puntarenas">Puntarenas</option>
          <option className='cVizualizerOptSearch' value="Guanacaste">Guanacaste</option>
        </select>
      </div>

       <div className='cVizualizerContainerSelectSearch'>
        <select className='cVizualizerSelectSearch' value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)} name="" id="">
          <option className='cVizualizerOptSearch' value="">select status</option>
          <option className='cVizualizerOptSearch' value="Active">Active</option>
          <option className='cVizualizerOptSearch' value="Inactive">Inactive</option>
        </select>
      </div>

      </div>

      <div className='cVizualizerContainerCamerasFull'>
        {filteredCameras.map((c) => (
          <div className='cVizualizerContainerCameraOwn' key={c.id}>
            <header className='cVizualizerHeaderCamera'> 
             <h2 className='cVizualizerTitleCamera'> {c.name} </h2>
             <span className='cVizualizerStatusCamera'> Status Camera:  {c.status} </span>
            </header>
          
            <main className='cVizualizerMainCamera'>
            <h5 className='cVizualizerNameCamera'>Name: {c.name} </h5>
            <span className='cVizualizerIPAddressCamera'>IP Address: {c.ip_address} </span><br /><br />
            <span className='cVizualizerURLAddressCamera'>URL Address: {c.url_address} </span><br /><br />
            <span className='cVizualizerLocationCamera'>Location: {c.location} </span><br />
            <p className='cVizualizerDescriptionCamera'>Description: {c.description} </p>
            </main>

            <footer className='cVizualizerFooterCamera'>
              <button className='cVizualizerBttnDelete' onClick={() => {
                DeleteCInfo(c.id)
              }}>
                Delete
              </button>

              <button className='cVizualizerBttnEdit' onClick={() => openCameraEdit(c)}>
                Edit
              </button>
            </footer>

          </div>
        ))}
      </div>
      {show && (
        <div className='cVizualizerModalEditFull'>

        <div className='cVizualizerContainerTitleMEdit'>
          <h5 className='cVizualizerTitleMEdit'>Edit Camera Information</h5>
        </div>

        <div className='cVizualizerEditFormFull' >
          <div className='cVizualizerContainerOwnEdit'>
            <label className='cVizualizerLabelFormEdit' htmlFor="">Name</label>
            <input className='cVizualizerInputFormEdit' value={editName} onChange={(e) => setEditName(e.target.value)} type="text" />
          </div>

           <div className='cVizualizerContainerOwnEdit'>
            <label className='cVizualizerLabelFormEdit' htmlFor="">Ip_Address</label>
            <input className='cVizualizerInputFormEdit' value={editIp_Address} onChange={(e) => setEditIp_Address(e.target.value)} type="text" />
          </div>

           <div className='cVizualizerContainerOwnEdit'>
            <label className='cVizualizerLabelFormEdit' htmlFor="">URL_ Address</label>
            <input className='cVizualizerInputFormEdit' value={editUrl_Address} onChange={(e) => setEditUrl_Address(e.target.value)} type="text" />
          </div>

          <div className='cVizualizerContainerOwnEdit'>
            <label className='cVizualizerLabelFormEdit' htmlFor="">Description</label>
            <input className='cVizualizerInputFormEdit' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} type="text" />
          </div>

           <div className='cVizualizerContainerOwnEdit'>
          <label className='cVizualizerLabelFormEdit' htmlFor="">Location </label>
          <select className='cVizualizerSelectEditForm' name="" id="" value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
            <option className='cVizualizerOptEditForm' value="">Select Location</option>
            <option className='cVizualizerOptEditForm' value="San José">San José</option>
            <option className='cVizualizerOptEditForm' value="Cartago">Cartago</option>
            <option className='cVizualizerOptEditForm' value="Heredia">Heredia</option>
            <option className='cVizualizerOptEditForm' value="Alajuela">Alajuela</option>
            <option className='cVizualizerOptEditForm' value="Limón">Limón</option>
            <option className='cVizualizerOptEditForm' value="Puntarenas">Puntarenas</option>
            <option className='cVizualizerOptEditForm' value="Guanacaste">Guanacaste</option>
          </select>
          </div>
           
           <div className='cVizualizerContainerOwnEdit'>
            <label className='cVizualizerLabelFormEdit' htmlFor="">Camera Status</label>
            <select className='cVizualizerSelectEditForm' value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="" id=""> 
              <option className='cVizualizerOptEditForm' value="">select status</option>
              <option className='cVizualizerOptEditForm' value="Active">Active</option>
              <option className='cVizualizerOptEditForm' value="Inactive">Inactive</option>
            </select>
          </div>

          <div className='cVizualizerContainerBttnsEdit'>
            <div className='cVizualizerContainerBtnSaveEdit'>
              <button className='cVizualizerBtnSaveEdit' onClick={() => UpdateCInfo(user.id)}>Save Changes</button>
            </div>

            <div className='cVizualizerContainerBtnCancelEdit'>
              <button className='cVizualizerBtnCancelEdit' onClick={() => setShow(false)}>Cancel Changes</button>
            </div>

          </div>
        </div>
        </div>
      )}

    </div>
  )
}

export default CamerasVisualizer