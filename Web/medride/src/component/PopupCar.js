import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import config from "../config";

import './PopupCar.css';

const PopupMenu = ({ onClose, onCreate }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [drivers, setDrivers] = useState("");
  const [cars, setCars] = useState("");

  useEffect(() => {
    fetchDrivers();
    fetchCars();
  }, []);

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleCreateButtonClick = () => {
    const newCar = { model, plate };
    onCreate(newCar);

    setCars("");
    setModel("");
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/Drivers`);
      if (response.ok) {
        const data = await response.json();
        setDrivers(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/cars`);
      if (response.ok) {
        const data = await response.json();
        setCars(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="popup-menu">
      <div className="popup-content">
        <div className="close-button" onClick={handleCloseButtonClick}>
          X
        </div>
        <h2>NEW CAR</h2>
        <input
          type="text"
          placeholder="Plate"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <div>
          <button className="car-create-button" onClick={handleCreateButtonClick}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
