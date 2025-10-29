const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  technologies: {
    type: [String], 
    required: true
  },
  liveUrl: {
    type: String, 
    required: false
  },
  githubUrl: {
    type: String, 
    required: false
  },
  image: {
    type: String, 
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = model("Project", ProjectSchema);
module.exports = Project;
