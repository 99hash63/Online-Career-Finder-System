const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const path = require('path');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// Route files
const companies = require('./routes/companies');
const auth = require('./routes/auth');

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set public folder as static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/companies', companies);
app.use('/api/v1/auth', auth);

// Use error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
			.brightMagenta
	)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, Promise) => {
	console.log(`Error: ${err.message}`.red.bold);
	//Close server and exit process
	server.close(() => process.exit(1));
});

//import interview.js interview route handle
const InterviewRouter = require('./routes/Interviews.js');
app.use('/Interviews', InterviewRouter);
