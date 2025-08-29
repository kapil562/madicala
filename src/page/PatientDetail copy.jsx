import React, { useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Printer, Save, User } from "lucide-react";
import Header from "../component/Header";
import "./PatientDetail.css";

const DUMMY_PATIENTS = {
  1: { id: 1, name: "Priya Sharma", gender: "Female", age: 28, weight: "58kg", phone: "+91 98765 43210", address: "A-123, Sector 15, Mumbai, Maharashtra 400001", photo: "", lastVisit: "2025-08-15T10:30:00" },
  2: { id: 2, name: "Rahul Kumar", gender: "Male", age: 35, weight: "75kg", phone: "+91 87654 32109", address: "B-456, Green Park, Delhi, 110016", photo: "", lastVisit: "2025-08-18T18:00:00" },
};

const DUMMY_VISITS = {
  1: [
    { id: "v1", date: "2025-08-10T11:15:00", symptoms: "Acne flare-up, mild itching", medicines: [{ name: "Clindamycin Gel", quantity: 1, rate: 220, timings: ["Morning", "Night"] }, { name: "Doxycycline 100mg", quantity: 10, rate: 12, timings: ["Night"] }] }
  ],
  2: [
    { id: "v2", date: "2025-08-12T09:40:00", symptoms: "Hair fall and dandruff", medicines: [{ name: "Biotin 10k mcg", quantity: 30, rate: 6, timings: ["Morning"] }, { name: "Ketoconazole Shampoo", quantity: 1, rate: 350, timings: ["Alternate Days"] }] }
  ],
};

const formatINR = (n) => Number(n || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });
const initialMedicine = () => ({ name: "", quantity: 1, rate: 0, timings: [] });

// Get current local date-time in YYYY-MM-DDTHH:mm format for datetime-local input
const getLocalDateTime = () => {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60000;
  return new Date(now - tzOffset).toISOString().slice(0,16);
};

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef(null);
  const patient = DUMMY_PATIENTS[id] || DUMMY_PATIENTS[1];
  const [visits, setVisits] = useState(DUMMY_VISITS[id] || DUMMY_VISITS[1] || []);
  const [visit, setVisit] = useState({ date: getLocalDateTime(), symptoms: "", medicines: [initialMedicine()] });

  const handleVisitField = (field, value) => setVisit(prev => ({ ...prev, [field]: value }));
  const handleMedChange = (idx, field, value) => setVisit(prev => { const meds = [...prev.medicines]; meds[idx] = { ...meds[idx], [field]: field === "quantity" || field === "rate" ? Number(value || 0) : value }; return { ...prev, medicines: meds }; });
  const handleTimingToggle = (idx, timing) => setVisit(prev => { const meds = [...prev.medicines]; const t = new Set(meds[idx].timings || []); t.has(timing) ? t.delete(timing) : t.add(timing); meds[idx] = { ...meds[idx], timings: Array.from(t) }; return { ...prev, medicines: meds }; });
  const addMedicineRow = () => setVisit(p => ({ ...p, medicines: [...p.medicines, initialMedicine()] }));
  const removeMedicineRow = (idx) => setVisit(p => ({ ...p, medicines: p.medicines.filter((_, i) => i !== idx) }));
  const subTotal = useMemo(() => visit.medicines.reduce((sum, m) => sum + (Number(m.quantity) * Number(m.rate || 0)), 0), [visit.medicines]);

  const onSave = () => { setVisits(v => [{ ...visit, id: `v${Date.now()}` }, ...v]); alert("Visit saved locally (demo). Replace with API to persist."); };
  const onSaveAndPrint = () => { onSave(); setTimeout(() => window.print(), 50); };
  const initials = useMemo(() => patient.name.split(" ").map(n => n[0]).join(""), [patient?.name]);

  return (
    <div className="patient-detail-container">
      <Header />

      {/* Top Bar */}
      <div className="pd-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Patient Details</h1>
      </div>

      {/* Patient Card */}
      <div className="pd-card">
        <div className="pd-profile">
          {patient.photo ? (
            <img src={patient.photo} alt="Patient" className="pd-avatar" />
          ) : (
            <div className="pd-avatar-fallback"><User size={24} />{initials}</div>
          )}
          <div className="pd-info">
            <h2>{patient.name}</h2>
            <p>
              {patient.gender}, {patient.age} yrs • {patient.weight}
            </p>
            <p>📞 {patient.phone}</p>
            <p>📍 {patient.address}</p>
          </div>
          <div className="pd-meta">
            <div>
              <span className="pd-label">Last Visit</span>
              <strong>{new Date(patient.lastVisit).toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Visit History */}
      <div className="pd-section">
        <h3>Visit History</h3>
        {visits.length === 0 && <div className="pd-empty">No previous visits found.</div>}
        <div className="pd-accordion">
          {visits.map((v) => {
            const total = v.medicines.reduce((s, m) => s + (m.quantity * (m.rate || 0)), 0);
            return (
              <details key={v.id} className="pd-visit">
                <summary>
                  <div className="pd-visit-row">
                    <div>
                      <strong>{new Date(v.date).toLocaleString()}</strong>
                      <div className="pd-symptoms">Symptoms: {v.symptoms || "—"}</div>
                    </div>
                    <div className="pd-visit-total">Total: {formatINR(total)}</div>
                  </div>
                </summary>
                <div className="pd-visit-body">
                  <table className="pd-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Medicine</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Timings</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {v.medicines.map((m, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{m.name}</td>
                          <td>{m.quantity}</td>
                          <td>{formatINR(m.rate)}</td>
                          <td>{(m.timings || []).join(", ") || "—"}</td>
                          <td>{formatINR((m.rate || 0) * m.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            );
          })}
        </div>
      </div>

      {/* New Visit Form */}
      <div className="pd-section">
        <div className="pd-section-header">
          <h3>Add New Visit</h3>
        </div>

        <div className="pd-form">
          <div className="pd-row">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              value={visit.date}
              onChange={(e) => handleVisitField("date", e.target.value)}
            />
          </div>
          <div className="pd-row">
            <label>Symptoms</label>
            <textarea
              placeholder="Enter patient complaints/symptoms"
              value={visit.symptoms}
              onChange={(e) => handleVisitField("symptoms", e.target.value)}
            />
          </div>

          <div className="pd-meds-header">
            <h4>Medicines</h4>
            <button type="button" className="pd-add" onClick={addMedicineRow}>
              <Plus size={16} /> Add Medicine
            </button>
          </div>

          <div className="pd-table-wrap">
            <table className="pd-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine Name</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Timings</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visit.medicines.map((m, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="e.g., Doxycycline 100mg"
                        value={m.name}
                        onChange={(e) => handleMedChange(idx, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                     
                        value={m.quantity}
                        onChange={(e) => handleMedChange(idx, "quantity", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                     
                        value={m.rate}
                        onChange={(e) => handleMedChange(idx, "rate", e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="pd-timings">
                        {[
                          "Morning",
                          "Afternoon",
                          "Night",
                          "After Food",
                          "Before Food",
                        ].map((t) => (
                          <label key={t} className="pd-chip">
                            <input
                              type="checkbox"
                              checked={m.timings?.includes(t) || false}
                              onChange={() => handleTimingToggle(idx, t)}
                            />
                            <span>{t}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                    <td>{formatINR((m.rate || 0) * (m.quantity || 0))}</td>
                    <td>
                      <button
                        type="button"
                        className="pd-icon danger"
                        onClick={() => removeMedicineRow(idx)}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pd-total-row">
            <div></div>
            <div className="pd-total">Grand Total: {formatINR(subTotal)}</div>
          </div>

          <div className="pd-actions">
            <button className="pd-btn" onClick={onSave}>
              <Save size={16} /> Save
            </button>
            <button className="pd-btn primary" onClick={onSaveAndPrint}>
              <Printer size={16} /> Save & Print
            </button>
          </div>
        </div>
      </div>

      {/* Printable Bill (uses current visit) */}
      <div className="pd-print-area" ref={printRef}>
        <div className="bill">
          <div className="bill-header">
            <div>
              <h2>Clinic Name</h2>
              <p>Address line 1, City • Phone: 01234-567890</p>
            </div>
            <div>
              <strong>Bill / Prescription</strong>
              <div>Date: {new Date(visit.date).toLocaleString()}</div>
            </div>
          </div>

          <div className="bill-patient">
            <div><strong>Patient:</strong> {patient.name}</div>
            <div><strong>Age/Gender:</strong> {patient.age} / {patient.gender}</div>
            <div><strong>Phone:</strong> {patient.phone}</div>
            <div><strong>Address:</strong> {patient.address}</div>
          </div>

          <div className="bill-symptoms">
            <strong>Symptoms/Notes:</strong>
            <div>{visit.symptoms || "—"}</div>
          </div>

          <table className="bill-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine</th>
                <th>Timings</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {visit.medicines.map((m, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{m.name}</td>
                  <td>{(m.timings || []).join(", ")}</td>
                  <td>{m.quantity}</td>
                  <td>{formatINR(m.rate)}</td>
                  <td>{formatINR(m.quantity * (m.rate || 0))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} style={{ textAlign: "right" }}><strong>Total</strong></td>
                <td><strong>{formatINR(subTotal)}</strong></td>
              </tr>
            </tfoot>
          </table>

          <div className="bill-footer">
            <p>Signature _______________________</p>
            <p>Thank you. Get well soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
