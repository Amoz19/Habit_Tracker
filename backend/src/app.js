const express = require("express");
const cors = require("cors");
const calendarRoute = require("../routes/calendarRoute");
const userRoute = require("../routes/userRoute");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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

console.log("NODE_ENV:", process.env.NODE_ENV);

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
      sameSite: "none",
      secure: false,
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ greeting: "Hello" });
});

app.use("/api/v1", allowCors(calendarRoute));
app.use("/api/user", allowCors(userRoute));
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;

mongoose
  .connect(dbConnect)
  .then(() => console.log("db-connected"))
  .catch((err) => console.log(err.message));

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

module.exports = app;
