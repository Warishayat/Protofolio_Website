import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // ⚠️ Ensure you import toast

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const DOWNLOAD_API_URL =
    "https://protofolio-website-1.onrender.com/resume/download";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDownloadResume = async (e) => {
    e.preventDefault(); 
    const downloadToastId = toast.loading("Preparing resume for download...");

    try {
      const response = await fetch(DOWNLOAD_API_URL);

      if (!response.ok) {
        toast.error("Resume file not available or API error.", {
          id: downloadToastId,
        });
        return;
      }
      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "Professional_Resume.pdf"; 
      if (
        contentDisposition &&
        contentDisposition.indexOf("filename=") !== -1
      ) {
        filename = contentDisposition.split("filename=")[1].replace(/"/g, "");
      }
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // 4. Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download successful! Check your downloads folder.", {
        id: downloadToastId,
      });
    } catch (error) {
      console.error("Download Resume Network Error:", error);
      toast.error("Could not connect to the server to download the resume.", {
        id: downloadToastId,
      });
    }
  };

  const AuthButton = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={onLogout}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors duration-200"
          style={{ backgroundColor: "var(--accent-color)" }}
        >
          Logout
        </button>
      );
    }
    return (
      <Link
        to="/login"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors duration-200"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        Login
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wider"
              style={{ color: "var(--primary-color)" }}
            >
              ProfSite-ai
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-[--text-color] px-3 py-2 rounded-md text-sm font-medium hover:text-[--primary-color] transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="text-[--text-color] px-3 py-2 rounded-md text-sm font-medium hover:text-[--primary-color] transition-colors duration-200"
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="text-[--text-color] px-3 py-2 rounded-md text-sm font-medium hover:text-[--primary-color] transition-colors duration-200"
              >
                Contact
              </Link>

              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className="text-[--primary-color] px-3 py-2 rounded-md text-sm font-medium border border-[--primary-color] hover:bg-[--light-primary] transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={handleDownloadResume}
              className="mr-4 inline-flex items-center px-4 py-2 border border-[--primary-color] text-sm font-medium rounded-md text-[--primary-color] bg-white hover:bg-[--light-primary] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--primary-color] transition-colors duration-200"
            >
              Download Resume
            </button>

            <AuthButton />
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[--text-color] hover:text-[--primary-color] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[--primary-color]"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            onClick={toggleMenu}
            className="text-[--text-color] hover:bg-[--light-primary] block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={toggleMenu}
            className="text-[--text-color] hover:bg-[--light-primary] block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="text-[--text-color] hover:bg-[--light-primary] block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>

          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="text-[--primary-color] hover:bg-[--light-primary] block px-3 py-2 rounded-md text-base font-medium border border-[--primary-color] mt-1"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={handleDownloadResume}
            className="text-[--primary-color] hover:bg-[--light-primary] block px-3 py-2 rounded-md text-base font-medium border border-[--primary-color] mt-1 w-full text-left"
          >
            Download Resume
          </button>

          <div className="pt-2">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
