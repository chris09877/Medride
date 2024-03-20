import React, { useState } from "react";
import "./PopupDriver.css";

const PopupMenu = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleCreateButtonClick = () => {
    const fullName = `${firstName} ${name}`;
    const newDriver = { name: fullName, email, password };
    onCreate(newDriver);

    setName("");
    setFirstName("");
    setEmail("");
  };

  return (
    <div className="popup-menu">
      <div className="popup-content">
        <div className="close-button" onClick={handleCloseButtonClick}>
          X
        </div>
        <h2>NEW DRIVER</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
