const express = require("express");
const {
  addFullYear,
  getFullYear,
  getFullYearById,
  updateComplete,
} = require("../controller/calendarController");

const router = express.Router();

router.post("/", addFullYear);
router.post("/getUserData", getFullYear);
router.get("/:groupId", getFullYearById);
router.patch("/", updateComplete);

module.exports = router;
