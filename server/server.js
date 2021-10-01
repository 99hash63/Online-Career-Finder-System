const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

//reuqests allow any domain
app.use(cors({ origin: "http://localhost:4200" }));

//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

// Route files
const companies = require("./routes/companies");
const companyReviews = require("./routes/companyReviews");
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");
const InterviewRouter = require("./routes/Interviews.js");
const resumes = require("./routes/resumes.js");

//Body parser
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

// Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set public folder as static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/companies", companies);
app.use("/findjobs", jobs);
app.use("/Interviews", InterviewRouter);
app.use("/api/v1/auth", auth);
app.use("/api/v1/companyReviews", companyReviews);

//define the routes
app.use("/", resumes);

// app.use('/', (req, res) => {
// 	res.json({ hi: 'bye' });
// });
app.use(express.static(path.join(__dirname, "./public/uploads")));

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

process.on("unhandledRejection", (err, Promise) => {
  console.log(`Error: ${err}`.red.bold);
  //Close server and exit process
  server.close(() => process.exit(1));
});
