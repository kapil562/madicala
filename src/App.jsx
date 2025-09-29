// App.jsx
import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './page/Dashbord'
import ProductDetail from './page/ProductDetail'
import AddressPage from './page/AddressPage'
import PaymentPage from './page/PaymentPage'

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/AddressPage/:id" element={<AddressPage />} />
           <Route path="/PaymentPage/:id" element={<PaymentPage />} /> 
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
