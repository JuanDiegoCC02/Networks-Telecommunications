import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AdminNav from './AdminNav'; 
import { getCameras, patchCameras, deleteCameras } from '../services/camerasApi';
import { getRouters, patchRouters, deleteRouters } from '../services/routersApi';

import "leaflet/dist/leaflet.css";
import "../styles/CamerasVisualizer.css";
import "../styles/RoutersVisualizer.css";

function AdminBody() {
  // data primary states
  const [cameras, setCameras] = useState([]);
  const [routers, setRouters] = useState([]);
  const [reload, setReload] = useState(false);
  const [activeTab, setActiveTab] = useState('cameras'); 

  // modal states for edit form
  const [showModal, setShowModal] = useState({ show: false, type: '', data: null });
  const [editData, setEditData] = useState({});

  // filter states for seacrh 
  const [cSearch, setCSearch] = useState("");
  const [cFilterLoc, setCFilterLoc] = useState("");
  const [rSearch, setRSearch] = useState("");
  const [rFilterLoc, setRFilterLoc] = useState("");

  useEffect(() => {
    async function loadData() {
      const cData = await getCameras();
      const rData = await getRouters();
      setCameras([...cData].sort((a, b) => b.id - a.id));
      setRouters([...rData].sort((a, b) => b.id - a.id));
    }
    loadData();
  }, [reload]);

  // filter logic for cameras and routers
  const filteredCameras = cameras.filter(c => 
    (c.name.toLowerCase().includes(cSearch.toLowerCase()) || c.ip_address.includes(cSearch)) &&
    (cFilterLoc === "" || c.location === cFilterLoc)
  );

  const filteredRouters = routers.filter(r => 
    (r.name.toLowerCase().includes(rSearch.toLowerCase()) || r.ip_address.includes(rSearch)) &&
    (rFilterLoc === "" || r.location === rFilterLoc)
  );

  // handlers Edit and Delete
  const openEdit = (item, type) => {
    setEditData({ ...item });
    setShowModal({ show: true, type, data: item });
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`¿Estás seguro de eliminar este ${type === 'camera' ? 'cámara' : 'router'}?`)) {
      type === 'camera' ? await deleteCameras(id, "api/cameras") : await deleteRouters(id, "api/routers");
      setReload(!reload);
    }
  };

  const handleUpdate = async () => {
    try {
      if (showModal.type === 'camera') await patchCameras(editData, showModal.data.id);
      else await patchRouters(editData, showModal.data.id);
      setShowModal({ show: false, type: '', data: null });
      setReload(!reload);
    } catch (e) { alert("Error al actualizar los datos"); }
  };

  return (
    <div className='adminBodyContainer'>
      
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* rendering of sections */}
      {activeTab === 'cameras' ? (
        <section className='cVisualizerContainerFull animate__animated animate__fadeIn'>
          <h3 className='cVizualizerTitle'>📸 Control Cameras</h3>

          <div className="adminMapSection" style={{ marginBottom: "30px" }}>
            <MapContainer center={[9.7489, -83.7534]} zoom={8} style={{ height: "400px", width: "100%", borderRadius: "15px", border: '2px solid #00d4ff' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredCameras.map(c => c.latitude && (
                <Marker key={`c-${c.id}`} position={[parseFloat(c.latitude), parseFloat(c.longitude)]}>
                  <Popup><strong>📸 Camera:</strong> {c.name}<br/>{c.location}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className='cVisualizerNavFull'>
            <input className='cVisualizerSearch' placeholder="Camera Search..." onChange={e => setCSearch(e.target.value)} />
            <select className='cVisualizerSelectSearch' onChange={e => setCFilterLoc(e.target.value)}>
               <option value="">All Locations</option>
               <option value="San José">San José</option>
               <option value="Cartago">Cartago</option>
               <option value="Heredia">Heredia</option>
               <option value="Alajuela">Alajuela</option>
               <option value="Limón">Limón</option>
               <option value="Puntarenas">Puntarenas</option>
               <option value="Guanacaste">Guanacaste</option>
            </select>
          </div>

          <div className='cVizualizerContainerCamerasFull'>
            {filteredCameras.map(c => (
              <div key={c.id} className='cVisualizerContainerCameraOwn'>
                <header className='cVisualizerHeaderCamera'><h4>{c.name}</h4><span>{c.status}</span></header>
                <main className='cVisualizerMainCamera'>
                  <p>Location: {c.location}</p>
                  <small>{c.description}</small>
                  <p>IP: {c.ip_address}</p>
                  <p>URL: {c.url_address}</p> 
                </main>
                <footer className='cVisualizerFooterCamera'>
                  <button className='cVisualizerBttnEdit' onClick={() => openEdit(c, 'camera')}>Edit</button>
                  <button className='cVisualizerBttnDelete' onClick={() => handleDelete(c.id, 'camera')}>Delete</button>
                </footer>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className='rVisualizerContainerFull animate__animated animate__fadeIn'>
          <h3 className='rVisualizerTitle'>🌐 Control Routers</h3>

          <div className="adminMapSection" style={{ marginBottom: "30px" }}>
            <MapContainer center={[9.7489, -83.7534]} zoom={8} style={{ height: "400px", width: "100%", borderRadius: "15px", border: '2px solid #ff9f00' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredRouters.map(r => r.latitude && (
                <Marker key={`r-${r.id}`} position={[parseFloat(r.latitude), parseFloat(r.longitude)]}>
                  <Popup><strong>🌐 Router:</strong> {r.name}<br/>{r.location}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className='rVisualizerNavFull'>
            <input className='rVisualizerSearch' placeholder="Router Search..." onChange={e => setRSearch(e.target.value)} />
            <select className='rVisualizerSelectSearch' onChange={e => setRFilterLoc(e.target.value)}>
               <option value="">All Locations</option>
               <option value="San José">San José</option>
               <option value="Cartago">Cartago</option>
               <option value="Heredia">Heredia</option>
               <option value="Alajuela">Alajuela</option>
               <option value="Limón">Limón</option>
               <option value="Puntarenas">Puntarenas</option>
               <option value="Guanacaste">Guanacaste</option>
            </select>
          </div>

          <div className='rVisualizerContainerRoutersFull'>
            {filteredRouters.map(r => (
              <div key={r.id} className='rVisualizerContainerRouterOwn'>
                <header className='rVisualizerHeaderRouter'><h4>{r.name}</h4><span>{r.status}</span></header>
                <main className='rVisualizerMainRouter'>
                  <p>Location: {r.location}</p>
                  <p>IP: {r.ip_address}</p>
                  <p>MAC: {r.mac_address}</p>
                  <p>Brand: {r.brand}</p>
                  <p>Model: {r.model}</p>
                </main>
                <footer className='rVisualizerFooterRouter'>
                  <button className='cVisualizerBttnEdit' onClick={() => openEdit(r, 'router')}>Edit</button>
                  <button className='cVisualizerBttnDelete' onClick={() => handleDelete(r.id, 'router')}>Delete</button>
                </footer>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* one modal for two forms */}
      {showModal.show && (
        <div className='cVisualizerModalEditFull'>
           <div className='cVisualizerEditFormFull'>
              <header className='modalHeader'>
                <h3>Editando {showModal.type === 'camera' ? 'Cámara' : 'Router'}</h3>
              </header>

              <div className='modalBodyScroll'>
                {/* CAMPOS COMUNES */}
                <label>Name</label>
                <input value={editData.name || ''} onChange={e => setEditData({...editData, name: e.target.value})} />
                
                <label>Address IP</label>
                <input value={editData.ip_address || ''} onChange={e => setEditData({...editData, ip_address: e.target.value})} />

                {/* cameras form */}
                {showModal.type === 'camera' && (
                  <>
                    <label>URL Address</label>
                    <input value={editData.url_address || ''} onChange={e => setEditData({...editData, url_address: e.target.value})} />
                    
                    <label>Description</label>
                    <textarea value={editData.description || ''} onChange={e => setEditData({...editData, description: e.target.value})} />
                  </>
                )}

                {/* routers form */}
                {showModal.type === 'router' && (
                  <>
                    <label>Address MAC</label>
                    <input value={editData.mac_address || ''} onChange={e => setEditData({...editData, mac_address: e.target.value})} />
                    
                    <div className='inputGroupTwo'>
                      <div>
                        <label>Brand</label>
                        <input value={editData.brand || ''} onChange={e => setEditData({...editData, brand: e.target.value})} />
                      </div>
                      <div>
                        <label>Model</label>
                        <input value={editData.model || ''} onChange={e => setEditData({...editData, model: e.target.value})} />
                      </div>
                    </div>
                  </>
                )}

                {/* latitude / longitude */}
                <div className='inputGroupTwo'>
                  <div>
                    <label>Latitude</label>
                    <input type="number" value={editData.latitude || ''} onChange={e => setEditData({...editData, latitude: e.target.value})} />
                  </div>
                  <div>
                    <label>Longitude</label>
                    <input type="number" value={editData.longitude || ''} onChange={e => setEditData({...editData, longitude: e.target.value})} />
                  </div>
                </div>
                
                <label>Status</label>
                <select value={editData.status || ''} onChange={e => setEditData({...editData, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div className='cVisualizerContainerBttnsEdit'>
                <button className='cVisualizerBtnSaveEdit' onClick={handleUpdate}>Save Changes</button>
                <button className='cVisualizerBtnCancelEdit' onClick={() => setShowModal({show: false})}>Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default AdminBody;