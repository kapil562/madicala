import React, { useState } from "react";
import { Calendar, Search, Plus, X, Edit2, Trash2 } from "lucide-react";
import "./Appointment.css";
import Header from "../component/Header";

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      symptoms: "Fever, Headache",
      date: "2025-09-02",
      time: "10:30",
      status: "Pending",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      phone: "+91 87654 32109",
      symptoms: "Cough, Cold",
      date: "2025-09-02",
      time: "15:00",
      status: "Completed",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      phone: "+91 87654 32109",
      symptoms: "Cough, Cold",
      date: "2025-09-02",
      time: "15:00",
      status: "Completed",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      phone: "+91 87654 32109",
      symptoms: "Cough, Cold",
      date: "2025-09-02",
      time: "15:00",
      status: "Completed",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      phone: "+91 87654 32109",
      symptoms: "Cough, Cold",
      date: "2025-09-02",
      time: "15:00",
      status: "Completed",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      phone: "+91 87654 32109",
      symptoms: "Cough, Cold",
      date: "2025-09-02",
      time: "15:00",
      status: "Completed",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      phone: "+91 87654 32109",
      symptoms: "Cough, Cold",
      date: "2025-09-02",
      time: "15:00",
      status: "Completed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    symptoms: "",
    date: "",
    time: "",
    status: "Pending",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveAppointment = () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === editId ? { ...form, id: editId } : a))
      );
      setEditId(null);
    } else {
      setAppointments([...appointments, { ...form, id: Date.now() }]);
    }

    setForm({
      name: "",
      phone: "",
      symptoms: "",
      date: "",
      time: "",
      status: "Pending",
    });
    setShowModal(false);
  };

  const handleEdit = (appt) => {
    setForm(appt);
    setEditId(appt.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const filtered = appointments.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.symptoms.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="appointments-page">
     <Header/>
      <div className="app-topbar">
        <div className="app-title">
          <Calendar className="app-title-icon" />
          <h1>Appointments</h1>
        </div>
        <div className="app-actions">
          <div className="app-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn add-btn" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Add Appointment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="app-table-wrap">
        <table className="app-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Symptoms</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty">
                  No appointments found.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.phone}</td>
                  <td>{a.symptoms}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        a.status.toLowerCase()
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="icon-btn edit" onClick={() => handleEdit(a)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(a.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="app-modal-backdrop">
          <div className="app-modal">
            <div className="modal-head">
              <h3>{editId ? "Edit Appointment" : "New Appointment"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="field">
                <label>Patient Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Phone *</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Symptoms</label>
                <input
                  type="text"
                  value={form.symptoms}
                  onChange={(e) => handleChange("symptoms", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Time *</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="modal-actions">
                <button className="btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn primary" onClick={saveAppointment}>
                  {editId ? "Update Appointment" : "Save Appointment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
