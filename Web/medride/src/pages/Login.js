import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import React from "react";
import Cookies from "js-cookie";

import config from "../config";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    Cookies.remove("token");
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const { token, driver } = await response.json();
        Cookies.set("token", token);
        console.log("Login Successful");
        navigate("/trips");
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login_page">
      <div className="login_container">
        <div className="logo_picture">
          <img src="Logo_login.png" alt="Logo" />
        </div>
        <div className="form_group">
          <div className={`input_icon ${isEmailFocused ? "focused" : ""}`}>
            <AiOutlineUser className="icon" />
            <input
              type="email"
              placeholder="Email"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="form_group">
          <div className={`input_icon ${isPasswordFocused ? "focused" : ""}`}>
            <FiLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <button className="login_button" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
