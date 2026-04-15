import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AdminNav from './AdminNav'; 
import { getCameras, patchCameras, deleteCameras } from '../services/camerasApi';
import { getRouters, patchRouters, deleteRouters } from '../services/routersApi';

import "leaflet/dist/leaflet.css";
import "../styles/CamerasVisualizer.css";
import "../styles/RoutersVisualizer.css";

function AdminBody() {
  // --- ESTADOS DE DATOS ---
  const [cameras, setCameras] = useState([]);
  const [routers, setRouters] = useState([]);
  const [reload, setReload] = useState(false);
  
  // --- NAVEGACIÓN (Controla qué se muestra) ---
  const [activeTab, setActiveTab] = useState('cameras'); 

  // --- FILTROS Y MODAL ---
  const [showModal, setShowModal] = useState({ show: false, type: '', data: null });
  const [cSearch, setCSearch] = useState("");
  const [cFilterLoc, setCFilterLoc] = useState("");
  const [rSearch, setRSearch] = useState("");
  const [rFilterLoc, setRFilterLoc] = useState("");
  const [editData, setEditData] = useState({});

  // Carga de datos
  useEffect(() => {
    async function loadData() {
      const cData = await getCameras();
      const rData = await getRouters();
      setCameras([...cData].sort((a, b) => b.id - a.id));
      setRouters([...rData].sort((a, b) => b.id - a.id));
    }
    loadData();
  }, [reload]);

  // Lógica de filtrado (Cámaras)
  const filteredCameras = cameras.filter(c => 
    (c.name.toLowerCase().includes(cSearch.toLowerCase()) || c.ip_address.includes(cSearch)) &&
    (cFilterLoc === "" || c.location === cFilterLoc)
  );

  // Lógica de filtrado (Routers)
  const filteredRouters = routers.filter(r => 
    (r.name.toLowerCase().includes(rSearch.toLowerCase()) || r.ip_address.includes(rSearch)) &&
    (rFilterLoc === "" || r.location === rFilterLoc)
  );

  // --- HANDLERS ---
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
      
      {/* 1. NAVEGACIÓN (Componente externo para cambiar pestañas) */}
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. RENDERIZADO CONDICIONAL (Alterna entre Cámaras y Routers) */}
      {activeTab === 'cameras' ? (
        <section className='cVisualizerContainerFull animate__animated animate__fadeIn'>
          <h3 className='cVizualizerTitle'>📸 Gestión de Cámaras</h3>

          {/* Mapa de Cámaras */}
          <div className="adminMapSection" style={{ marginBottom: "30px" }}>
            <MapContainer center={[9.7489, -83.7534]} zoom={8} style={{ height: "400px", width: "100%", borderRadius: "15px", border: '2px solid #00d4ff' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredCameras.map(c => c.latitude && (
                <Marker key={`c-${c.id}`} position={[parseFloat(c.latitude), parseFloat(c.longitude)]}>
                  <Popup><strong>📸 Cámara:</strong> {c.name}<br/>{c.location}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className='cVisualizerNavFull'>
            <input className='cVisualizerSearch' placeholder="Buscar cámara..." onChange={e => setCSearch(e.target.value)} />
            <select className='cVisualizerSelectSearch' onChange={e => setCFilterLoc(e.target.value)}>
               <option value="">Todas las Locaciones</option>
               <option value="San José">San José</option>
               <option value="Cartago">Cartago</option>
            </select>
          </div>

          <div className='cVizualizerContainerCamerasFull'>
            {filteredCameras.map(c => (
              <div key={c.id} className='cVisualizerContainerCameraOwn'>
                <header className='cVisualizerHeaderCamera'><h4>{c.name}</h4><span>{c.status}</span></header>
                <main className='cVisualizerMainCamera'>
                  <p>IP: {c.ip_address}</p>
                  <p>{c.location}</p>
                </main>
                <footer className='cVisualizerFooterCamera'>
                  <button className='cVisualizerBttnEdit' onClick={() => openEdit(c, 'camera')}>Editar</button>
                  <button className='cVisualizerBttnDelete' onClick={() => handleDelete(c.id, 'camera')}>Borrar</button>
                </footer>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className='rVisualizerContainerFull animate__animated animate__fadeIn'>
          <h3 className='rVisualizerTitle'>🌐 Gestión de Routers</h3>

          {/* Mapa de Routers */}
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
            <input className='rVisualizerSearch' placeholder="Buscar router..." onChange={e => setRSearch(e.target.value)} />
            <select className='rVisualizerSelectSearch' onChange={e => setRFilterLoc(e.target.value)}>
               <option value="">Todas las Locaciones</option>
               <option value="San José">San José</option>
               <option value="Cartago">Cartago</option>
            </select>
          </div>

          <div className='rVisualizerContainerRoutersFull'>
            {filteredRouters.map(r => (
              <div key={r.id} className='rVisualizerContainerRouterOwn'>
                <header className='rVisualizerHeaderRouter'><h4>{r.name}</h4><span>{r.status}</span></header>
                <main className='rVisualizerMainRouter'>
                  <p>IP: {r.ip_address} | MAC: {r.mac_address}</p>
                  <p>Marca: {r.brand} - Mod: {r.model}</p>
                </main>
                <footer className='rVisualizerFooterRouter'>
                  <button className='cVisualizerBttnEdit' onClick={() => openEdit(r, 'router')}>Editar</button>
                  <button className='cVisualizerBttnDelete' onClick={() => handleDelete(r.id, 'router')}>Borrar</button>
                </footer>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. MODAL DE EDICIÓN (Unificado para ambos) */}
      {showModal.show && (
        <div className='cVisualizerModalEditFull'>
           <div className='cVisualizerEditFormFull'>
              <h3>Editando {showModal.type === 'camera' ? 'Cámara' : 'Router'}</h3>
              <label>Nombre</label>
              <input value={editData.name || ''} onChange={e => setEditData({...editData, name: e.target.value})} />
              <label>Dirección IP</label>
              <input value={editData.ip_address || ''} onChange={e => setEditData({...editData, ip_address: e.target.value})} />
              
              {showModal.type === 'router' && (
                <>
                  <label>Dirección MAC</label>
                  <input value={editData.mac_address || ''} onChange={e => setEditData({...editData, mac_address: e.target.value})} />
                </>
              )}

              <div className='cVisualizerContainerBttnsEdit'>
                <button className='cVisualizerBtnSaveEdit' onClick={handleUpdate}>Guardar Cambios</button>
                <button className='cVisualizerBtnCancelEdit' onClick={() => setShowModal({show: false})}>Cancelar</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default AdminBody;