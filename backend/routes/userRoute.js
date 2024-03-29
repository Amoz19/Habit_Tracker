const express = require("express");
const { createNewUser, userLogin } = require("../controller/userController");

const router = express.Router();

router.post("/signup", createNewUser);
router.post("/login", userLogin);

module.exports = router;
