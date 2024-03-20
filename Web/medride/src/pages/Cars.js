import React, { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";

import config from "../config";

// Theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
// Core
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

import Header from "../component/Header";
import Navbar from "../component/Navbar";
import Popup from "../component/PopupPlanning";
import PopupMenu from "../component/PopupCar";
import "./Cars.css";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupPlanningOpen, setPopupPlanningOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/cars`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, []);

  const handleAddCarButtonClick = () => {
    setPopupOpen(true);
  };

  const handleUpdatePlanning = async (planning) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/plannings/update/${planning.car._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ driverId: planning.driver._id }),
        }
      );

      if (response.ok) {
        console.log("Planning updated successfully");
      } else {
        console.log("Failed to update planning");
      }
    } catch (error) {
      console.error(error);
    }
    setPopupPlanningOpen(false);
  };

  const handleDeleteCar = async (carId) => {
    try {
      await fetch(`${config.apiUrl}/cars/delete/${carId}`, {
        method: "DELETE",
      });

      const response = await fetch(`${config.apiUrl}/cars`);
      const data = await response.json();

      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopupMenu = () => {
    setPopupOpen(false);
  };

  const handleClosePopupPlanning = () => {
    setPopupPlanningOpen(false);
  };

  const handleCreateCars = async (carsData) => {
    try {
      const response = await fetch(`${config.apiUrl}/cars/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carsData),
      });

      if (response.ok) {
        const data = await response.json();
        setCars([...cars, data]);
      } else {
        console.log("Failed to create car");
      }
    } catch (error) {
      console.error(error);
    }
    setPopupOpen(false);
  };

  return (
    <>
      <div className="car-container">
        <Header />
        <Navbar />

        <div className="car-functions">
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
            className="add-car-button"
            onClick={handleAddCarButtonClick}
          />
        </div>

        <div className="car-list">
          <DataTable
            value={cars}
            paginator
            rows={9}
            filters={filters}
            tableStyle={{ minWidth: "50rem" }}
            selectionMode="single"
            selection={selectedCar}
            onSelectionChange={(e) => {
              setSelectedCar(e.value);
              setPopupPlanningOpen(true);
            }}
          >
            <Column
              field="plate"
              header="Plate"
              sortable
              style={{ width: "50%" }}
            ></Column>
            <Column
              field="model"
              header="Model"
              sortable
              style={{ width: "50%" }}
            ></Column>
            <Column
              field=""
              header=""
              style={{ width: "15%" }}
              body={(rowData) => (
                <span>
                  <FiDelete
                    className="icon-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCar(rowData._id);
                    }}
                  />
                </span>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>
      {isPopupOpen && (
        <PopupMenu onClose={handleClosePopupMenu} onCreate={handleCreateCars} />
      )}
      {isPopupPlanningOpen && (
        <Popup
          onClose={handleClosePopupPlanning}
          onCreate={handleUpdatePlanning}
          selectedCar={selectedCar}
        />
      )}
    </>
  );
}
