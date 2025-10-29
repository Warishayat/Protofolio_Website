const express = require("express");
const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SignupAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const adminCount = await Admin.countDocuments();
    if (adminCount >= 1) {
      return res.status(403).json({
        success: false,
        message: "Only one admin account is allowed. You cannot create another.",
      });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    await newAdmin.save();
    res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });

  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating admin",
    });
  }
};

const LoginAdmin = async (req, res) => {

  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or  password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

module.exports = SignupAdmin;


module.exports = {SignupAdmin,LoginAdmin}