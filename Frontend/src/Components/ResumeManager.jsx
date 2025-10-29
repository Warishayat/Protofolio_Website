import React, { useState } from "react";
import toast from "react-hot-toast";

const ResumeManager = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const getAuthToken = () => localStorage.getItem("authToken");

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // UPLOAD RESUME LOGIC
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    const uploadToastId = toast.loading("Uploading resume...");
    const UPLOAD_URL =
      "https://protofolio-website-1.onrender.com/resume/upload"; // Your UPLOAD route

    const formData = new FormData();
    formData.append("resume", resumeFile); // Key should match your backend parser's field name ('resume')

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // AUTH REQUIRED
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Resume updated successfully!", {
          id: uploadToastId,
        });
        setResumeFile(null);
      } else {
        toast.error(
          data.message || "Resume upload failed. Must be a PDF/DOCX file.",
          { id: uploadToastId }
        );
      }
    } catch (error) {
      toast.error("Network error during resume upload.", { id: uploadToastId });
    } finally {
      setIsUploading(false);
    }
  };

  // DOWNLOAD RESUME LOGIC
  const handleDownload = async () => {
    const DOWNLOAD_URL =
      "https://protofolio-website-1.onrender.com/resume/download"; // Your DOWNLOAD route

    // This is a complex client-side operation often best handled by the backend redirecting,
    // but here's the client-side approach for secured download:
    try {
      const response = await fetch(DOWNLOAD_URL, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // AUTH REQUIRED
        },
      });

      if (!response.ok) {
        toast.error(
          "Failed to fetch resume. File might not exist or authorization failed."
        );
        return;
      }

      // Trigger file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "My_Professional_Resume.pdf"); // You can set a custom filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Resume download initiated!");
    } catch (error) {
      toast.error("Network error during resume download.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Upload Section */}
      <div className="p-6 border rounded-xl shadow-lg">
        <h4
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--text-color)" }}
        >
          Upload New Resume
        </h4>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx" // Accept common resume formats
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--light-primary)] file:text-[var(--primary-color)] hover:file:bg-[var(--primary-color)] hover:file:text-white transition-colors duration-200 cursor-pointer"
          />
          <button
            type="submit"
            disabled={isUploading || !resumeFile}
            className="py-2 px-6 rounded-md text-white font-medium transition-colors disabled:opacity-50"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>
      </div>

      {/* Download Section */}
      <div className="p-6 border rounded-xl shadow-lg">
        <h4
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--text-color)" }}
        >
          Download Current Resume
        </h4>
        <button
          onClick={handleDownload}
          className="py-2 px-6 rounded-md text-white font-medium transition-colors"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          Download Resume
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Use this to verify the uploaded file or to download the current
          version.
        </p>
      </div>
    </div>
  );
};

export default ResumeManager;
