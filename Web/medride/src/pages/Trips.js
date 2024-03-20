import React, { useEffect, useState } from "react";
import PopupMenu from "../component/PopupTrip";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import moment from "moment";
import "./Trips.css";

// Theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
// Core
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

import { MdAddLocationAlt } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { BsCircle } from "react-icons/bs";

import config from "../config";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/trips`);
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrips();
  }, []);

  const handleAddTripButtonClick = () => {
    setPopupOpen(true);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await fetch(`${config.apiUrl}/trips/delete/${tripId}`, {
        method: "DELETE",
        headers: {},
      });

      const response = await fetch(`${config.apiUrl}/trips`);
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopupMenu = () => {
    setPopupOpen(false);
  };

  const handleCreateTrips = async (tripData) => {
    try {
      const response = await fetch(`${config.apiUrl}/trips/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (response.ok) {
        console.log("Trip created successfully");

        const data = await response.json();
        setTrips([...trips, data]);
      } else {
        console.log("Failed to create trip");
      }
    } catch (error) {
      console.error(error);
    }
    setPopupOpen(false);
  };

  return (
    <>
      <div className="trip-container">
        <Header />
        <Navbar />

        <div className="trip-functions">
          <InputText
            placeholder="Search..."
            onInput={(e) =>
              setFilters({
                global: {
                  value: e.target.value,
                  matchMode: FilterMatchMode.CONTAINS,
                },
              })
            }
          />
          <MdAddLocationAlt
            className="add-trip-button"
            onClick={handleAddTripButtonClick}
          />
        </div>

        <div className="tripList">
          <DataTable
            value={trips}
            paginator
            rows={7}
            filters={filters}
            sortField="status"
            sortOrder={1}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="name"
              header="Name"
              sortable
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="from"
              header="From"
              sortable
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="to"
              header="To"
              sortable
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="appointment"
              header={<BiTimeFive className="icon-time" />}
              sortable
              style={{ width: "25%" }}
              body={(rowData) => {
                const formattedAppointment = moment(rowData.appointment).format(
                  "DD-MM-YYYY HH:mm "
                );
                return <span>{formattedAppointment}</span>;
              }}
            ></Column>
            <Column
              header="Status"
              field="status"
              style={{ width: "15%" }}
              sortable
              body={(rowData) => (
                <td>
                  {rowData.status === 0 && <BsCircle className="trip-0" />}
                  {rowData.status === 1 && <BsCircle className="trip-1" />}
                </td>
              )}
            ></Column>

            <Column
              field=""
              header=""
              style={{ width: "15%" }}
              body={(rowData) => (
                <span>
                  <FiDelete
                    className="icon-delete"
                    onClick={() => handleDeleteTrip(rowData._id)}
                  />
                </span>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>
      {isPopupOpen && (
        <PopupMenu
          onClose={handleClosePopupMenu}
          onCreate={handleCreateTrips}
        />
      )}
    </>
  );
}
