const Jobs = require("../models/Jobs");
var ObjectId = require("mongoose").Types.ObjectId;

exports.getJobPosts = async (req, res) => {
  await Jobs.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Jobs :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};
exports.getJobPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  await Jobs.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Jobs :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

exports.createJobPost = async (req, res) => {
  const {
    title,
    company,
    location,
    industry,
    type,
    activelyHiring,
    salary,
    expectedApplicants,
    website,
    description,
    image,
    publish,
    appliedApplicants,
    createdDate,
  } = req.body;

  var job = new Jobs({
    title,
    company,
    location,
    industry,
    type,
    activelyHiring,
    salary,
    expectedApplicants,
    website,
    description,
    image,
    publish,
    appliedApplicants,
    createdDate,
  });
  await job.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Jobs Save :" + JSON.stringify(err, undefined, 2));
    }
  });
};

exports.updateJobPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  const {
    title,
    company,
    location,
    industry,
    type,
    activelyHiring,
    salary,
    expectedApplicants,
    website,
    description,
    image,
    publish,
    appliedApplicants,
    createdDate,
  } = req.body;

  var job = new Jobs({
    title,
    company,
    location,
    industry,
    type,
    activelyHiring,
    salary,
    expectedApplicants,
    website,
    description,
    image,
    publish,
    appliedApplicants,
    createdDate,
  });
  await Jobs.findByIdAndUpdate(
    req.params.id,
    { $set: job },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Job Update :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};

exports.publishJobPost = async (req, res) => {
  let jobID = req.params.id;
  const { publish } = req.body;

  const updatePublish = {
    $set: {
      publish: publish,
    },
  };

  await Jobs.findByIdAndUpdate(jobID, updatePublish)
    .then(() => {
      res.status(200).send({ status: "Job updated" });
    })
    .catch((e) => {
      res.status(500).send({ status: "Error" });
    });
};

exports.deleteJobPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  await Jobs.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Jobs Delete :" + JSON.stringify(err, undefined, 2));
    }
  });
};
