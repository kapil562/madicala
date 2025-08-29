import React from "react";
import Header from "../component/Header"
import "./Dashbord.css";
import { FaUserFriends, FaCalendarAlt, FaPills, FaChartLine } from "react-icons/fa";
import { AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const lowStockItems = [
    { name: "Retinol Cream", current: 3, min: 10 },
    { name: "Hair Growth Serum", current: 5, min: 15 },
    { name: "Vitamin D Tablets", current: 8, min: 20 },
  ];

  return (
    <div className="dashboard">
     <Header/>
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your clinic overview.</p>
        </div>
        <div className="header-buttons">
          <button className="btn primary">+ Add Patient</button>
          <button className="btn outline">
            <FaCalendarAlt /> Appointments
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="card">
          <h3>Total Patients</h3>
          <h2>247</h2>
          <p className="positive">+12%</p>
          <FaUserFriends className="icon" />
        </div>
        <div className="card">
          <h3>Today's Appointments</h3>
          <h2>8</h2>
          <p>2 pending</p>
          <FaCalendarAlt className="icon" />
        </div>
        <div className="card">
          <h3>Medicine Stock</h3>
          <h2>156</h2>
          <p className="negative">5 low stock</p>
          <FaPills className="icon" />
        </div>
        <div className="card">
          <h3>Monthly Revenue</h3>
          <h2>₹45,230</h2>
          <p className="positive">+8.2%</p>
          <FaChartLine className="icon" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Recent Patients */}
        <div className="content-card">
          <div className="card-header">
            <h3>Recent Patients</h3>
            <button className="view-all">👁 View All</button>
          </div>
          <ul className="patient-list">
            <li>
              <div className="avatar">PS</div>
              <div>
                <h4>Priya Sharma</h4>
                <p>Acne Treatment • Age 28</p>
              </div>
              <span className="status active">Active</span>
              <span className="time">Today</span>
            </li>
            <li>
              <div className="avatar">RK</div>
              <div>
                <h4>Rahul Kumar</h4>
                <p>Hair Fall • Age 35</p>
              </div>
              <span className="status follow">Follow-up</span>
              <span className="time">Yesterday</span>
            </li>
            <li>
              <div className="avatar">AS</div>
              <div>
                <h4>Anjali Singh</h4>
                <p>Skin Rejuvenation • Age 42</p>
              </div>
              <span className="status treatment">Treatment</span>
              <span className="time">2 days ago</span>
            </li>
          </ul>
        </div>

        {/* Today's Appointments */}
        <div className="content-card">
          <div className="card-header">
            <h3>Today's Appointments</h3>
          </div>
          <ul className="appointment-list">
            <li>
              <div>
                <h4>Meera Patel</h4>
                <p>Consultation</p>
              </div>
              <span className="time">10:00 AM</span>
            </li>
            <li>
              <div>
                <h4>Arjun Reddy</h4>
                <p>Follow-up</p>
              </div>
              <span className="time">11:30 AM</span>
            </li>
            <li>
              <div>
                <h4>Kavita Joshi</h4>
                <p>Treatment</p>
              </div>
              <span className="time">2:00 PM</span>
            </li>
            <li>
              <div>
                <h4>Suresh Gupta</h4>
                <p>Check-up</p>
              </div>
              <span className="time">3:30 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="alert-container">
        <div className="alert-header">
          <AlertTriangle size={26} className="alert-icon" />
          <h2>Low Stock Alert</h2>
        </div>

        <div className="card-wrapper">
          {lowStockItems.map((item, index) => {
            const percent = Math.min((item.current / item.min) * 100, 100);
            return (
              <div key={index} className="stock-card">
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>
                    Current: <b>{item.current}</b> | Min: <b>{item.min}</b>
                  </p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
                <span className="badge">{item.current}</span>
              </div>
            );
          })}
        </div>

        <button className="manage-btn">Manage Medicine Stock</button>
      </div>
    </div>
  );
};

export default Dashboard;
