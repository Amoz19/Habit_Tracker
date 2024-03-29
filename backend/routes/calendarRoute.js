const express = require("express");
const {
  addFullYear,
  getFullYear,
  getFullYearById,
  updateComplete,
  deleteHabit,
} = require("../controller/calendarController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
router.post("/", addFullYear);
router.get("/habits", getFullYear);
router.get("/:id", getFullYearById);
router.patch("/", updateComplete);
router.delete("/:id", deleteHabit);

module.exports = router;
