const express = require("express");
const {
  addFullYear,
  getFullYear,
  getFullYearById,
  updateComplete,
  deleteHabit,
} = require("../controller/calendarController");
const {
  weeklyProgress,
  monthlyProgress,
} = require("../controller/progressController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/progress", weeklyProgress);
router.get("/monthProgress", monthlyProgress);
router.post("/", addFullYear);
router.get("/", getFullYear);
router.get("/:id", getFullYearById);
router.patch("/", updateComplete);
router.delete("/:id", deleteHabit);

module.exports = router;
