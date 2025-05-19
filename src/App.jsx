import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import AboutUs from './pages/Aboutus.jsx';
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
import Anomaly from "./pages/Anomaly.jsx";
import Dispatch from "./pages/Dispatch.jsx";
import Inventory from "./pages/Inventory.jsx";
import Reports from "./pages/Reports.jsx";
import PCMStatusPage from "./pages/PCMStatusPage.jsx";
import Navbar from "./pages/Navbar.jsx";

export default function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anomaly" element={<Anomaly />} />
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/pcm-status" element={<PCMStatusPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
}
