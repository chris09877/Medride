import React, { useEffect, useState } from "react";
import PopupMenu from "../component/PopupPatients";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import "./Patients.css";

// Theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
// Core
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

import config from "../config";

import { BiHandicap } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { FiDelete } from "react-icons/fi";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/patients`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatientButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleDeletePatient = async (patientId) => {
    try {
      await fetch(`${config.apiUrl}/patients/delete/${patientId}`, {
        method: "DELETE",
      });

      const response = await fetch(`${config.apiUrl}/patients`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopupMenu = () => {
    setIsPopupOpen(false);
  };

  const handleCreatePatient = async (patientData) => {
    try {
      const response = await fetch(`${config.apiUrl}/patients/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        console.log("Patient created successfully");

        const data = await response.json();
        setPatients([...patients, data]);
      } else {
        console.log("Failed to create patient");
      }
    } catch (error) {
      console.error(error);
    }
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="patient-container">
        <Header />
        <Navbar />
        <div className="patient-functions">
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
          <AiOutlineUserAdd
            className="add-patient-button"
            onClick={handleAddPatientButtonClick}
          />
        </div>

        <div className="patient-list">
          <DataTable
            value={patients}
            paginator
            rows={7}
            filters={filters}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="name"
              header="Name"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="dateOfBirth"
              header="Date of Birth"
              sortable
              style={{ width: "25%" }}
              body={(rowData) => {
                const date = new Date(rowData.dateOfBirth);
                return (
                  <span>{`${
                    monthNames[date.getMonth()]
                  } ${date.getDate()}, ${date.getFullYear()}`}</span>
                );
              }}
            ></Column>
            <Column
              field="title"
              header="Title"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="disabled"
              header={<BiHandicap className="icon-handicap" />}
              sortable
              style={{ width: "25%" }}
              body={(rowData) => (
                <span>
                  {rowData.disabled ? (
                    <RiCheckLine className="icon-yes" />
                  ) : (
                    <RiCloseLine className="icon-no" />
                  )}
                </span>
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
                    onClick={() => handleDeletePatient(rowData._id)}
                  />
                </span>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>
      {isPopupOpen ? (
        <PopupMenu
          onClose={handleClosePopupMenu}
          onCreate={handleCreatePatient}
        />
      ) : null}
    </>
  );
}
