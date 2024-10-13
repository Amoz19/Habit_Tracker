const express = require("express");
const calendarRoute = require("../routes/calendarRoute");
const userRoute = require("../routes/userRoute");
const mongoose = require("mongoose");
require("dotenv").config();
const middlewares = require("./middlewares");

const dbConnect = process.env.DB_URL;
const currentStatus = process.env.VERCEL_ENV;
const port = process.env.PORT || 5001;

// Utility function to switch between environments
const checkCurrentStatus = (dev, deploy) => {
  return currentStatus === "production" ? deploy : dev;
};

const app = express();

// CORS setup
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Origin",
    checkCurrentStatus(
      "http://localhost:5173", // Dev origin
      "https://habit-tracker-p4rf.vercel.app" // Prod origin
    )
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Accept, Origin"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  return res.json({ greeting: process.env.VERCEL_ENV });
});

// Routes
app.use("/api/v1/habits", allowCors(calendarRoute));
app.use("/api/v1/user", allowCors(userRoute));

// Middleware for handling 404 and errors
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// MongoDB connection and server start
mongoose
  .connect(dbConnect)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
    console.log("DB connected successfully");
  })
  .catch((err) => console.log(err.message));

module.exports = app;
