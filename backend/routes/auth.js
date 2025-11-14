const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");

// ... existing routes
router.get("/me", getMe);

// @route  POST /api/auth/register
router.post("/register", register);

// @route  POST /api/auth/login
router.post("/login", login);

router.get(
  "/me",
  require("../middleware/auth"),
  require("../controllers/authController").getMe
);

module.exports = router;
