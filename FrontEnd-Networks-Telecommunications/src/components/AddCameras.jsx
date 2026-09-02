import React, { useState } from 'react'
import { postCameras } from '../services/camerasApi';
import AddGeolocationCamera from './AddGeolocationCamera';
import "../styles/AddCameras.css"



function AddCameras() {

  const [cameraName, setCameraName] = useState("");

  const [ip_Address, setIp_Address] = useState("");

  const [url_Address, setUrl_Address] = useState("");

  const [Url_Stream, setUrlStream] = useState("");

  const [Url_thumbnail, setUrlThumbnail] = useState("");

  const [streamType, setStreamType] = useState("MP4");

  const [cameraLocation, setCameraLocation] = useState("");

  const [cameraDescription, setCameraDescroption] = useState("");

  const [cameraStatus, setCameraStatus] = useState("");

  const [latitude, setLatitude] = useState(null);

  const [longitude, setLongitude] = useState(null);



  function name(e) {
    setCameraName(e.target.value)    
  }

   function ip_address(e) {
    setIp_Address(e.target.value)    
  }

   function url_address(e) {
    setUrl_Address(e.target.value)    
  }

   function url_stream(e) {
    setUrlStream(e.target.value)    
  }

   function url_thumbnail(e) {
    setUrlThumbnail(e.target.value)    
  }

   function stream_type(e) {
    setStreamType(e.target.value)    
  }

   function location(e) {
    setCameraLocation(e.target.value)    
  }

   function description(e) {
    setCameraDescroption(e.target.value)    
  }

  function handleCoords(coords) {
  setLatitude(coords.lat);
  setLongitude(coords.lng);
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
          stream_url: Url_Stream,
          thumbnail_url: Url_thumbnail,
          stream_type: streamType,
          description: cameraDescription,
          location: cameraLocation,
          latitude: latitude,
          longitude: longitude,
          status: cameraStatus
      }

      try {
          const requestServer = await postCameras(obj);

          console.log("camera register:", requestServer);

          console.log(obj);

          alert("camera connection created successfully");

      } catch (error) {
          console.error("Error for create camera:", error);

          console.log(obj);

          alert("Error creating camera");
      }
    }

    

  return (
    <div className='addCamerasContainerFull'>

      <div className='addCamerasContainerTitle'>
        <h3 className='addCamerasTitle'>Add New Cameras Connection</h3>
      </div>

      <div className='addCamerasFormFull'>
        <div className='addCamerasContainerTitleForm'>
         <h4 className='addCamerasTitleForm'>Cameras Connection</h4>
        </div>

        <div className='addCamerasContainerForm'>
          <label className='addCamerasLabelForm' htmlFor=""> Camera Name </label>
          <input className='addCamerasInputForm' type="text" placeholder='Insert Name' value={cameraName} onChange={name} />
        </div> 

        <div className='addCamerasContainerForm'>
          <label className='addCamerasLabelForm' htmlFor=""> IP Address Camera </label>
          <input className='addCamerasInputForm' type="text"  placeholder='Insert IP Address' value={ip_Address} onChange={ip_address}  />
        </div> 

         <div className='addCamerasContainerForm'>
          <label className='addCamerasLabelForm' htmlFor=""> URL Address Camera </label>
          <input className='addCamerasInputForm' type="text"  placeholder='Insert URL Address' value={url_Address} onChange={url_address}  />
        </div> 

        <div className='addCamerasContainerForm'>
        <label className='addCamerasLabelForm'> Stream URL Camera </label>
        <input className='addCamerasInputForm'type="text" placeholder='Insert Stream URL' value={Url_Stream} onChange={url_stream}/>
        </div>

        <div className='addCamerasContainerForm'>
        <label className='addCamerasLabelForm'> Thumbnail URL Camera </label>
        <input className='addCamerasInputForm' type="text" placeholder='Insert Thumbnail URL' value={Url_thumbnail} onChange={url_thumbnail}/>
        </div>

        <div className='addCamerasContainerForm'>
        <label className='addCamerasLabelForm'> Stream Type </label>
        <select className='addCamerasSelectStatus' value={streamType} onChange={stream_type}>
          <option value="MP4">MP4</option>
          <option value="HLS">HLS</option>
          <option value="AWS">AWS</option>
        </select>
        </div>

        <div className='addCamerasContainerForm'>
         <label className='addCamerasLabelForm' htmlFor=""> Camera Description </label>
         <input className='addCamerasInputForm' type="text"  placeholder='Insert Description' value={cameraDescription} onChange={description}  />
        </div> 

        <div className='addCamerasContainerForm'>
          <label className='addCamerasLabelForm' htmlFor="">Location </label>
          <select className='addCamerasSelectLocation' name="" id="" value={cameraLocation} onChange={location}>
            <option className='addCamerasOptionLocation' value="">Select Location</option>
            <option className='addCamerasOptionLocation' value="San José">San José</option>
            <option className='addCamerasOptionLocation' value="Cartago">Cartago</option>
            <option className='addCamerasOptionLocation' value="Heredia">Heredia</option>
            <option className='addCamerasOptionLocation' value="Alajuela">Alajuela</option>
            <option className='addCamerasOptionLocation' value="Limón">Limón</option>
            <option className='addCamerasOptionLocation' value="Puntarenas">Puntarenas</option>
            <option className='addCamerasOptionLocation' value="Guanacaste">Guanacaste</option>
          </select>
        </div> 

        <div className='addCamerasContainerForm'>
          <label className='addCamerasLabelForm' htmlFor=""> Camera Status </label>
          <select  className='addCamerasSelectStatus' value={cameraStatus} onChange={status} name="" id="">
            <option className='addCamerasOptionStatus' value="">Select Status</option>
            <option className='addCamerasOptionStatus' value="Active">Active</option>
            <option className='addCamerasOptionStatus' value="Maintenance">Maintenance</option>
            <option className='addCamerasOptionStatus' value="Inactive">Inactive</option>
          </select>
        </div>

        <div className='addCamerasContainerForm'>
          <label className='addCamerasLabelForm'>Select the Camera Direction</label>
          <div className='addCamerasMapForm'>
          <AddGeolocationCamera setCoords={handleCoords} />
          </div>
          <p className='addCamerasCoords'>Latitude: {latitude}</p>
          <p className='addCamerasCoords'>Longitude: {longitude}</p>
        </div>
              


        <div className='addCamerasContainerBttn'>
          <button className='addCamerasBttnCreate' onClick={create} value="Create">Add Camera Connection</button>
        </div>

      </div>
    </div>
  )
}

export default AddCameras