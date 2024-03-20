import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./PopupTrip.css";

import Cookies from "js-cookie";

import config from "../config";

const PopupMenu = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [appointment, setAppointment] = useState(new Date());
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/drivers`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/patients`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrips();
  }, []);

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleCreateButtonClick = () => {
    const newTrip = {
      name: selectedPatient.name,
      from,
      to,
      appointment,
      driverId: selectedDriver._id,
      patient: selectedPatient._id,
    };
    onCreate(newTrip);

    // Reset the form after creating the trip
    setName("");
    setFrom("");
    setTo("");
    setAppointment(new Date());
    setSelectedDriver(null);
    setSelectedPatient(null);
  };

  return (
    <div className="popup-menu">
      <div className="popup-content">
        <div className="close-button" onClick={handleCloseButtonClick}>
          X
        </div>
        <h2>NEW TRIP</h2>
        <label>Select Driver</label>
        <Select
          options={drivers}
          getOptionLabel={(driver) => driver.name}
          getOptionValue={(driver) => driver._id}
          value={selectedDriver}
          onChange={(driver) => setSelectedDriver(driver)}
        />
        <label>Select Patient</label>
        <Select
          options={patients}
          getOptionLabel={(patient) => patient.name}
          getOptionValue={(patient) => patient._id}
          value={selectedPatient}
          onChange={(patient) => setSelectedPatient(patient)}
        />
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <DatePicker
          selected={appointment}
          onChange={(date) => setAppointment(date)}
          showTimeSelect
          dateFormat="Pp"
          className="appointment-input"
        />
        <div className="button-container">
          <button className="create-button" onClick={handleCreateButtonClick}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
