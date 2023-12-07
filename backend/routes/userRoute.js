const express = require("express");
const { createNewUser, userLogin } = require("../controller/userController");

const router = express.Router();

router.post("/singup", createNewUser);
router.post("/login", userLogin);
