import React, { useEffect, useState } from 'react'
import { deleteRouters, getRouters, patchRouters } from '../services/routersApi'

function RoutersVisualizer() {
    const [routers, setRouters] = useState([])
    const [user, setUser] = useState (null)
    const [reload, setReload] = useState(false)

    const [search, setSearch] = useState("")
    const [filterLocation, setFilterLocation] = useState("")
    const [filterStatus, setFilterStatus] = useState("")

    const [editName,setEditName] = useState("")
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
    <div>
        <div>
            <h2>Routers Visualizer</h2>
        </div>

        {/*  search & select Request Card */}
        <div>
            <div>
                <input value={search} onChange={(e)=> setSearch(e.target.value)} type="search" />
            </div>

            <div>
                <select value={filterLocation} onChange={(e)=> setFilterLocation(e.target.value)} name="" id="">
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
                <select value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)} name="" id="">
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>


        <div>
        {filteredRouters.map((r) => (
            <div key={r.id}>
                <header>
                    <h2>{r.name}</h2>
                    <span>Status Router: {r.status}</span><br />
                    <span>Location Router: {r.location}</span>
                </header>

                <main>
                    <h4>Name: {r.name}</h4>
                    <span>IP Address: {r.ip_address}</span><br />
                    <span>MAC Address: {r.mac_address}</span><br />
                    <span>Brand: {r.brand}</span><br />
                    <span>Model: {r.model}</span><br />
                </main>

                <footer>
                    <div>
                        <button onClick={() => {DeleteRData(r.id)}}>Delete</button>
                    </div>

                    <div>
                        <button onClick={() => {openRoUterEdit(r)}}>Edit</button>
                    </div>
                </footer>
            </div>
        ))}
        </div>
        {show && (
            <div>

                <div>
                    <h5>Edit Router Data</h5>
                </div>

                <div>
                    <div>
                        <label htmlFor=""> Name </label>
                        <input value={editName} onChange={(e)=> setEditName(e.target.value)} type="text" />
                    </div>

                    <div>
                        <label htmlFor=""> IP Address </label>
                        <input value={editIp} onChange={(e)=> setEditIp(e.target.value)}  type="text" />
                    </div>
                    
                    <div>
                        <label htmlFor=""> MAC Address </label>
                        <input value={editMac} onChange={(e)=> setEditMac(e.target.value)}  type="text" />
                    </div>
                    
                    <div>
                        <label htmlFor=""> Brand </label>
                        <input value={editBrand} onChange={(e)=> setEditBrand(e.target.value)}  type="text" />
                    </div>
                    
                    <div>
                        <label htmlFor=""> Model </label>
                        <input value={editModel} onChange={(e)=> setEditModel(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='cVizualizerContainerOwnEdit'>
                        <label className='cVizualizerLabelFormEdit' htmlFor="">Router Location </label>
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
                        <label className='cVizualizerLabelFormEdit' htmlFor="">Router Status</label>
                    <select className='cVizualizerSelectEditForm' value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="" id=""> 
                        <option className='cVizualizerOptEditForm' value="">select status</option>
                        <option className='cVizualizerOptEditForm' value="Active">Active</option>
                        <option className='cVizualizerOptEditForm' value="Inactive">Inactive</option>
                    </select>
                    </div>

                    <div>
                        <div>
                        <button onClick={()=> UpdateRData(user.id)} >Save Changes</button>
                        </div>

                         <div>
                        <button onClick={()=> setShow(false)} >Cancel Changes</button>
                        </div>
                    </div>

                </div>

            </div>
        )}

    </div>
  )
}

export default RoutersVisualizer