import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import config from "../config";

import "./PopupPlanning.css";

const PopupPlanning = ({ onClose, onCreate, selectedCar }) => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [currentDriver, setCurrentDriver] = useState(null);

  const handleCloseButtonClick = () => {
    onClose();
  };

  useEffect(() => {
    fetchCurrentDriver();
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/Drivers`);
      if (response.ok) {
        const data = await response.json();
        setDrivers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentDriver = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/Drivers/plate/${selectedCar.plate}`
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentDriver(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateButtonClick = () => {
    const newPlanning = { driver: selectedDriver, car: selectedCar };
    onCreate(newPlanning);
  };

  return (
    <div className="popup-menu">
      <div className="popup-content">
        <div className="close-button" onClick={handleCloseButtonClick}>
          X
        </div>
        <h2> NEW PLANNING </h2>

        <div className="planning-plate">
          <p>{selectedCar.plate}</p>
        </div>

        <Select
          options={drivers}
          getOptionLabel={(driver) => driver.name}
          getOptionValue={(driver) => driver._id}
          value={selectedDriver}
          onChange={(driver) => setSelectedDriver(driver)}
          placeholder={
            currentDriver ? `${currentDriver.driver.name}` : "Select..."
          }
        />
        <div>
          <button
            className="planning-create-button"
            onClick={handleCreateButtonClick}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupPlanning;
