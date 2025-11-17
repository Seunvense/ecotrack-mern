const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const User = require("../models/User");

// AUTH ROUTES
router.post("/register", register);
router.post("/login", login);

// 🔥 ADD LOGOUT ROUTE HERE
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res.json({ message: "Logged out" });
});

// PROTECTED ROUTE
router.get("/me", protect, getMe);

router.get("/test-users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
