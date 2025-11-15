// backend/routes/activity.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  logActivity,
  getActivities,
} = require("../controllers/activityController");

router.post("/", protect, logActivity);
router.get("/", protect, getActivities);

module.exports = router;
