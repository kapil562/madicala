import React, { useState } from "react";
import { ArrowLeft, User, Camera } from "lucide-react";
import "./AddPatient.css";
import Header from "../component/Header";

export default function AddPatient() {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="add-patient-container">
   <Header />
      <div className="header">
        <button className="back-btn">
          <ArrowLeft size={20} />
          Back to Patients
        </button>
        <div className="title">
          <User size={28} className="user-icon" />
          <div>
            <h1>Add New Patient</h1>
            <p>Enter patient information and medical details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="form-card">
        <h2>Personal Information</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" placeholder="Enter patient's full name" />
          </div>
          <div className="form-group">
            <label>Age *</label>
            <input type="number" placeholder="Enter age" />
          </div>
          <div className="form-group">
            <label>Sex *</label>
            <select>
              <option value="">Select sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input type="tel" placeholder="+91 98765 43210" />
          </div>
          <div className="form-group address-group">
            <label>Address</label>
            <textarea placeholder="Enter complete address"></textarea>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="photo-upload">
          <label>Patient Photo</label>
          <div className="upload-box">
            {photo ? (
              <img src={photo} alt="Patient" className="preview-img" />
            ) : (
              <>
                <Camera size={32} />
                <p>
                  Click to <span>upload</span> patient photo
                </p>
                <small>PNG, JPG or JPEG (MAX. 5MB)</small>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="submit-btn">Save Patient</button>
      </div>
     <div className="section-container">
  <h3 className="section-title">Vitals & Medical Information</h3>
  <div className="vitals-grid">
    <div className="form-group">
      <label>Weight (kg)</label>
      <input type="text" placeholder="e.g., 65" />
    </div>
    <div className="form-group">
      <label>Pulse (bpm)</label>
      <input type="text" placeholder="e.g., 72" />
    </div>
    <div className="form-group">
      <label>Blood Pressure</label>
      <input type="text" placeholder="e.g., 120/80" />
    </div>
    <div className="form-group">
      <label>RBS (mg/dL)</label>
      <input type="text" placeholder="e.g., 95" />
    </div>
    <div className="form-group">
      <label>CNS</label>
      <input type="text" placeholder="Central Nervous System" />
    </div>
    <div className="form-group">
      <label>P/A</label>
      <input type="text" placeholder="Per Abdomen" />
    </div>
    <div className="form-group">
      <label>CVS</label>
      <input type="text" placeholder="Cardiovascular System" />
    </div>
    <div className="form-group">
      <label>RS (Respiratory System)</label>
      <input type="text" placeholder="Respiratory System findings" />
    </div>
  </div>
</div>


<div className="section-container">
  <h3 className="section-title">Skin & Hair Conditions</h3>
  <div className="checkbox-grid">
    <label className="checkbox-item">
      <input type="checkbox" /> Acne
    </label>
    <label className="checkbox-item">
      <input type="checkbox" /> Hair Fall/Baldness
    </label>
    <label className="checkbox-item">
      <input type="checkbox" /> Dark Circles
    </label>
    <label className="checkbox-item">
      <input type="checkbox" /> Stretch Marks
    </label>
    <label className="checkbox-item">
      <input type="checkbox" /> Peeling
    </label>
    <label className="checkbox-item">
      <input type="checkbox" /> Glow Treatment
    </label>
    <label className="checkbox-item">
      <input type="checkbox" /> Dermaroller Therapy
    </label>
    <label className="checkbox-item">
      <input type="checkbox" /> Skin Rejuvenation
    </label>
  </div>
</div>
<div className="notes-container">
  <h3 className="notes-title">Additional Notes</h3>
  <textarea
    className="notes-textarea"
    placeholder="Any additional medical history, allergies, or notes..."
  ></textarea>
</div>

<div className="form-actions">
  <button className="btn-primary">
    <i className="fa fa-save"></i> Save Patient
  </button>
  <button className="btn-secondary">Cancel</button>
</div>

    </div>
  );
}
