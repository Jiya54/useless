const express = require("express");
const router = express.Router();
const WastedSession = require("../models/WastedSession");

// POST /api/session — Log a new wasted session
router.post("/", async (req, res) => {
  const { username, activity, duration } = req.body;

  // Simple roast logic (you can improve later!)
  const roast = `Wow, ${duration} minutes? You're on a roll of doing nothing 😤`;

  try {
    const newSession = new WastedSession({
      username,
      activity,
      duration,
      roast
    });

    await newSession.save();
    res.status(201).json({ message: "Session saved", session: newSession });
  } catch (err) {
    res.status(500).json({ error: "Failed to save session", details: err.message });
  }
});

module.exports = router;

// GET /api/session — Retrieve all wasted sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await WastedSession.find().sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions", details: err.message });
  }
});

// DELETE /api/session/:id — Delete a session
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await WastedSession.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Session not found" });

    res.json({ message: "Session deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
});

