const CV = require("../Models/CV");

const uploadCV = async (req, res) => {
 try {
    const adminId = req.user?.id; 

    const newCV = new CV({
      title: req.body.title,
      fileUrl: req.file.path, 
      admin: adminId,         
    });

    await newCV.save();
    res.status(201).json({
      success: true,
      message: "CV uploaded successfully",
      data: newCV,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get
const getCV = async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ uploadedAt: -1 });
    if (!cv) {
      return res.status(404).json({ success: false, message: "CV not found" });
    }
    res.status(200).json({ success: true, data: cv });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadCV, getCV };
