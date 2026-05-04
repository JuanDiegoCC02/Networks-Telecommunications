import React, { useState } from 'react';
import { postCameras } from '../services/camerasApi';
import AddGeolocationCamera from './AddGeolocationCamera';
import "../styles/AddCameras.css";

const AddCameras = () => {
  const [formData, setFormData] = useState({
    name: "",
    ipAddress: "",
    urlAddress: "",
    location: "",
    description: "",
    status: ""
  });

  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoords = (newCoords) => {
    setCoords({ lat: newCoords.lat, lng: newCoords.lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (Object.values(formData).some(field => field === "")) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    const payload = { ...formData, ...coords };

    try {
      await postCameras(payload);
      alert("Camera registered successfully");
      // Opcional: limpiar formulario
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to register camera");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="camera-manager">
      <header className="camera-manager__header">
        <h1 className="camera-manager__title">Network Inventory</h1>
        <p className="camera-manager__subtitle">Provisioning a new surveillance node</p>
      </header>

      <form className="camera-form" onSubmit={handleSubmit}>
        <section className="camera-form__section">
          <h2 className="camera-form__section-title">General Information</h2>
          
          <div className="camera-form__grid">
            <div className="camera-form__group">
              <label className="camera-form__label">Device Name</label>
              <input 
                name="name"
                className="camera-form__input" 
                type="text" 
                placeholder="Ex: Main Entrance PTZ" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>

            <div className="camera-form__group">
              <label className="camera-form__label">IP Configuration</label>
              <input 
                name="ipAddress"
                className="camera-form__input" 
                type="text" 
                placeholder="192.168.1.100" 
                value={formData.ipAddress} 
                onChange={handleChange} 
              />
            </div>

            <div className="camera-form__group camera-form__group--full">
              <label className="camera-form__label">RTSP / Stream URL</label>
              <input 
                name="urlAddress"
                className="camera-form__input" 
                type="text" 
                placeholder="rtsp://admin:password@ip_address:554/stream" 
                value={formData.urlAddress} 
                onChange={handleChange} 
              />
            </div>

            <div className="camera-form__group camera-form__group--full">
              <label className="camera-form__label">Functional Description</label>
              <textarea 
                name="description"
                className="camera-form__textarea" 
                placeholder="Describe coverage area and purpose..." 
                value={formData.description} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </section>

        <section className="camera-form__section">
          <h2 className="camera-form__section-title">Deployment Details</h2>
          
          <div className="camera-form__grid">
            <div className="camera-form__group">
              <label className="camera-form__label">Region / Province</label>
              <select name="location" className="camera-form__select" value={formData.location} onChange={handleChange}>
                <option value="">Select Region</option>
                <option value="San José">San José</option>
                <option value="Cartago">Cartago</option>
                <option value="Heredia">Heredia</option>
                <option value="Alajuela">Alajuela</option>
                <option value="Limón">Limón</option>
                <option value="Puntarenas">Puntarenas</option>
                <option value="Guanacaste">Guanacaste</option>
              </select>
            </div>

            <div className="camera-form__group">
              <label className="camera-form__label">Operational Status</label>
              <select name="status" className="camera-form__select" value={formData.status} onChange={handleChange}>
                <option value="">Set status</option>
                <option value="Active">Operational (Active)</option>
                <option value="Inactive">Maintenance (Inactive)</option>
              </select>
            </div>

            <div className="camera-form__group camera-form__group--full camera-form__geo">
              <label className="camera-form__label">Geospatial Reference</label>
              <AddGeolocationCamera setCoords={handleCoords} />
              <div className="camera-form__coords">
                <span className="camera-form__coord-tag">LAT: {coords.lat || 'N/A'}</span>
                <span className="camera-form__coord-tag">LNG: {coords.lng || 'N/A'}</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="camera-form__footer">
          <button type="button" className="camera-form__btn camera-form__btn--secondary">Cancel</button>
          <button type="submit" className="camera-form__btn camera-form__btn--primary" disabled={isSubmitting}>
            {isSubmitting ? "Connecting..." : "Provision Device"}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default AddCameras;