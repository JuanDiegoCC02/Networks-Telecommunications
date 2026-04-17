import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AdminNav from './AdminNav'; 
import { getCameras, patchCameras, deleteCameras } from '../services/camerasApi';
import { getRouters, patchRouters, deleteRouters } from '../services/routersApi';
import "../styles/AdminBody.css"
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
        <section className='adminBdContainerFull'>
          <h3 className='adminBdTitle'>📸 Control Cameras</h3>

          <div className="adminMapSection">
            <MapContainer center={[9.7489, -83.7534]} zoom={8} style={{ height: "400px", width: "100%", borderRadius: "15px", border: '2px solid #00d4ff' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredCameras.map(c => c.latitude && (
                <Marker key={`c-${c.id}`} position={[parseFloat(c.latitude), parseFloat(c.longitude)]}>
                  <Popup><strong>📸 Camera:</strong> {c.name}<br/>{c.location}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className='adminBdNavFull'>
            <input className='adminBdSearch' placeholder="Camera Search..." onChange={e => setCSearch(e.target.value)} />
            <select className='adminBdSelectSearch' onChange={e => setCFilterLoc(e.target.value)}>
               <option className='adminBdOption' value="">All Locations</option>
               <option className='adminBdOption'  value="San José">San José</option>
               <option className='adminBdOption' value="Cartago">Cartago</option>
               <option className='adminBdOption' value="Heredia">Heredia</option>
               <option className='adminBdOption' value="Alajuela">Alajuela</option>
               <option className='adminBdOption' value="Limón">Limón</option>
               <option className='adminBdOption' value="Puntarenas">Puntarenas</option>
               <option className='adminBdOption' value="Guanacaste">Guanacaste</option>
            </select>
          </div>

          <div className='adminBdContainerCamerasFull'>
            {filteredCameras.map(c => (
              <div key={c.id} className='adminBdContainerCameraOwn'>
                <header className='adminBdHeaderCamera'><h4>{c.name}</h4><span>{c.status}</span></header>
                <main className='adminBdMainCamera'>
                  <p className='adminBdCamerasLocation'>Location: {c.location}</p>
                  <small className='adminBdCamerasDescrip'>{c.description}</small>
                  <p className='adminBdCamerasIP'>IP: {c.ip_address}</p>
                  <p className='adminBdCamerasURL'>URL: {c.url_address}</p> 
                </main>
                <footer className='adminBdFooterCamera'>
                  <button className='adminBdBttnEdit' onClick={() => openEdit(c, 'camera')}>Edit</button>
                  <button className='adminBdBttnDelete' onClick={() => handleDelete(c.id, 'camera')}>Delete</button>
                </footer>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className='adminBdContainerFull '>
          <h3 className='adminBdTitle'>🌐 Control Routers</h3>

          <div className="adminMapSection">
            <MapContainer center={[9.7489, -83.7534]} zoom={8} style={{ height: "400px", width: "100%", borderRadius: "15px", border: '2px solid #ff9f00' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredRouters.map(r => r.latitude && (
                <Marker key={`r-${r.id}`} position={[parseFloat(r.latitude), parseFloat(r.longitude)]}>
                  <Popup><strong>🌐 Router:</strong> {r.name}<br/>{r.location}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className='adminBdNavFull'>
            <input className='adminBdSearch' placeholder="Router Search..." onChange={e => setRSearch(e.target.value)} />
            <select className='adminBdSelectSearch' onChange={e => setRFilterLoc(e.target.value)}>
               <option className='adminBdOption' value="">All Locations</option>
               <option className='adminBdOption' value="San José">San José</option>
               <option className='adminBdOption' value="Cartago">Cartago</option>
               <option className='adminBdOption' value="Heredia">Heredia</option>
               <option className='adminBdOption' value="Alajuela">Alajuela</option>
               <option className='adminBdOption' value="Limón">Limón</option>
               <option className='adminBdOption' value="Puntarenas">Puntarenas</option>
               <option className='adminBdOption' value="Guanacaste">Guanacaste</option>
            </select>
          </div>

          <div className='adminBdContainerRoutersFull'>
            {filteredRouters.map(r => (
              <div key={r.id} className='adminBdContainerRouterOwn'>
                <header className='adminBdHeaderRouter'><h4>{r.name}</h4><span>{r.status}</span></header>
                <main className='adminBdMainRouter'>
                  <p className='adminBdRoutersLocation'>Location: {r.location}</p>
                  <p className='adminBdRoutersIP'>IP: {r.ip_address}</p>
                  <p className='adminBdRoutersMAC'>MAC: {r.mac_address}</p>
                  <p className='adminBd RoutersBrand'>Brand: {r.brand}</p>
                  <p className='adminBdModel'>Model: {r.model}</p>
                </main>
                <footer className='adminBdFooterRouter'>
                  <button className='adminBdBttnEdit' onClick={() => openEdit(r, 'router')}>Edit</button>
                  <button className='adminBdBttnDelete' onClick={() => handleDelete(r.id, 'router')}>Delete</button>
                </footer>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* one modal for two forms */}
      {showModal.show && (
        <div className='adminBdModalEditFull'>
           <div className='adminBdEditFormFull'>
              <header className='adminBdModalHeader'>
                <h3 className='adminBdModalTitle'>Editando {showModal.type === 'camera' ? 'Cámara' : 'Router'}</h3>
              </header>

              <div className='adminBdModalBodyScroll'>
                {/* CAMPOS COMUNES */}
                <label className='adminBdLbModal'>Name</label>
                <input className='adminBdINPModal' value={editData.name || ''} onChange={e => setEditData({...editData, name: e.target.value})} />
                
                <label className='adminBdLbModal'>Address IP</label>
                <input className='adminBdINPModal' value={editData.ip_address || ''} onChange={e => setEditData({...editData, ip_address: e.target.value})} />

                {/* cameras form */}
                {showModal.type === 'camera' && (
                  <>
                    <label className='adminBdLbModal'>URL Address</label>
                    <input className='adminBdINPModal' value={editData.url_address || ''} onChange={e => setEditData({...editData, url_address: e.target.value})} />
                    
                    <label className='adminBdLbModal'>Description</label>
                    <textarea className='adminBdINPModal' value={editData.description || ''} onChange={e => setEditData({...editData, description: e.target.value})} />
                  </>
                )}

                {/* routers form */}
                {showModal.type === 'router' && (
                  <>
                    <label className='adminBdLbModal'>Address MAC</label>
                    <input className='adminBdINPModal' value={editData.mac_address || ''} onChange={e => setEditData({...editData, mac_address: e.target.value})} />
                    
                    <div className='inputGroupTwo'>
                      <div>
                        <label className='adminBdLbModal'>Brand</label>
                        <input className='adminBdINPModal' value={editData.brand || ''} onChange={e => setEditData({...editData, brand: e.target.value})} />
                      </div>
                      <div>
                        <label className='adminBdLbModal'>Model</label>
                        <input className='adminBdINPModal' value={editData.model || ''} onChange={e => setEditData({...editData, model: e.target.value})} />
                      </div>
                    </div>
                  </>
                )}

                {/* latitude / longitude */}
                <div className='inputGroupTwo'>
                  <div>
                    <label className='adminBdLbModal'>Latitude</label>
                    <input className='adminBdINPModal' type="number" value={editData.latitude || ''} onChange={e => setEditData({...editData, latitude: e.target.value})} />
                  </div>
                  <div>
                    <label className='adminBdLbModal'>Longitude</label>
                    <input className='adminBdINPModal' type="number" value={editData.longitude || ''} onChange={e => setEditData({...editData, longitude: e.target.value})} />
                  </div>
                </div>
                
                <label className='adminBdLbModal'>Status</label>
                <select className='adminBdSelectModal' value={editData.status || ''} onChange={e => setEditData({...editData, status: e.target.value})}>
                  <option className='adminBdOptModal' value="Active">Active</option>
                  <option className='adminBdOptModal' value="Inactive">Inactive</option>
                  <option className='adminBdOptModal' value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div className='adminBdContainerBttnsEdit'>
                <button className='adminBdBtnSaveEdit' onClick={handleUpdate}>Save Changes</button>
                <button className='adminBdBtnCancelEdit' onClick={() => setShowModal({show: false})}>Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default AdminBody;