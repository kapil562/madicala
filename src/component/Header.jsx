import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import {
  FaThLarge,
  FaUserFriends,
  FaPills,
  FaCalendarAlt,
  FaFileAlt,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header1">
      {/* Left - Logo & Clinic Info */}
      <div className="header-left1">
        <div className="logo1">
          <span className="logo-icon1">❤</span>
        </div>
        <div className="clinic-info1">
          <h1>SkinCare Clinic</h1>
          <p>Hair & Skin Specialist</p>
        </div>
      </div>

      {/* Hamburger Button (Mobile only) */}
      <div className="menu-toggle1" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation */}
      <nav className={`header-nav1 ${menuOpen ? "open" : ""}`}>
        <a href="#" onClick={() => {setMenuOpen(false);  navigate("/Dashboard");}}>
          <FaThLarge /> Dashboard
        </a>
        <a href="#" onClick={(e) => {  e.preventDefault(); // page reload na ho
            setMenuOpen(false);
            navigate("/patients"); // route path
          }}
        >
          <FaUserFriends /> Patients
        </a>
        <a href="#" onClick={(e) => {  e.preventDefault(); // page reload na ho
            setMenuOpen(false);
            navigate("/medicine"); // route path
          }}
        >
          <FaPills /> Medicine
        </a>
        <a href="#" onClick={(e) => {  e.preventDefault(); // page reload na ho
            setMenuOpen(false);
            navigate("/appointment"); // route path
          }}
        >
          <FaCalendarAlt /> Appointments
        </a>
        <a href="#" onClick={() => setMenuOpen(false)}>
          <FaFileAlt /> Daily Report
        </a>
        <a href="#" onClick={() => setMenuOpen(false)}>
          <FaChartBar /> Monthly Report
        </a>
      </nav>
    </header>
  );
};

export default Header;
