const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
	/*QNo:{
        type:Number,
        required : true
    },*/

	JobTitle: {
		type: String,
		required: true,
	},

	QuestionType: {
		type: String,
		required: true,
	},

	Offer: {
		type: String,
		required: true,
	},

	Question: {
		type: String,
		required: true,
	},

	Answer: {
		type: String,
		required: true,
	},

	User: {
		type: String,
		required: true,
	},
	SaveOp: {
		type: String,
	},
});

const InterviewQuestion = mongoose.model('InterviewQuestion', InterviewSchema);

module.exports = InterviewQuestion;
