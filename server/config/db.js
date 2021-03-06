const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });


const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});

	console.log(`MongoDB Connected: ${conn.connection.host}`.brightCyan);
};

module.exports = connectDB;
