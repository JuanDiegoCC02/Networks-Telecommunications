import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function AdminViewGeolocationFullCameras({ cameras }) {
  return (
    <MapContainer
      center={[9.7489, -83.7534]}
      zoom={8}
      style={{ height: "400px", width: "100%", borderRadius: "12px", border: '2px solid #00d4ff', marginBottom: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {cameras.map((c) => c.latitude && c.longitude && (
        <Marker key={`map-cam-${c.id}`} position={[parseFloat(c.latitude), parseFloat(c.longitude)]}>
          <Popup>
            <strong>📸 Cámara:</strong> {c.name}<br/>
            {c.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}