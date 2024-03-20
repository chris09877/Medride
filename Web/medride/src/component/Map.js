import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png";

import config from "../config";

const Map = () => {
  const markerIcon = L.icon({
    iconUrl: "MicrosoftTeams-image.png",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const [positions, setPositions] = useState([]);
  const [popUpInfoFrom, setPopUpInfoFrom] = useState("");
  const [popUpInfoTo, setPopUpInfoTo] = useState("");
  const [popUpInfoPatient, setPopUpInfoPatient] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/drivers`);
        const data = await response.json();
        setPositions(data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    const updatePosition = setInterval(fetchPositions, 5000);

    return () => {
      clearInterval(updatePosition);
    };
  }, []);

  const handleMarkerClick = async (key) => {
    setPopUpInfoFrom(" ");
    setPopUpInfoTo(" ");
    setPopUpInfoPatient(" ");
    try {
      const response = await fetch(`${config.apiUrl}/Drivers/${key}/trips`);
      if (response.ok) {
        const tripsId = await response.json();
        tripsId.trips.forEach((trip) => {
          if (trip.status === 0) {
            setPopUpInfoFrom(`From: ${trip.from}`);
            setPopUpInfoTo(`To: ${trip.to}`);
            setPopUpInfoPatient(`Patient name: ${trip.name}`);

            return;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const filteredMarkers = positions.reduce((markers, position) => {
    if (position.location.length === 2) {
      markers.push(
        <Marker
          key={position._id}
          position={position.location}
          icon={markerIcon}
          eventHandlers={{
            click: () => handleMarkerClick(position._id),
          }}
        >
          <Popup>
            <div>
              <h4>{position.name}</h4>
              <p>{popUpInfoPatient}</p>
              <p>{popUpInfoFrom}</p>
              <p>{popUpInfoTo}</p>
            </div>
          </Popup>
        </Marker>
      );
    }
    return markers;
  }, []);

  return (
    <MapContainer
      center={[50.846, 4.3528]}
      zoom={11}
      style={{ height: "100%", width: "100%", borderLeft: "1px solid black" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {filteredMarkers}
    </MapContainer>
  );
};

export default Map;
