const express = require("express");
const {
  addFullYear,
  getFullYear,
  getFullYearById,
  updateComplete,
  deleteHabit,
} = require("../controller/calendarController");

const router = express.Router();

router.post("/", addFullYear);
router.post("/getUserData", getFullYear);
router.get("/:id", getFullYearById);
router.patch("/", updateComplete);
router.delete("/:id", deleteHabit);

module.exports = router;
