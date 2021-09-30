const Jobs = require("../models/Jobs");
var ObjectId = require("mongoose").Types.ObjectId;

//@desc Get all JOb Posts
//@route GET /findjobs/jobs
exports.getJobPosts = async (req, res) => {
  await Jobs.find(
    {
      publish: true,
    },
    function (err, docs) {
      if (!err) {
        return res.send(docs);
      } else {
        console.log(
          "Error in Retriving Jobs :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};
//@desc Get specific user's Job Posts
//@route GET /findjobs/jobs/:id
exports.getMyJobPosts = async (req, res) => {
  userId = req.user.id;

  await Jobs.find(
    {
      user: userId,
    },
    function (err, docs) {
      if (!err) {
        return res.send(docs);
      } else {
        console.log(
          "Error in Retriving Jobs :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
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

//@desc Add Job Post
//@route POST /findjobs/createjob
exports.createJobPost = async (req, res) => {
  req.body.user = req.user._id;
  console.log(req.body.userId + "rwefauwsgofiusdgo");
  const {
    user,
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
    user,
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

//@desc Update Job Post
//@route PUT /findjobs/jobs/:id
exports.updateJobPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  const {
    // user,
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
    // user,
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
    {
      $set: {
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
      },
    },
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

//@desc Change publish unpublish status
//@route PUT /findjobs/jobs/publish/:id
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

//@desc Delete Job Post
//@route DELETE /findjobs/jobs/:id
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

//@desc Update Job Post applicant count
//@route PUT /findjobs/newapplicant/:id
exports.newapplicant = async (req, res) => {
  let jobID = req.params.id;

  //increace the appliedApplicants count by 1
  const updateApplicants = { $inc: { appliedApplicants: 1 } };

  await Jobs.findByIdAndUpdate(jobID, updateApplicants)
    .then(() => {
      res.status(200).send({ status: "New applicant added" });
    })
    .catch((e) => {
      res.status(500).send({ status: "Error" });
    });
};
