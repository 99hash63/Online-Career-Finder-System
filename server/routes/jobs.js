const express = require("express");
const { protect } = require("../middleware/auth");

const {
  getJobPost,
  getJobPosts,
  createJobPost,
  updateJobPost,
  deleteJobPost,
  publishJobPost,
  getMyJobPosts,
  newapplicant,
} = require("../controllers/jobs.js");

const router = express.Router();

router.get("/jobs", getJobPosts);
router.get("/myjobs/:userID", protect, getMyJobPosts);
router.get("/jobs/:id", getJobPost);
router.post("/createjob", protect, createJobPost);
router.put("/jobs/:id", protect, updateJobPost);
router.put("/newapplicant/:id", newapplicant);
router.put("/jobs/publish/:id", publishJobPost);
router.delete("/jobs/:id", protect, deleteJobPost);
module.exports = router;
