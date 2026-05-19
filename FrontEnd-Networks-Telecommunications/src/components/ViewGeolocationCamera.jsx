import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function ViewGeolocationCamera({ cameras }) {
  return (
    <MapContainer
      center={[9.9281, -84.0907]}
      zoom={8}
      style={{height: "400px", width: "100%", borderRadius: "12px", border: "2px solid #00d4ff", marginBottom: "20px"}}>
        
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {cameras.map((cam) => {
        if (!cam.latitude || !cam.longitude) return null;
        return (
          <Marker key={cam.id} position={[ parseFloat(cam.latitude), parseFloat(cam.longitude)]}>

            <Popup>
              <strong>{cam.name}</strong>
              <br />
              {cam.location}
            </Popup>

          </Marker>
        );
      })}
    </MapContainer>
  );
}