import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddProjectForm from "./Components/AddProjectForm";
import MessageInbox from "./Components/MessageInbox";
import ProjectList from "./Components/ProjectList";
import ResumeManager from "./Components/ResumeManager";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Access Denied. Please log in.");
        navigate("/login");
        return false;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    };

    checkAuth();
  }, [navigate]);

  // Show loading or nothing while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  // List of dashboard sections
  const tabs = [
    { id: "projects", name: "Manage Projects" },
    { id: "messages", name: "Message Inbox" },
    { id: "resume", name: "Resume Manager" },
    // Add more tabs here
  ];

  // Renders the component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AddProjectForm /> {/* The form created previously */}
            <ProjectList />{" "}
            {/* Component for listing/deleting/updating existing projects */}
          </div>
        );
      case "messages":
        return <MessageInbox />;
      case "resume":
        return <ResumeManager />;
      default:
        return <h2 className="text-xl">Select a section.</h2>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-5xl font-extrabold"
            style={{ color: "var(--primary-color)" }}
          >
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="mb-10 flex border-b border-gray-300 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 text-lg font-medium transition-colors duration-200 whitespace-nowrap
                                ${
                                  activeTab === tab.id
                                    ? "border-b-4 font-bold"
                                    : "text-gray-500 hover:text-gray-800"
                                }`}
              style={{
                borderColor:
                  activeTab === tab.id ? "var(--accent-color)" : "transparent",
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="bg-white p-8 rounded-xl shadow-2xl min-h-[500px]">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;