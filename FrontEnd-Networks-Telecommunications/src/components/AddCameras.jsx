import React, { useState } from 'react'
import { postCameras } from '../services/camerasApi';

function AddCameras() {
  const [cameraName, setCameraName] = useState("");
  const [ip_Address, setIp_Address] = useState("");
  const [url_Address, setUrl_Address] = useState("");
  const [cameraLocation, setCameraLocation] = useState("");
  const [cameraDescription, setCameraDescroption] = useState("");
  const [cameraStatus, setCameraStatus] = useState("");

  function name(e) {
    setCameraName(e.target.value)    
  }
   function ip_address(e) {
    setIp_Address(e.target.value)    
  }
   function url_address(e) {
    setUrl_Address(e.target.value)    
  }
   function location(e) {
    setCameraLocation(e.target.value)    
  }
   function description(e) {
    setCameraDescroption(e.target.value)    
  }
   function status(e) {
    setCameraStatus(e.target.value)    
  }


  //create connection camera
    async function create() {

      console.log("name:", cameraName)
      console.log("ip_address:", ip_Address)
      console.log("url_address:", url_Address)
      console.log("location:", cameraLocation)
      console.log("description:", cameraDescription)
      console.log("status:", cameraStatus)
      
  if (!cameraName || !ip_Address || !url_Address || !cameraLocation || !cameraDescription || !cameraStatus) {
      alert("Complete all fields");
      return;
  }

  const obj = {
      name: cameraName,
      ip_address: ip_Address,
      url_address: url_Address,
      location: cameraLocation,
      description: cameraDescription,
      status: cameraStatus
  }

  try {

      const requestServer = await postCameras(obj);

      console.log("camera register:", requestServer);

      alert("camera connection created successfully");

     

  } catch (error) {

      console.error("Error for create camera:", error);

      alert("Error creating camera");

  }
}



  return (
    <div>

      <div><h3>Add New Camera Connection</h3></div>

      <div>

        <div>
         <h4>Camera Connection</h4>
        </div>

        <div>
          <label htmlFor=""> Camera Name </label>
          <input type="text" placeholder='Insert Name' value={cameraName} onChange={name} />
        </div>        
        <div>
          <label htmlFor=""> IP Address Camera </label>
          <input type="text"  placeholder='Insert IP' value={ip_Address} onChange={ip_address}  />
        </div>     
         <div>
          <label htmlFor=""> URL Address Camera </label>
          <input type="text"  placeholder='Insert URL' value={url_Address} onChange={url_address}  />
        </div> 
        <div>
         <label htmlFor=""> Camera Description </label>
         <input type="text"  placeholder='Insert Description' value={cameraDescription} onChange={description}  />
        </div> 

        <div>
          <label htmlFor="">Location </label>
          <select name="" id="" value={cameraLocation} onChange={location}>
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
          <label htmlFor=""> Camera Status </label>
          <select value={cameraStatus} onChange={status} name="" id="">
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <button onClick={create} value="Create">Add Camera</button>
        </div>

      </div>

    </div>
  )
}

export default AddCameras