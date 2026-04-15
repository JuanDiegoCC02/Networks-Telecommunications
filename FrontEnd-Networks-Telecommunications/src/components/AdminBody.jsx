import React, { useEffect, useState } from 'react';
// Importamos los nuevos componentes de mapa
import AdminViewGeolocationFullCameras from './AdminViewGeolocationFullCameras';
import AdminViewGeolocationFullRouters from './AdminViewGeolocationFullRouters';

import { getCameras, patchCameras, deleteCameras } from '../services/camerasApi';
import { getRouters, patchRouters, deleteRouters } from '../services/routersApi';
import "leaflet/dist/leaflet.css";
import "../styles/CamerasVisualizer.css";
import "../styles/RoutersVisualizer.css";

function AdminBody() {
  const [cameras, setCameras] = useState([]);
  const [routers, setRouters] = useState([]);
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState({ show: false, type: '', data: null });

  const [cSearch, setCSearch] = useState("");
  const [cFilterLoc, setCFilterLoc] = useState("");
  const [rSearch, setRSearch] = useState("");
  const [rFilterLoc, setRFilterLoc] = useState("");
  const [editData, setEditData] = useState({});

  useEffect(() => {
    async function loadData() {
      const [cData, rData] = await Promise.all([getCameras(), getRouters()]);
      setCameras([...cData].sort((a, b) => b.id - a.id));
      setRouters([...rData].sort((a, b) => b.id - a.id));
    }
    loadData();
  }, [reload]);

  const filteredCameras = cameras.filter(c => 
    (c.name.toLowerCase().includes(cSearch.toLowerCase()) || c.ip_address.includes(cSearch)) &&
    (cFilterLoc === "" || c.location === cFilterLoc)
  );

  const filteredRouters = routers.filter(r => 
    (r.name.toLowerCase().includes(rSearch.toLowerCase()) || r.ip_address.includes(rSearch)) &&
    (rFilterLoc === "" || r.location === rFilterLoc)
  );

  const openEdit = (item, type) => {
    setEditData(item);
    setShowModal({ show: true, type, data: item });
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`¿Eliminar ${type === 'camera' ? 'cámara' : 'router'}?`)) {
      type === 'camera' ? await deleteCameras(id, "api/cameras") : await deleteRouters(id, "api/routers");
      setReload(!reload);
    }
  };

  const handleUpdate = async () => {
    try {
      if (showModal.type === 'camera') {
        await patchCameras(editData, showModal.data.id);
      } else {
        await patchRouters(editData, showModal.data.id);
      }
      setShowModal({ show: false, type: '', data: null });
      setReload(!reload);
    } catch (e) { alert("Error al actualizar"); }
  };

  return (
    <div className='adminBodyContainer'>
      
      {/* SECCIÓN CÁMARAS */}
      <section className='cVisualizerContainerFull' style={{ marginBottom: '60px' }}>
        <h3 className='cVizualizerTitle'>📸 Gestión de Cámaras</h3>
        
        {/* Mapa exclusivo para Cámaras */}
        <AdminViewGeolocationFullCameras cameras={filteredCameras} />

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

      <hr style={{ borderColor: '#444', margin: '40px 0' }} />

      {/* SECCIÓN ROUTERS */}
      <section className='rVisualizerContainerFull'>
        <h3 className='rVisualizerTitle'>🌐 Gestión de Routers</h3>
        
        {/* Mapa exclusivo para Routers */}
        <AdminViewGeolocationFullRouters routers={filteredRouters} />

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

      {/* MODAL DE EDICIÓN (Se mantiene igual) */}
      {showModal.show && (
        <div className='cVisualizerModalEditFull'>
           <div className='cVisualizerEditFormFull'>
              <h3>Editando {showModal.type === 'camera' ? 'Cámara' : 'Router'}</h3>
              <div className='cVisualizerContainerOwnEdit'>
                <label>Nombre</label>
                <input className='cVisualizerInputFormEdit' value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} />
              </div>
              {/* ... Resto de inputs ... */}
              <div className='cVisualizerContainerBttnsEdit'>
                <button className='cVisualizerBtnSaveEdit' onClick={handleUpdate}>Guardar</button>
                <button className='cVisualizerBtnCancelEdit' onClick={() => setShowModal({show: false})}>Cancelar</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default AdminBody;