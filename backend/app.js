const express = require("express");
const cors = require("cors");
const calendarRoute = require("./routes/calendarRoute");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const dbConnect = process.env.DB_URL;
const secret = process.env.SECRET_KEY;

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

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
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use("/api/v1", calendarRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  return res.send("Hello");
});

mongoose
  .connect(dbConnect)
  .then(() => console.log("db-connected"))
  .catch((err) => console.log(err.message));

module.exports = app;
