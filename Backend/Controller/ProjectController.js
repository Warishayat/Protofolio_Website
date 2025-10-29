const Project = require('../Models/Project');

//add
const addProject = async (req, res) => {
  try {
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    const imageUrl = req.file ? req.file.path : null; 
    const newProject = new Project({
      title,
      description,
      technologies: technologies ? technologies.split(',') : [],
      liveUrl,
      githubUrl,
      image: imageUrl,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully!",
      project: newProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding project", error: error.message });
  }
};


// Getallprojects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching projects", error: error.message });
  }
};


//delete
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting project", error: error.message });
  }
};


//update
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        technologies: technologies ? technologies.split(',') : [],
        liveUrl,
        githubUrl,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating project", error: error.message });
  }
};

module.exports = { addProject, getProjects, deleteProject, updateProject };
