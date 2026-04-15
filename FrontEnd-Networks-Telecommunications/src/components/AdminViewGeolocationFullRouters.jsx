import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function AdminViewGeolocationFullRouters({ routers }) {
  return (
    <MapContainer
      center={[9.9281, -84.0907]}
      zoom={8}
      style={{ height: "400px", width: "100%", borderRadius: "12px", border: '2px solid #ff9f00', marginBottom: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {routers.map((r) => r.latitude && r.longitude && (
        <Marker key={`map-router-${r.id}`} position={[parseFloat(r.latitude), parseFloat(r.longitude)]}>
          <Popup>
            <strong>🌐 Router:</strong> {r.name}<br/>
            {r.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}