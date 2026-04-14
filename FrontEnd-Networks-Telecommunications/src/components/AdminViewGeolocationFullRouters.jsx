import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function AdminViewGeolocationFullRouters({ routers }) {
  return (
    <MapContainer
      center={[9.9281, -84.0907]}
      zoom={8}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {routers.map((r) => {
        if (!r.latitude || !r.longitude) return null;

        return (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
          />
        );
      })}
    </MapContainer>
  );
}