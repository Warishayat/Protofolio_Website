const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "PortfolioCVs", 
    resource_type: "raw",  
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const uploadCV = multer({ storage });
module.exports = uploadCV;
