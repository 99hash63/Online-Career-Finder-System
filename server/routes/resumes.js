const express = require("express");
const router = express.Router();

const { Resume } = require("../models/Resumes");

//get all resumes
router.get("/api/resumes", (req, res) => {
  Resume.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

//save resume
router.post("/api/resume/add", (req, res) => {
  const resu = new Resume({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    birth: req.body.birth,
    gender: req.body.gender,
    background: req.body.background,
    experience: req.body.experience,
    technologies: req.body.technologies,
    education: req.body.education,
    projects: req.body.projects,
    achievements: req.body.achievements,
    references: req.body.references,
  });
  resu.save((err, data) => {
    res.status(200).json({
      code: 200,
      message: "Resume Is Added Successfully",
      addResume: data,
    });
  });
});

//get single resume
router.get("/api/resume/:id", (req, res) => {
  Resume.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

//update resume
router.put("/api/resume/edit/:id", (req, res) => {
  const resu = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    birth: req.body.birth,
    gender: req.body.gender,
    background: req.body.background,
    experience: req.body.experience,
    technologies: req.body.technologies,
    education: req.body.education,
    projects: req.body.projects,
    achievements: req.body.achievements,
    references: req.body.references,
  };
  Resume.findByIdAndUpdate(
    req.params.id,
    { $set: resu },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "Resume Is Updated Successfully",
          updateResume: data,
        });
      } else {
        console.log(err);
      }
    }
  );
});

//delete resume
router.delete("/api/resume/:id", (req, res) => {
  Resume.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: "Resume Is Deleted Successfully",
        deleteResume: data,
      });
    }
  });
});

module.exports = router;
