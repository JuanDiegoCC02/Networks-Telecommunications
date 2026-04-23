import React, { useEffect, useState } from 'react'
import { deleteRouters, getRouters, patchRouters } from '../services/routersApi'
import ViewGeolocationRouter from './ViewGeolocationRouter'
import "../styles/RoutersVisualizer.css"

function RoutersVisualizer() {
    const [routers, setRouters] = useState([])
    const [user, setUser] = useState (null)
    const [reload, setReload] = useState(false)

    const [search, setSearch] = useState("")
    const [filterLocation, setFilterLocation] = useState("")
    const [filterStatus, setFilterStatus] = useState("")

    const [editName,setEditName] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [editIp, setEditIp] = useState("")
    const [editMac, setEditMac] = useState("")
    const [editBrand, setEditBrand] = useState("")
    const [editModel, setEditModel] = useState("")
    const [editLocation, setEditLocation] = useState("")
    const [editStatus, setEditStatus] = useState("")
    const [show, setShow] = useState(false)

    useEffect (()=> {
        async function RoutersLoad() {
            const data = await getRouters()
            console.log ("DATA", data)
            const order = [...data].sort((a, b) => b.id - a.id)
            setRouters(order)
        }
        RoutersLoad()
    }, [reload])

    function openRoUterEdit(user) {
        setUser(user)
        setEditName(user.name)
        setEditDescription(user.description)
        setEditIp(user.ip_address)
        setEditMac(user.mac_address)
        setEditBrand(user.brand)
        setEditModel(user.model)
        setEditLocation(user.location)
        setEditStatus(user.status)
        setShow(true)
    }

    async function UpdateRData(id) {
        const updRouter ={
            "name" : editName,
            "description" : editDescription,
            "ip_address" : editIp,
            "mac_address" : editMac,
            "brand" : editBrand,
            "model" : editModel,
            "location" : editLocation,
            "status" : editStatus
        };
        try {
            await patchRouters(updRouter, id);
            setReload(!reload)
            setShow(false)

        } catch (error) {
            console.error("Failed to Update Router Information") 
            alert("Failed to Update Router Information")
        }
    }

    async function DeleteRData(id) {
        await deleteRouters (id, "api/routers")
        setReload(r => !r)
    }

    const filteredRouters = routers.filter((r)=>{
        const searchText = search.toLowerCase()

        const  requestedSearch = 
        r.name.toLowerCase().includes(searchText) ||
        r.ip_address.toLowerCase().includes(searchText) ||
        r.mac_address.toLowerCase().includes(searchText)

        const requestedLocation =
        filterLocation === "" || r.location === filterLocation

        const requestedStatus =
        filterStatus === "" || r.status === filterStatus

        return requestedSearch && requestedLocation && requestedStatus
    })
   
  return (
    <div className='rVisualizerContainerFull'>
        <div className='rVisualizerContainerTitle'>
            <h2 className='rVisualizerTitle'>Routers Visualizer</h2>
        </div>

        {/*  search & select Request Card */}
        <div className='rVisualizerNavFull'>
            <div className='rVisualizerContainerSearch'>
                <input placeholder='Router Search' className='rVisualizerSearch' value={search} onChange={(e)=> setSearch(e.target.value)} type="search" />
            </div>

            <div className='rVisualizerContainerSelectSearch'>
                <select className='rVisualizerSelectSearch' value={filterLocation} onChange={(e)=> setFilterLocation(e.target.value)} name="" id="">
                    <option className='rVisualizerOptSearch' value="">Select Location</option>
                    <option className='rVisualizerOptSearch' value="San José">San José</option>
                    <option className='rVisualizerOptSearch' value="Cartago">Cartago</option>
                    <option className='rVisualizerOptSearch' value="Heredia">Heredia</option>
                    <option className='rVisualizerOptSearch' value="Alajuela">Alajuela</option>
                    <option className='rVisualizerOptSearch' value="Limón">Limón</option>
                    <option className='rVisualizerOptSearch' value="Puntarenas">Puntarenas</option>
                    <option className='rVisualizerOptSearch' value="Guanacaste">Guanacaste</option>
                </select>
            </div>

            <div className='rVisualizerContainerSelectSearch'>
                <select className='rVisualizerSelectSearch' value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)} name="" id="">
                    <option className='rVisualizerOptSearch' value="">Select Status</option>
                    <option className='rVisualizerOptSearch' value="Active">Active</option>
                    <option className='rVisualizerOptSearch' value="Inactive">Inactive</option>
                </select>
            </div>
        </div>


        <div className='rVisualizerContainerRoutersFull'>
        {filteredRouters.map((r) => (
            <div className='rVisualizerContainerRouterOwn' key={r.id}>
                <header className='rVisualizerHeaderRouter'>
                    <h2 className='rVisualizerTitleRouter'>{r.name}</h2>
                    <span className='rVisualizerStatusRouter'>Status Router: {r.status}</span><br />
                    <span className='rVisualizerLocationRouter'>Location Router: {r.location}</span>
                </header>

                <main className='rVisualizerMainRouter'>
                    <h4 className='rVisualizerNameRouter'>Name: {r.name}</h4>
                    <p className='rVisualizerDescriptionRouter'>Description: {r.description}</p>
                    <span className='rVisualizerIPAddressRouter'>IP Address: {r.ip_address}</span><br />
                    <span className='rVisualizerMACAddressRouter'>MAC Address: {r.mac_address}</span><br />
                    <span className='rVisualizerBrandRouter'>Brand: {r.brand}</span><br />
                    <span className='rVisualizerModelRouter'>Model: {r.model}</span><br />

                    <div className='rVisualizerViewGeolocation'>
                      <ViewGeolocationRouter routers={[r]}/>
                    </div>
                </main>

                <footer className='rVisualizerFooterRouter'>
                    <div className='rVisualizerContainerFooter'>
                        <button className='rVisualizerBttnDelete' onClick={() => {DeleteRData(r.id)}}>Delete</button>
                    </div>

                    <div className='rVisualizerContainerFooter'>
                        <button className='rVisualizerBttnEdit' onClick={() => {openRoUterEdit(r)}}>Edit</button>
                    </div>
                </footer>
            </div>
        ))}
        </div>
        {show && (
            <div className='rVisualizerModalEditFull'>

                <div className='rVisualizerContainerTitleEdit'>
                    <h5 className='rVisualizerTitleMEdit'>Edit Router Data</h5>
                </div>

                <div className='rVisualizerEditFormFull'>
                    <div className='rVisualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor=""> Name </label>
                        <input className='rVisualizerInputFormEdit' value={editName} onChange={(e)=> setEditName(e.target.value)} type="text" />
                    </div>

                    <div className='rVisualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor=""> Description </label>
                        <input className='rVisualizerInputFormEdit' value={editDescription} onChange={(e)=> setEditDescription(e.target.value)} type="text" />
                    </div>

                    <div className='rVisualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor=""> IP Address </label>
                        <input className='rVisualizerInputFormEdit' value={editIp} onChange={(e)=> setEditIp(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVisualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor=""> MAC Address </label>
                        <input className='rVisualizerInputFormEdit' value={editMac} onChange={(e)=> setEditMac(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVisualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor=""> Brand </label>
                        <input className='rVisualizerInputFormEdit' value={editBrand} onChange={(e)=> setEditBrand(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor=""> Model </label>
                        <input className='rVisualizerInputFormEdit' value={editModel} onChange={(e)=> setEditModel(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor="">Router Location </label>
                    <select className='rVisualizerSelectEditForm' name="" id="" value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
                        <option className='rVisualizerOptEditForm' value="">Select Location</option>
                        <option className='rVisualizerOptEditForm' value="San José">San José</option>
                        <option className='rVisualizerOptEditForm' value="Cartago">Cartago</option>
                        <option className='rVisualizerOptEditForm' value="Heredia">Heredia</option>
                        <option className='rVisualizerOptEditForm' value="Alajuela">Alajuela</option>
                        <option className='rVisualizerOptEditForm' value="Limón">Limón</option>
                        <option className='rVisualizerOptEditForm' value="Puntarenas">Puntarenas</option>
                        <option className='rVisualizerOptEditForm' value="Guanacaste">Guanacaste</option>
                    </select>
                    </div>
                    
                    <div className='rVisualizerContainerOwnEdit'>
                        <label className='rVisualizerLabelFormEdit' htmlFor="">Router Status</label>
                    <select className='rVisualizerSelectEditForm' value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="" id=""> 
                        <option className='rVisualizerOptEditForm' value="">select status</option>
                        <option className='rVisualizerOptEditForm' value="Active">Active</option>
                        <option className='rVisualizerOptEditForm' value="Inactive">Inactive</option>
                    </select>
                    </div>

                    <div className='rVisualizerBttnsEdit'>
                        <div className='rVisualizerBtnSaveEdit'>
                        <button className='rVisualizerBtnSaveEdit' onClick={()=> UpdateRData(user.id)} >Save Changes</button>
                        </div>

                         <div className='rVisualizerContainerBtnCancelEdit'>
                        <button className='rVisualizerBtnCancelEdit' onClick={()=> setShow(false)} >Cancel Changes</button>
                        </div>
                    </div>

                </div>

            </div>
        )}

    </div>
  )
}

export default RoutersVisualizer