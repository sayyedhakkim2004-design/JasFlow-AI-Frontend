import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import WriteFlowLandingPage from './components/landing.jsx'
import PricingDashboard from './components/PricingDashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AIEditorPage from './components/AiPage.jsx'
import LoginPage from './components/login.jsx'
import DashboardHistory from "../src/components/dashboard.jsx"

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#101a38",
          color: "#fff",
          border: "1px solid #1d2a4f",
          borderRadius: "16px",
        },
      }}
    />
    <Routes>
      <Route path="/" element={<WriteFlowLandingPage />} />
      <Route path="/pricing" element={<PricingDashboard />} />
      <Route path="/generate" element={<AIEditorPage />} />
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardHistory />} />

    </Routes>
  </BrowserRouter>

)
