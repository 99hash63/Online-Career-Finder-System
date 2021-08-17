const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobPost = new Schema({
  jobID: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  industry: {
    type: String,
  },
  type: {
    type: String,
  },
  activelyHiring: {
    type: String,
  },
  salary: {
    type: Number,
    require: true,
  },
  expectedApplicants: {
    type: Number,
    require: true,
  },
  website: {
    type: Number,
  },
  createdDate: {
    type: Date,
    require: true,
  },
});
const Jobs = mongoose.model("JobPost", JobPost);

module.exports = Jobs;
