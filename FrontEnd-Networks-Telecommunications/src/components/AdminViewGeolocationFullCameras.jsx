import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function AdminViewGeolocationFullCameras({ cameras }) {
  // Coordenadas centrales de Costa Rica por defecto
  const defaultCenter = [9.7489, -83.7534];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={7}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cameras.map((cam) => {
        // Validación de coordenadas para evitar errores de renderizado
        if (!cam.latitude || !cam.longitude) return null;

        return (
          <Marker 
            key={cam.id} 
            position={[parseFloat(cam.latitude), parseFloat(cam.longitude)]}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                <strong>{cam.name}</strong> <br />
                IP: {cam.ip_address} <br />
                Estado: {cam.status}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}