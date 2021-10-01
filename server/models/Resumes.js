const mongoose = require("mongoose");

//resume schema

const Resume = mongoose.model("Resume", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  projects: {
    type: String,
    required: true,
  },
  achievements: {
    type: String,
    required: true,
  },
  references: {
    type: String,
    required: true,
  },
});

module.exports = { Resume };
