const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const router = require("../routes/calendarRoute");
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv").config();

const dbConnect = process.env.DB_URL;

const middlewares = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose
  .connect(dbConnect)
  .then(() => console.log("db-connected"))
  .catch((err) => console.log(err.message));

module.exports = app;
