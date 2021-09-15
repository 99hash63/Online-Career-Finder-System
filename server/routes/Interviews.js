const router = require('express').Router();
const { request } = require('express');
//import the interviews model//
let Interviews = require('../models/Interviews');

router.route('/add').post((req, res) => {
	//body
	//const QNo = Number(req.body.QNo);
	const JobTitle = req.body.JobTitle;
	const QuestionType = req.body.QuestionType;
	const Offer = req.body.Offer;
	const Question = req.body.Question;
	const Answer = req.body.Answer;
	const User = 'Anuradha';
	const SaveOp = 'no';

	const newQuestion = new Interviews({
		//QNo,
		JobTitle,
		QuestionType,
		Offer,
		Question,
		Answer,
		User,
		SaveOp,
	});

	newQuestion
		.save()
		.then(() => {
			//body
			res.json('Question added successfully');
		})
		.catch((err) => {
			console.log(err);
		});
});

//retrive common interview question
router.route('/displayci').get((req, res) => {
	//body
	Interviews.find({ QuestionType: 'CommonInterviewQuestion' })
		.then((questions) => {
			res.json(questions);
		})
		.catch((err) => {
			console.log(err);
		});
});

//retrive interview guildlines
router.route('/displayig').get((req, res) => {
	//body
	Interviews.find({ QuestionType: 'tips' })
		.then((questions) => {
			res.json(questions);
		})
		.catch((err) => {
			console.log(err);
		});
});

//retrive saved question list
router.route('/displaysq').get((req, res) => {
	//body
	Interviews.find({ SaveOp: 'yes' })
		.then((questions) => {
			res.json(questions);
		})
		.catch((err) => {
			console.log(err);
		});
});

//retrive users question pool
router.route('/displayuserqp').get((req, res) => {
	//body
	Interviews.find({ User: 'Anuradha' })
		.then((questions) => {
			res.json(questions);
		})
		.catch((err) => {
			console.log(err);
		});
});

//find by id
router.route('/getuersbyID/:id').get((req,res)=>{
	Interviews.findById(req.params.id).then((questions) => {
		res.json(questions);
	})
	.catch((err) => {
		console.log(err);
	});
})

//update
router.route('/update/:id').put(async (req, res) => {
	let qno = req.params.id;
	//destructure
	//const {JobTitle,QuestionType,Offer,Question,Answer,User} = req.body;
	const { Question, Answer } = req.body;

	/*const updateInterview ={
        JobTitle,
        QuestionType,
        Offer,
        Question,
        Answer,
        User
    }*/
	const updateInterview = {
		Question,
		Answer,
	};

	const update = await Interviews.findByIdAndUpdate(qno, updateInterview)
		.then(() => {
			res.status(200).send({ status: 'Successfully Updated' });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with updating data', error: err.message });
		});
});

//delete
router.route('/delete/:id').delete(async (req, res) => {
	let qno = req.params.id;

	await Interviews.findByIdAndDelete(qno)
		.then(() => {
			res.status(200).send({ status: 'Question deleted' });
		})
		.catch((err) => {
			console.log(err.message);
			res
				.status(500)
				.send({ status: 'Error with delete data', error: err.message });
		});
});

//one ritrive
/*router.route("/get/.user").get(async(req,res)=>{
    let user = req.params.user;

    const i = await Interviews.findOne(user).then(()=>{
        res.status(200).send({status : "user details fetched"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error fetching", error: err.message});
    })
})*/

//update status
router.route('/updatestatus/:id').put(async (req, res) => {
	let qno = req.params.id;
	const { SaveOp } = req.body;

	const updateInterview = {
		SaveOp
	};

	const updatestatus = await Interviews.findByIdAndUpdate(qno, updateInterview)
		.then(() => {
			res.status(200).send({ status: 'Successfully Updated' });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: 'Error with updating data', error: err.message });
		});
});

module.exports = router;
