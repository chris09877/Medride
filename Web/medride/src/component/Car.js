import React from "react";
import "./Car.css";

import { FiDelete } from "react-icons/fi";

const Car = ({ car, onDelete }) => {
  const handleDeleteButtonClick = async () => {
    try {
      await onDelete(car._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      
    </>
  );
};

export default Car;