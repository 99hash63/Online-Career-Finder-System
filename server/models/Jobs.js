const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobPost = new Schema({
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
  },
  expectedApplicants: {
    type: Number,
    require: true,
  },
  website: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  publish: {
    type: Boolean,
    require: true,
  },
  appliedApplicants: {
    type: Number,
    require: true,
  },
  createdDate: {
    type: Date,
    require: true,
  },
});
const Jobs = mongoose.model("JobPost", JobPost);

module.exports = Jobs;
