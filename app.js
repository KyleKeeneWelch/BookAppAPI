if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMS: 1 * 60 * 1000,
  max: 50,
});
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { credentials } = require("./helpers/middleware");

const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const recommendationsRouter = require("./routes/recommendations");

// Create App
const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

// Connect to data base
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to Database");
}

// Handle options credentials check and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(limiter);

// Assign routes
app.use("/auth", authRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message || err);
});

module.exports = app;
