import express from "express";
import {
  getJobPost,
  getJobPosts,
  createJobPost,
  updateJobPost,
  deleteJobPost,
} from "../controllers/jobs.js";

const router = express.Router();

router.get("/jobs", getJobPosts);
router.get("/jobs/:id", getJobPost);
router.post("/createjob", createJobPost);
router.put("/jobs/:id", updateJobPost);
router.delete("/jobs/:id", deleteJobPost);
export default router;
