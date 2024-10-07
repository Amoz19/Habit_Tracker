const express = require("express");
const calendarRoute = require("../routes/calendarRoute");
const userRoute = require("../routes/userRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const middlewares = require("./middlewares");

const dbConnect = process.env.DB_URL;
const currentStatus = process.env.VERCEL_ENV;
const port = process.env.PORT;

const checkCurrentStatus = (dev, deploy) => {
  return currentStatus === "production" ? deploy : dev;
};

const app = express();

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Origin",
    checkCurrentStatus(
      "http://localhost:5173",
      "https://habit-tracker-p4rf.vercel.app"
    )
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,Authorization,Accept,Origin"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ greeting: process.env.VERCEL_ENV });
});

app.use("/api/v1/habits", allowCors(calendarRoute));
app.use("/api/v1/user", allowCors(userRoute));
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose
  .connect(dbConnect)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
    console.log("db-connected");
  })
  .catch((err) => console.log(err.message));

module.exports = app;
