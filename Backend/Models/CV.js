const mongoose = require("mongoose");

const CVSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "My Resume",
  },
  fileUrl: {
    type: String, // Cloudinary file URL
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const CV = mongoose.model("CV", CVSchema);
module.exports = CV;
