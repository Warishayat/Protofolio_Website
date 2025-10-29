import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const MessageInbox = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthToken = () => localStorage.getItem("authToken");
  const fetchMessages = async () => {
    setIsLoading(true);
    const GET_ALL_URL = "https://protofolio-website-1.onrender.com/message/all"; // Your GET route

    try {
      const response = await fetch(GET_ALL_URL, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessages(data.messages);
      } else {
        toast.error(
          data.message || "Failed to load messages. Check authorization.",
          { duration: 3000 }
        );
      }
    } catch (error) {
      toast.error("Network error loading messages.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // DELETE MESSAGE
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    const deleteToastId = toast.loading(`Deleting message ${messageId}...`);
    const DELETE_URL = `https://protofolio-website-1.onrender.com/message/delete/${messageId}`; // Your DELETE route

    try {
      const response = await fetch(DELETE_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // AUTH REQUIRED
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Message deleted successfully!", { id: deleteToastId });
        fetchMessages(); // Refresh the list
      } else {
        toast.error(data.message || "Deletion failed. Check authorization.", {
          id: deleteToastId,
        });
      }
    } catch (error) {
      toast.error("Network error during message deletion.", {
        id: deleteToastId,
      });
    }
  };

  if (isLoading) return <p>Loading messages...</p>;
  if (messages.length === 0)
    return <p className="text-xl text-gray-500">No new messages.</p>;

  return (
    <div>
      <h4
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--text-color)" }}
      >
        Message Inbox ({messages.length})
      </h4>
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {messages.map((message) => (
          <div
            key={message._id}
            className="p-4 border-l-4 rounded-lg shadow"
            style={{ borderLeftColor: "var(--accent-color)" }}
          >
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-semibold text-lg">
                {message.subject} from {message.name}
              </h5>
              <button
                onClick={() => handleDeleteMessage(message._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                🗑️ Delete
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">Email: {message.email}</p>
            <p className="text-gray-700 italic">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageInbox;
