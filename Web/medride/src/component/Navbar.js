import "./Navbar.css";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const handleLogoutClick = () => {
    console.log("Log out");
    Cookies.remove("token");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <NavLink exact to="/Trips" activeClassName="current">
        Trips
      </NavLink>
      <NavLink exact to="/Cars" activeClassName="current">
        Cars
      </NavLink>
      <NavLink exact to="/Patients" activeClassName="current">
        Patients
      </NavLink>
      <NavLink exact to="/Drivers" activeClassName="current">
        Drivers
      </NavLink>
      <NavLink exact to="/Maps" activeClassName="current">
        Maps
      </NavLink>
      <button className="nav-rounded-button" onClick={handleLogoutClick}>
        Log out
      </button>
    </nav>
  );
}
