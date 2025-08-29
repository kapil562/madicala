import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './page/Dashbord'
import Patient from './page/Patient'
import AddPatient from './page/AddPatient'
import PatientDetail from './page/PatientDetail'
import Medicine from './page/Medicine'
import Appointment from './page/Appointment'
function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/patients' element={<Patient />} />
          <Route path='/add-patient' element={<AddPatient />} />
          <Route path='/patient-detail' element={<PatientDetail />} />
          <Route path='/medicine' element={<Medicine />} />
          <Route path='/appointment' element={<Appointment />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
