import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ setCoords }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setCoords(e.latlng); // 🔥 manda al form
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function AddGeolocationCamera({ setCoords }) {
  return (
    <MapContainer
      center={[9.9281, -84.0907]} // Costa Rica
      zoom={8}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker setCoords={setCoords} />
    </MapContainer>
  );
}