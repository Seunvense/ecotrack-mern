const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// --- FIX CORS ---
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/activities", require("./routes/activity"));

app.get("/", (req, res) => {
  res.send("EcoTrack API Running");
});

// --- SOCKET.IO USING THE FORMAT YOU WANT ---
const PORT = process.env.PORT || 5000;

// Start server normally
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Attach socket.io AFTER server starts
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Make io available inside routes
app.set("io", io);

// Socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
