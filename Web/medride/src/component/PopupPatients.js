import React, { useState, useEffect } from "react";
import "./PopupPatient.css";

const PopupMenu = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);
  const [isTitleSelected, setIsTitleSelected] = useState(false);

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleCreateButtonClick = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      const fullName = `${firstName} ${name}`;
      const newPatient = { name: fullName, dateOfBirth, title, disabled };
      onCreate(newPatient);

      // Reset the form after creating the patient
      setName("");
      setDateOfBirth("");
      setTitle("");
      setDisabled(false);
      setIsNameValid(true);
      setIsFirstNameValid(true);
      setIsDateValid(true);
      setIsTitleSelected(false);
    }
  };

  useEffect(() => {
    setIsNameValid(name.trim() !== "");
  }, [name]);

  useEffect(() => {
    setIsFirstNameValid(firstName.trim() !== "");
  }, [firstName]);

  useEffect(() => {
    setIsDateValid(validateDateOfBirth());
  }, [dateOfBirth]);

  const validateForm = () => {
    const isFormValid =
      isNameValid && isFirstNameValid && isDateValid && isTitleSelected;
    return isFormValid;
  };

  const validateDateOfBirth = () => {
    if (dateOfBirth === "") {
      return false;
    }

    const inputDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 150);

    return inputDate >= minDate && inputDate <= currentDate;
  };

  return (
    <div className="popup-menu">
      <div className="popup-content">
        <div className="close-button" onClick={handleCloseButtonClick}>
          X
        </div>
        <h2>NEW PATIENT</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={isNameValid ? "" : "invalid-input"}
        />
        {!isNameValid && (
          <p className="error-message">Please enter a valid name.</p>
        )}
        <input
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={isFirstNameValid ? "" : "invalid-input"}
        />
        {!isFirstNameValid && (
          <p className="error-message">Please enter a valid firstname.</p>
        )}
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className={isDateValid ? "" : "invalid-input"}
        />
        {!isDateValid && (
          <p className="error-message">Please enter a valid date of birth.</p>
        )}
        <div className="title-container">
          <span>Title:</span>
          <label>
            <input
              type="radio"
              name="title"
              value="Mr."
              checked={title === "Mr."}
              onChange={(e) => setTitle(e.target.value)}
              onClick={() => setIsTitleSelected(true)}
            />
            Mr.
          </label>
          <label>
            <input
              type="radio"
              name="title"
              value="Ms."
              checked={title === "Ms."}
              onChange={(e) => setTitle(e.target.value)}
              onClick={() => setIsTitleSelected(true)}
            />
            Ms.
          </label>
          <label>
            <input
              type="radio"
              name="title"
              value="Other"
              checked={title === "Other"}
              onChange={(e) => setTitle(e.target.value)}
              onClick={() => setIsTitleSelected(true)}
            />
            Other
          </label>
        </div>
        {!isTitleSelected && (
          <p className="error-message">Please select a title.</p>
        )}
        <div>
          <label>
            <span>Disabled</span>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              <span className="slider"></span>
            </div>
          </label>
        </div>

        <div className="button-container">
          <button
            className={`create-button ${
              !isNameValid || !isDateValid || !isTitleSelected
                ? "invalid-button"
                : ""
            }`}
            onClick={handleCreateButtonClick}
            disabled={!isNameValid || !isDateValid || !isTitleSelected}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
