import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function ViewGeolocationCamera({ cameras }) {
  return (
    <MapContainer
      center={[9.9281, -84.0907]}
      zoom={8}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {cameras.map((cam) => {
        if (!cam.latitude || !cam.longitude) return null;

        return (
          <Marker
            key={cam.id}
            position={[cam.latitude, cam.longitude]}
          />
        );
      })}
    </MapContainer>
  );
}