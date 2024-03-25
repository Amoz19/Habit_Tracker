const Usermodel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "5d" });
};

const createNewUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Please fill all the fields");
  }

  if (password < 6) {
    return res.status(400).send("Password should more than 6");
  }

  try {
    const isAreadyRegisterd = await Usermodel.findOne({ username });

    if (isAreadyRegisterd) {
      return res.status(400).send("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await Usermodel.create({
      username,
      password: hashedPassword,
    });
    const token = createToken(createdUser._id);
    res.json({
      username: createdUser.username,
      token,
      userId: createdUser._id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    return res.status(400).send("Please enter all the field");
  }

  try {
    const userCredential = await Usermodel.findOne({ username });
    if (!userCredential) {
      res.status(400).send("User not found");
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      userCredential.password
    );

    if (!isCorrectPassword) {
      return res.status(400).send("Wrong password");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await Usermodel.create({
      username,
      password: hashedPassword,
    });

    const token = createToken(createdUser._id);
    res.json({
      username: createdUser.username,
      token,
      userId: createdUser._id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) throw error;
      res.clearCookie("session-id");
      res.send("Successfully Logout");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNewUser, userLogin, logout };
