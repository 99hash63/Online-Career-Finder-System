import express from "express";
import {
  getJobPost,
  createJobPost,
  updateJobPost,
  deleteJobPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getJobPost);
router.post("/", createJobPost);
router.patch("/:id", updateJobPost);
router.delete("/:id", deleteJobPost);
export default router;
