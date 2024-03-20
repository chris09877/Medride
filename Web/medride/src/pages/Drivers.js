import React, { useEffect, useState } from "react";
import PopupMenu from "../component/PopupDriver";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import "./Drivers.css";

// Theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
// Core
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

import { AiFillCar } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";

import config from "../config";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/drivers`);
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriverButtonClick = () => {
    setPopupOpen(true);
  };

  const handleDeleteDriver = async (driverId) => {
    try {
      await fetch(`${config.apiUrl}/drivers/delete/${driverId}`, {
        method: "DELETE",
      });

      const response = await fetch(`${config.apiUrl}/drivers`);
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopupMenu = () => {
    setPopupOpen(false);
  };

  const handleCreateDriver = async (driverData) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driverData),
      });

      if (response.ok) {
        // Handle successful creation
        console.log("Driver created successfully");

        const data = await response.json();
        setDrivers([...drivers, data]);
      } else {
        // Handle failed creation
        console.log("Failed to create driver");
      }
    } catch (error) {
      console.error(error);
    }
    setPopupOpen(false);
  };

  return (
    <>
      <div className="driver-container">
        <Header />
        <Navbar />

        <div className="driver-functions">
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
          <AiFillCar
            className="add-driver-button"
            onClick={handleAddDriverButtonClick}
          />
        </div>

        <div className="driverList">
          <DataTable
            value={drivers}
            paginator
            rows={9}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="name"
              header="Name"
              sortable
              style={{ width: "50%" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              sortable
              style={{ width: "50%" }}
            ></Column>
            <Column
              field=""
              header=""
              style={{ width: "25%" }}
              body={(rowData) => (
                <span>
                  <FiDelete
                    className="icon-delete"
                    onClick={() => handleDeleteDriver(rowData._id)}
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
          onCreate={handleCreateDriver}
        />
      )}
    </>
  );
}
