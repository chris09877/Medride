import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Map from "../component/Map";
import "./Maps.css";

export default function Maps() {
  return (
    <div className="mapsContainer">
      <Header className="header" />
      <Navbar className="nav" />
      <div className="map">
        <Map className="map" />
      </div>
    </div>
  );
}
