const express = require("express");
const {
  createNewUser,
  userLogin,
  logout,
  checkAuth,
} = require("../controller/userController");

const router = express.Router();

router.post("/singup", createNewUser);
router.post("/login", userLogin);
router.delete("/logout", logout);
router.get("/authChecker", checkAuth);

module.exports = router;
