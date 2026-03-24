import React, { useEffect, useState } from 'react'
import { getRouters } from '../services/routersApi'

function RoutersVisualizer() {
    const [routers, setRouters] = useState([])
    const [user, setUser] = useState (null)
    const [reload, setReload] = useState(false)

    const [search, setSearch] = useState("")
    const [filterLocation, setFilterLocation] = useState("")
    const [filterStatus, setFilterStatus] = useState("")

    useEffect (()=> {
        async function RoutersLoad() {
            const data = await getRouters()
            console.log ("DATA", data)
            const order = [...data].sort((a, b) => b.id - a.id)
            setRouters(order)
        }
        RoutersLoad()
    }, [reload])

    const filteredRouters = routers.filter((r)=>{
        const searchText = search.toLowerCase()

        const  requestedSearch = 
        r.name.toLowerCase().includes(searchText) ||
        r.ip_address.toLowerCase().includes(searchText) ||
        r.mac_address.toLowerCase().includes(searchText)

        const requestedLocation =
        filterLocation === "" || r.location === filteredLocation

        const requestedStatus =
        filterStatus === "" || r.status === requestedStatus

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
                    <span>Status Router: {r.status}</span>
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
                        <button>Delete</button>
                    </div>

                    <div>
                        <button>Edit</button>
                    </div>
                </footer>
            </div>
        ))}
        </div>
        

    </div>
  )
}

export default RoutersVisualizer