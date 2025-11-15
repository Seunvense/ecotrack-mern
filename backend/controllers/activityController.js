// backend/controllers/activityController.js
const Activity = require("../models/Activity");
const User = require("../models/User");

// CO₂ Emission Factors (kg CO₂ per unit)
const EMISSION_FACTORS = {
  transport: {
    car: 0.192, // kg CO₂ per km
    bus: 0.105, // kg CO₂ per km
    train: 0.041, // kg CO₂ per km
    bike: 0, // kg CO₂ per km
    walk: 0,
  },
  food: {
    beef: 27, // kg CO₂ per kg
    chicken: 6.9,
    vegetarian: 2.5,
    vegan: 2.0,
  },
  energy: {
    electricity: 0.0005, // kg CO₂ per kWh
    gas: 0.002, // kg CO₂ per kWh
  },
};

// Log Activity
exports.logActivity = async (req, res) => {
  try {
    const { type, category, value, unit } = req.body;
    const userId = req.user.id;

    // Validate
    if (!EMISSION_FACTORS[type]?.[category]) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Calculate CO₂
    const factor = EMISSION_FACTORS[type][category];
    const carbon = parseFloat((factor * value).toFixed(2));

    // Save activity
    const activity = await Activity.create({
      user: userId,
      type,
      category,
      value,
      unit,
      carbon,
    });

    // Update user carbonScore
    await User.findByIdAndUpdate(userId, {
      $inc: { carbonScore: carbon },
    });

    // Emit to Socket.IO
    const io = req.app.get("io");
    const updatedUser = await User.findById(userId).select("name carbonScore");
    io.emit("carbonUpdate", {
      userId,
      name: updatedUser.name,
      carbonScore: updatedUser.carbonScore,
    });

    res.status(201).json({
      message: "Activity logged",
      activity,
      carbon,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
