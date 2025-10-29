const express = require('express');
const { addProject, getProjects, deleteProject, updateProject } = require('../Controller/ProjectController');
const authentication = require('../Middleware/authentication');
const upload = require('../Middleware/CloudinaryUpload');
const Project_router = express.Router();


Project_router.get("/all", getProjects);
Project_router.post("/add", authentication, upload.single('image'), addProject);
Project_router.delete("/:id", authentication, deleteProject);
Project_router.put("/:id", authentication, upload.single('image'), updateProject);

module.exports = Project_router;
