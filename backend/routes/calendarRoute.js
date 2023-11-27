const express = require("express");
const {
  addFullYear,
  getFullYear,
  getFullYearById,
} = require("../controller/calendarController");

const router = express.Router();

router.post("/", addFullYear);
router.get("/", getFullYear);
router.get("/:groupId", getFullYearById);

module.exports = router;
