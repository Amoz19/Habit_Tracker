const Usermodel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;

  if (!username && !password) {
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

    await Usermodel.create({
      username,
      password: hashedPassword,
    });
    res.send("Register Successfully");
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
      res.status(400).send("Wrong Credential");
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      userCredential.password
    );

    if (!isCorrectPassword) {
      return res.status(400).send("Wrong password");
    }

    const sessUser = {
      id: userCredential._id,
      username: userCredential.username,
    };

    req.session.user = sessUser;
    res.json({ msg: "Logged In Successfully", user: sessUser });
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

const checkAuth = async (req, res) => {
  try {
    const sessuser = req.session.user;
    if (!sessuser) res.status(401).send("Did not login yet");
    res.json({ user: sessuser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNewUser, userLogin, logout, checkAuth };
