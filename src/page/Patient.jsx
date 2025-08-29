import React from "react";
import { Edit2, Trash2, Eye } from "lucide-react";
import Header from "../component/Header";
import "./Patient.css";
import { useNavigate } from "react-router-dom";

const patients = [
  {
    id: 1,
    name: "Priya Sharma",
    gender: "Female",
    age: 28,
    weight: "58kg",
    phone: "+91 98765 43210",
    address: "A-123, Sector 15, Mumbai, Maharashtra 400001",
    lastVisit: "1/15/2024",
    status: "Active",
    conditions: ["Acne", "Dark Circles"],
    nextAppointment: "1/20/2024",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    gender: "Male",
    age: 35,
    weight: "75kg",
    phone: "+91 87654 32109",
    address: "B-456, Green Park, Delhi, India 110016",
    lastVisit: "1/14/2024",
    status: "Follow-up",
    conditions: ["Hair Fall/Baldness"],
    nextAppointment: "1/22/2024",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    gender: "Male",
    age: 35,
    weight: "75kg",
    phone: "+91 87654 32109",
    address: "B-456, Green Park, Delhi, India 110016",
    lastVisit: "1/14/2024",
    status: "Follow-up",
    conditions: ["Hair Fall/Baldness"],
    nextAppointment: "1/22/2024",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    gender: "Male",
    age: 35,
    weight: "75kg",
    phone: "+91 87654 32109",
    address: "B-456, Green Park, Delhi, India 110016",
    lastVisit: "1/14/2024",
    status: "Follow-up",
    conditions: ["Hair Fall/Baldness"],
    nextAppointment: "1/22/2024",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    gender: "Male",
    age: 35,
    weight: "75kg",
    phone: "+91 87654 32109",
    address: "B-456, Green Park, Delhi, India 110016",
    lastVisit: "1/14/2024",
    status: "Follow-up",
    conditions: ["Hair Fall/Baldness"],
    nextAppointment: "1/22/2024",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    gender: "Male",
    age: 35,
    weight: "75kg",
    phone: "+91 87654 32109",
    address: "B-456, Green Park, Delhi, India 110016",
    lastVisit: "1/14/2024",
    status: "Follow-up",
    conditions: ["Hair Fall/Baldness"],
    nextAppointment: "1/22/2024",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    gender: "Male",
    age: 35,
    weight: "75kg",
    phone: "+91 87654 32109",
    address: "B-456, Green Park, Delhi, India 110016",
    lastVisit: "1/14/2024",
    status: "Follow-up",
    conditions: ["Hair Fall/Baldness"],
    nextAppointment: "1/22/2024",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    gender: "Male",
    age: 35,
    weight: "75kg",
    phone: "+91 87654 32109",
    address: "B-456, Green Park, Delhi, India 110016",
    lastVisit: "1/14/2024",
    status: "Follow-up",
    conditions: ["Hair Fall/Baldness"],
    nextAppointment: "1/22/2024",
  },
];

export default function Patients() {
  const navigate = useNavigate();

  return (
    <div className="patients-container">
      <Header />
      <div className="header">
        <h1>Patients</h1>
        <p>Manage your patient records</p>
      </div>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search patients by name, phone, or condition..."
        />
        <div className="filters">
          <button className="active">All</button>
          <button>Active</button>
          <button>Follow-up</button>
          <button>Treatment</button>
          <button>Completed</button>
        </div>
        <button onClick={() => navigate("/add-patient")} className="add-btn">
          + Add New Patient
        </button>
      </div>

      <div className="cards-grid">
        {patients.map((p) => (
          <div className="patient-card" key={p.id}>
            <div className="card-header">
              <div className="avatar">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3>{p.name}</h3>
                <p>
                  {p.gender}, {p.age} years • {p.weight}
                </p>
              </div>
              <span className={`status ${p.status.toLowerCase()}`}>
                {p.status}
              </span>
            </div>

            <div className="card-body">
              <p>📞 {p.phone}</p>
              <p>📍 {p.address}</p>
              <p>📅 Last visit: {p.lastVisit}</p>
              <div className="conditions">
                <strong>Conditions:</strong>{" "}
                {p.conditions.map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </div>
              <div className="appointment">
                Next Appointment: <strong>{p.nextAppointment}</strong>
              </div>
            </div>

            <div className="card-footer">
              <button
                onClick={() => navigate("/patient-detail")}
                className="view-btn"
              >
                <Eye size={18} /> View Details
              </button>

              <div className="actions">
                <button className="edit-btn">
                  <Edit2 size={16} />
                </button>
                <button className="delete-btn">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
