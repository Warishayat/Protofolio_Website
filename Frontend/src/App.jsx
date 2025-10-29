import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Contact";
import Login from "./Login";
import Dashboard from "./Dashboard";
import HeroSection from "./HeroSection";
import SkillsSection from "./Components/SkillsSection";
import ProjectsSection from "./Components/ProjectsSection";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";
import ExperienceSection from "./Components/ExperienceSection";
import Footer from "./Components/Footer";
import ProjectDetail from "./Components/ProjectDetail";
import PrivacyPolicy from "./Components/PrivacyPolicy"; // Create this component
import TermsOfService from "./Components/TermsOfService"; // Create this component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Home Route - Shows all sections */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <Contact />
            </>
          }
        />

        {/* Individual Pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
