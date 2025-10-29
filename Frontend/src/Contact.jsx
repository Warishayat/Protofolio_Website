import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const developerDetails = {
    name: "Waris Hayat",
    role: "Full Stack AI & ML Developer",
    phone: "+3090333420",
    email: "warishayat666@gmail.com",
    location: "Islamabad, Pakistan",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToastId = toast.loading("Sending your message...");

    try {
      const response = await fetch(
        "https://protofolio-website-1.onrender.com/message/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(
          "Message sent successfully! I will be in touch shortly.",
          { id: loadingToastId }
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorMessage =
          data.message || "Failed to send message due to a server error.";
        toast.error(errorMessage, { id: loadingToastId });
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error(
        "Failed to connect to the server. Check network or API URL.",
        { id: loadingToastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{ color: "var(--text-color)" }}
          >
            Get In Touch
          </h2>
          <p
            className="mt-4 text-xl"
            style={{ color: "var(--text-color)", opacity: 0.85 }}
          >
            Let's collaborate on your next data-driven project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Column 1: Developer Details */}
          <div
            className="lg:col-span-1 p-8 rounded-xl shadow-2xl"
            style={{ backgroundColor: "var(--light-primary)" }}
          >
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--primary-color)" }}
            >
              Contact Information
            </h3>
            <p
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--text-color)" }}
            >
              {developerDetails.name}
            </p>
            <p
              className="text-md mb-6"
              style={{ color: "var(--text-color)", opacity: 0.85 }}
            >
              {developerDetails.role}
            </p>

            <ul className="space-y-4">
              <li
                className="flex items-center"
                style={{ color: "var(--text-color)" }}
              >
                <span className="mr-3" style={{ color: "var(--accent-color)" }}>
                  📞
                </span>{" "}
                {/* Replace with FaPhone icon */}
                <span>{developerDetails.phone}</span>
              </li>
              <li
                className="flex items-center"
                style={{ color: "var(--text-color)" }}
              >
                <span className="mr-3" style={{ color: "var(--accent-color)" }}>
                  ✉️
                </span>{" "}
                {/* Replace with FaEnvelope icon */}
                <span>{developerDetails.email}</span>
              </li>
              <li
                className="flex items-center"
                style={{ color: "var(--text-color)" }}
              >
                <span className="mr-3" style={{ color: "var(--accent-color)" }}>
                  📍
                </span>{" "}
                {/* Replace with FaMapMarkerAlt icon */}
                <span>{developerDetails.location}</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium"
                    style={{ color: "var(--text-color)" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]"
                    style={{ border: "1px solid #d1d5db" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium"
                    style={{ color: "var(--text-color)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]"
                    style={{ border: "1px solid #d1d5db" }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-color)" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]"
                  style={{ border: "1px solid #d1d5db" }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-color)" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]"
                  style={{ border: "1px solid #d1d5db" }}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 border border-transparent rounded-md shadow-lg text-white text-lg font-medium transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--accent-color)" }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
