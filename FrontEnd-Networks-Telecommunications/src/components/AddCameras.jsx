import React, { useState } from 'react'
import { postCameras } from '../services/camerasApi';

function AddCameras() {
  const [cameraName, setCameraName] = useState("");
  const [cameraIP, setCameraIP] = useState("");
  const [cameraLocation, setCameraLocation] = useState("");
  const [cameraDescription, setCameraDescroption] = useState("");
  const [cameraStatus, setCameraStatus] = useState("");

  function name(e) {
    setCameraName(e.target.value)    
  }
   function ip(e) {
    setCameraIP(e.target.value)    
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
      console.log("ip:", cameraIP)
      console.log("location:", cameraLocation)
      console.log("description:", cameraDescription)
      console.log("status:", cameraStatus)
      
  if (!cameraName || !cameraIP || !cameraLocation || !cameraDescription || !cameraStatus) {
      alert("Complete all fields");
      return;
  }

  const obj = {
      name: cameraName,
      ip_camera: cameraIP,
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
          <label htmlFor=""> IP Access Camera </label>
          <input type="text"  placeholder='Insert IP' value={cameraIP} onChange={ip}  />
        </div>     
        <div>
          <label htmlFor=""> Camera Location </label>
          <input type="text"  placeholder='Insert Location' value={cameraLocation} onChange={location}  />
        </div>    
           <div>
          <label htmlFor=""> Camera Description </label>
          <input type="text"  placeholder='Insert Description' value={cameraDescription} onChange={description}  />
        </div>        
        <div>
          <label htmlFor=""> Camera Status </label>
          <select value={cameraStatus} onChange={status} name="" id="">
            <option value="">select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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