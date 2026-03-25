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
    <div className='rVisualizerContainerFull'>
        <div className='rVisualizerContainerTitle'>
            <h2 className='rVisualizerTitle'>Routers Visualizer</h2>
        </div>

        {/*  search & select Request Card */}
        <div className='rVisualizerNavFull'>
            <div className='rVisualizerContainerSearch'>
                <input className='rVisualizerSearch' value={search} onChange={(e)=> setSearch(e.target.value)} type="search" />
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


        <div className='rVizualizerContainerRoutersFull'>
        {filteredRouters.map((r) => (
            <div className='rVizualizerContainerRouterOwn' key={r.id}>
                <header className='rVizualizerHeaderRouter'>
                    <h2 className='rVizualizerTitleRouter'>{r.name}</h2>
                    <span className='rVizualizerStatusRouter'>Status Router: {r.status}</span><br />
                    <span className='rVizualizerLocationRouter'>Location Router: {r.location}</span>
                </header>

                <main className='rVizualizerMainRouter'>
                    <h4 className='rVizualizerNameRouter'>Name: {r.name}</h4>
                    <span className='rVizualizerIPAddressRouter'>IP Address: {r.ip_address}</span><br />
                    <span className='rVizualizerMACAddressRouter'>MAC Address: {r.mac_address}</span><br />
                    <span className='rVizualizerBrandRouter'>Brand: {r.brand}</span><br />
                    <span className='rVizualizerModelRouter'>Model: {r.model}</span><br />
                </main>

                <footer className='rVizualizerFooterRouter'>
                    <div className='rVizualizerContainerFooter'>
                        <button className='rVizualizerBttnDelete' onClick={() => {DeleteRData(r.id)}}>Delete</button>
                    </div>

                    <div className='rVizualizerContainerFooter'>
                        <button className='rVizualizerBttnEdit' onClick={() => {openRoUterEdit(r)}}>Edit</button>
                    </div>
                </footer>
            </div>
        ))}
        </div>
        {show && (
            <div className='rVizualizerModalEditFull'>

                <div className='rVizualizerContainerTitleEdit'>
                    <h5 className='rVizualizerTitleMEdit'>Edit Router Data</h5>
                </div>

                <div className='rVizualizerEditFormFull'>
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVizualizerLabelFormEdit' htmlFor=""> Name </label>
                        <input className='rVizualizerInputFormEdit' value={editName} onChange={(e)=> setEditName(e.target.value)} type="text" />
                    </div>

                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVizualizerLabelFormEdit' htmlFor=""> IP Address </label>
                        <input className='rVizualizerInputFormEdit' value={editIp} onChange={(e)=> setEditIp(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVizualizerLabelFormEdit' htmlFor=""> MAC Address </label>
                        <input className='rVizualizerInputFormEdit' value={editMac} onChange={(e)=> setEditMac(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVizualizerLabelFormEdit' htmlFor=""> Brand </label>
                        <input className='rVizualizerInputFormEdit' value={editBrand} onChange={(e)=> setEditBrand(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVizualizerLabelFormEdit' htmlFor=""> Model </label>
                        <input className='rVizualizerInputFormEdit' value={editModel} onChange={(e)=> setEditModel(e.target.value)}  type="text" />
                    </div>
                    
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVizualizerLabelFormEdit' htmlFor="">Router Location </label>
                    <select className='rVizualizerSelectEditForm' name="" id="" value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
                        <option className='rVizualizerOptEditForm' value="">Select Location</option>
                        <option className='rVizualizerOptEditForm' value="San José">San José</option>
                        <option className='rVizualizerOptEditForm' value="Cartago">Cartago</option>
                        <option className='rVizualizerOptEditForm' value="Heredia">Heredia</option>
                        <option className='rVizualizerOptEditForm' value="Alajuela">Alajuela</option>
                        <option className='rVizualizerOptEditForm' value="Limón">Limón</option>
                        <option className='rVizualizerOptEditForm' value="Puntarenas">Puntarenas</option>
                        <option className='rVizualizerOptEditForm' value="Guanacaste">Guanacaste</option>
                    </select>
                    </div>
                    
                    <div className='rVizualizerContainerOwnEdit'>
                        <label className='rVizualizerLabelFormEdit' htmlFor="">Router Status</label>
                    <select className='rVizualizerSelectEditForm' value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="" id=""> 
                        <option className='rVizualizerOptEditForm' value="">select status</option>
                        <option className='rVizualizerOptEditForm' value="Active">Active</option>
                        <option className='rVizualizerOptEditForm' value="Inactive">Inactive</option>
                    </select>
                    </div>

                    <div className='rVizualizerBttnsEdit'>
                        <div className='rVizualizerBtnSaveEdit'>
                        <button className='rVizualizerBtnSaveEdit' onClick={()=> UpdateRData(user.id)} >Save Changes</button>
                        </div>

                         <div className='rVizualizerContainerBtnCancelEdit'>
                        <button className='rVizualizerBtnCancelEdit' onClick={()=> setShow(false)} >Cancel Changes</button>
                        </div>
                    </div>

                </div>

            </div>
        )}

    </div>
  )
}

export default RoutersVisualizer