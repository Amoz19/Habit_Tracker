const Usermodel = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = process.env.SALT_ROUND;

  if (!username && !password) {
    return res.status(400).send("Please fill all the fields");
  }

  if (password < 6) {
    return res.status(400).send("Password should more than 6");
  }

  try {
    const isUserExist = await Usermodel.findOne({ username });

    if (isUserExist) {
      return res.status(400).send("User already registered");
    }

    await Usermodel.create({
      email,
      password: bcrypt.hashSync(password, saltRounds),
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
      res.status(400).send("User does not exist");
    }

    const isCorrectPassword = bcrypt.compareSync(password, saltRounds);

    if (!isCorrectPassword) {
      return res.status.send("Wrong password");
    }

    const sessUser = {
      id: userCredential._id,
      username: userCredential.username,
    };
  } catch (error) {}
};

module.exports = { createNewUser };
