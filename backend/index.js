const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const path = require("path");

  const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// MongoDB connection
mongoose.connect("mongodb+srv://jiya54:lalala2006@cluster0.bkfbiu0.mongodb.net/")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});

require("dotenv").config();


const WastedSession = require("./models/WastedSession");

const sessionRoutes = require("./routes/sessionRoutes");
app.use("/api/session", sessionRoutes);



