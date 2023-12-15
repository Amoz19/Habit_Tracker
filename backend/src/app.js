const express = require("express");
// const cors = require("cors");
const calendarRoute = require("./routes/calendarRoute");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const middlewares = require("./middlewares");

const dbConnect = process.env.DB_URL;
const secret = process.env.SECRET_KEY;

const app = express();

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

app.use(express.json());

const mongoDbStore = new MongoDbStore({
  uri: dbConnect,
  collection: "userSessions",
});

app.use(
  session({
    name: "session-id",
    secret: secret,
    saveUninitialized: false,
    resave: false,
    store: mongoDbStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
      sameSite: false,
      secure: true,
    },
  })
);

app.use("/api/v1", allowCors(calendarRoute));
app.use("/api/user", allowCors(userRoute));
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.get("/", (req, res) => {
  return res.send("Hello");
});

mongoose
  .connect(dbConnect)
  .then(() => console.log("db-connected"))
  .catch((err) => console.log(err.message));

module.exports = app;