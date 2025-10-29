const express = require("express");
const { sendMessage, getMessages, deleteMessage } = require("../Controller/MessageController");
const authentication = require("../Middleware/authentication");
const Message_router = express.Router();

Message_router.post("/send", sendMessage);
Message_router.get("/all", authentication, getMessages);
Message_router.delete("/delete/:id", authentication, deleteMessage);
module.exports = Message_router;
