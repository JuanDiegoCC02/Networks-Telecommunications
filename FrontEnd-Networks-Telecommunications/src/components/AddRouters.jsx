import React, { useState } from 'react';
import { postRouters } from '../services/routersApi';
import AddGeolocationRouter from './AddGeolocationRouter';
import "../styles/AddRouters.css";

function AddRouters() {
  const [routerName, setRouterName] = useState("");
  const [routerDescription, setRouterDescription] = useState("");
  const [ip_Address, setIp_Address] = useState("");
  const [mac_Address, setMac_Address] = useState("");
  const [routerBrand, setRouterBrand] = useState("");
  const [routerModel, setRouterModel] = useState("");
  const [routerLocation, setRouterLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [routerStatus, setRouterStatus] = useState("");
  const handleCoords = (coords) => { setLatitude(coords.lat);  setLongitude(coords.lng); };

  // reset form
  const resetForm = () => {
    setRouterName("");
    setRouterDescription("");
    setIp_Address("");
    setMac_Address("");
    setRouterBrand("");
    setRouterModel("");
    setRouterLocation("");
    setRouterStatus("");
    setLatitude(null);
    setLongitude(null);
  };

  // funtion create
  async function create() {
    console.log("name:", routerName);
    console.log("description:", routerDescription);
    console.log("ip_address:", ip_Address);
    console.log("mac_address:", mac_Address);
    console.log("brand:", routerBrand);
    console.log("model:", routerModel);
    console.log("location:", routerLocation);
    console.log("latitude:", latitude);
    console.log("longitude:", longitude);
    console.log("status:", routerStatus);
    
    // validate inputs
    if (!routerName || !ip_Address || !mac_Address || !routerBrand || !routerModel || !routerLocation || !routerStatus) {
      alert("Complete all fields");
      return;
    }

    const obj = {
      name: routerName,
      description: routerDescription,
      ip_address: ip_Address,
      mac_address: mac_Address,
      brand: routerBrand,
      model: routerModel,
      location: routerLocation,
      latitude: latitude,
      longitude: longitude,
      status: routerStatus
    };

    try {
      const requestServer = await postRouters(obj);
      console.log("router register:", requestServer);
      alert("router connection created successfully");
      resetForm();
    } catch (error) {
      console.error("Error for create router:", error);
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
          <label className='addRoutersLabelForm'> Name </label>
          <input 
            className='addRoutersInputForm' 
            placeholder='Insert Name' 
            type="text" 
            value={routerName} 
            onChange={(e) => setRouterName(e.target.value)}
          />
        </div>

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'> Description </label>
          <input 
            className='addRoutersInputForm' 
            placeholder='Insert Description' 
            type="text" 
            value={routerDescription} 
            onChange={(e) => setRouterDescription(e.target.value)}
          />
        </div>

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'> IP Address </label>
          <input 
            className='addRoutersInputForm' 
            placeholder='Insert IP Address' 
            type="text" 
            value={ip_Address} 
            onChange={(e) => setIp_Address(e.target.value)}
          />
        </div>

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'> MAC Address </label>
          <input 
            className='addRoutersInputForm' 
            placeholder='Insert MAC Address' 
            type="text" 
            value={mac_Address} 
            onChange={(e) => setMac_Address(e.target.value)}
          />
        </div>

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'> Brand </label>
          <input 
            className='addRoutersInputForm' 
            placeholder='Insert Brand' 
            type="text" 
            value={routerBrand} 
            onChange={(e) => setRouterBrand(e.target.value)}
          />
        </div>

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'> Model </label>
          <input 
            className='addRoutersInputForm' 
            placeholder='Insert Model' 
            type="text" 
            value={routerModel} 
            onChange={(e) => setRouterModel(e.target.value)}
          />
        </div>

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'>Location</label>
          <select 
            className='addRoutersSelectLocation' 
            value={routerLocation} 
            onChange={(e) => setRouterLocation(e.target.value)}
          >
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

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'>Status</label>
          <select 
            className='addRoutersSelectStatus' 
            value={routerStatus} 
            onChange={(e) => setRouterStatus(e.target.value)}
          >
            <option className='addRoutersOptionSelect' value="">Select Status</option>
            <option className='addRoutersOptionSelect' value="Active">Active</option>
            <option className='addRoutersOptionSelect' value="Maintenance">Maintenance</option>
            <option className='addRoutersOptionSelect' value="Inactive">Inactive</option>
          </select>
        </div>

        <div className='addRoutersContainerForm'>
          <label className='addRoutersLabelForm'>Select the Camera Direction</label>
          <div className='addRoutersContainerMapForm'>
            <AddGeolocationRouter setCoords={handleCoords} />
          </div>
          <p className='addRoutersCoords'>Latitude: {latitude ?? 'Not selected'}</p>
          <p className='addRoutersCoords'>Longitude: {longitude ?? 'Not selected'}</p>
        </div>

        <div className='addRoutersContainerBtn'>
          <button className='addRoutersBtn' value="create" onClick={create}>
            Add Router Connection
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRouters;