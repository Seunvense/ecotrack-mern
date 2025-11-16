// backend/routes/activity.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  logActivity,
  getActivities,
  getLeaderboard,
  resetFootprint,
} = require("../controllers/activityController");

router.post("/", protect, logActivity);
router.get("/", protect, getActivities);
router.get("/leaderboard", getLeaderboard);
router.delete("/reset", protect, resetFootprint);

module.exports = router;
