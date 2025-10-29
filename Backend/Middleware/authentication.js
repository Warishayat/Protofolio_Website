const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authentication = async (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
  try {
    const decode_token = jwt.verify(token, process.env.JWT_sECRET);
    req.user = decode_token;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};


module.exports = authentication;