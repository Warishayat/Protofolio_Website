const express = require("express");
const { uploadCV, getCV } = require("../Controller/CVController");
const authentication = require("../Middleware/authentication");
const cvUpload  = require("../Middleware/uploadCV");

const CV_router = express.Router();
CV_router.post("/upload", authentication, cvUpload .single("cv"), uploadCV);
CV_router.get("/download", getCV);

module.exports = CV_router;
