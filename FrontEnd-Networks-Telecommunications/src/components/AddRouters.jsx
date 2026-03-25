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
    <div className='addRoutersContainerFull'>
        <div className='addRoutersContainerTitle'>
          <h2 className='addRoutersTitle'>Add New Routers Connection</h2>
        </div>

        <div className='addRoutersFormFull'>
          <div className='addRoutersContainerTitleForm'>
            <h4 className='addRoutersTitleForm'> Routers Connection </h4>
          </div>

          <div className='addRoutersContainerForm'>
            <label className='addRoutersLabelForm' htmlFor=""> Name </label>
            <input className='addRoutersInputForm' type="text" value={routerName} onChange={name}/>
          </div>

          <div>
            <label className='addRoutersLabelForm' htmlFor=""> IP Address </label>
            <input className='addRoutersInputForm' type="text" value={ip_Address} onChange={ip_address}/>
          </div>

          <div>
            <label className='addRoutersLabelForm' htmlFor=""> MAC Address </label>
            <input className='addRoutersInputForm' type="text" value={mac_Address} onChange={mac_address}/>
          </div>

          <div>
            <label className='addRoutersLabelForm' htmlFor=""> Brand </label>
            <input className='addRoutersInputForm' type="text" value={routerBrand} onChange={brand}/>
          </div>

          <div>
            <label className='addRoutersLabelForm' htmlFor=""> Model </label>
            <input className='addRoutersInputForm' type="text" value={routerModel} onChange={model}/>
          </div>

          <div className='addRoutersContainerForm'>
            <label className='addRoutersLabelForm' htmlFor="">Location</label>
            <select className='addRoutersSelectLocation' name="" id="" value={routerLocation} onChange={location}>
              <option className='addRoutersOptionSelect' value="">Select Location</option>
              <option className='addRoutersOptionSelect' value="San José">San José</option>
              <option className='addRoutersOptionSelect' value="Cartago">Cartago</option>
              <option className='addRoutersOptionSelect' value="Heredia">Heredia</option>
              <option className='addRoutersOptionSelect' value="Alajuela">Alajuela</option>
              <option className='addRoutersOptionSelect' value="Limón">Limón</option>
              <option className='addRoutersOptionSelect' value="Puntarenas">Puntarenas</option>
              <option className='addRoutersOptionSelect' value="Guanacaste">Guanacaste</option>
            </select>
          </div>

          <div>
            <label className='addRoutersLabelForm' htmlFor="">Status</label>
            <select className='addRoutersSelectStatus' name="" id="" value={routerStatus} onChange={status}>
              <option className='addRoutersOptionSelect' value="">Select Status</option>
              <option className='addRoutersOptionSelect' value="Active">Active</option>
              <option className='addRoutersOptionSelect' value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        <div className='addRoutersContainerBtn'>
          <button className='addRoutersBtn' value="create" onClick={create}>Add Router</button>
        </div>

    </div>
  )
}

export default AddRouters