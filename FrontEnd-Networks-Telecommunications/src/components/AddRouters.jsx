import React, { useState } from 'react'
import { postRouters } from '../services/routersApi';

function AddRouters() {
    const [routerName, setRouterName] = useState("");
  const [ip_Address, setIp_Address] = useState("");
  const [mac_Address, setMac_Address] = useState("");
  const [routerBrand, setRouterBrand] = useState("");
  const [routerModel, setRouterModel] = useState("");
  const [routerLocation, setRouterLocation] = useState("");
  const [routerStatus, setRouterStatus] = useState("");

  function name(e) {
    setRouterName(e.target.value)    
  }
   function ip_address(e) {
    setIp_Address(e.target.value)    
  }
   function mac_address(e) {
    setMac_Address(e.target.value)    
  }
   function brand(e) {
    setRouterBrand(e.target.value)
  }
  function model(e) {
    setRouterModel(e.target.value)
  }
   function location(e) {
    setRouterLocation(e.target.value)    
  }
   function status(e) {
    setRouterStatus(e.target.value)    
  }


  //create connection camera
    async function create() {

      console.log("name:", routerName)
      console.log("ip_address:", ip_Address)
      console.log("mac_address:", mac_Address)
      console.log("brand:", routerBrand)
      console.log("model:", routerModel)
      console.log("location:", routerLocation)
      console.log("status:", routerStatus)
      
  if (!routerName || !ip_Address || !mac_Address || !routerBrand || !routerModel || !routerLocation || !routerStatus) {
      alert("Complete all fields");
      return;
  }

  const obj = {
      name: routerName,
      ip_address: ip_Address,
      mac_address: mac_Address,
      brand: routerBrand,
      model: routerModel,
      location: routerLocation,
      status: routerStatus
  }

  try {

      const requestServer = await postRouters(obj);

      console.log("router register:", requestServer);

      alert("router connection created successfully");

     

  } catch (error) {

      console.error("Error for create router:", error);
      alert(JSON.stringify(error));
      alert("Error creating router");

  }
}

  return (
    <div>
        <div>
          <h2>Add New Routers Connection</h2>
        </div>

        <div>
          <div>
            <h4> Routers Connection </h4>
          </div>

          <div>
            <label htmlFor=""> Name </label>
            <input type="text" value={routerName} onChange={name}/>
          </div>

          <div>
            <label htmlFor=""> IP Address </label>
            <input type="text" value={ip_Address} onChange={ip_address}/>
          </div>

          <div>
            <label htmlFor=""> MAC Address </label>
            <input type="text" value={mac_Address} onChange={mac_address}/>
          </div>

          <div>
            <label htmlFor=""> Brand </label>
            <input type="text" value={routerBrand} onChange={brand}/>
          </div>

          <div>
            <label htmlFor=""> Model </label>
            <input type="text" value={routerModel} onChange={model}/>
          </div>

          <div>
            <select name="" id="" value={routerLocation} onChange={location}>
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
            <select name="" id="" value={routerStatus} onChange={status}>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        <div>
          <button value="create" onClick={create}>Add Router</button>
        </div>

    </div>
  )
}

export default AddRouters