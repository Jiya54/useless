const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    default: "Unspecified time-wasting"
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  roast: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("WastedSession", sessionSchema);
