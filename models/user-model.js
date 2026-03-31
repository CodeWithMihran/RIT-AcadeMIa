const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  branch: {
    type: String,
    // Removed required: true so Google users can register
  },
  year: {
    type: Number,
    // Removed required: true
  },
  semester: {
    type: Number,
    // Removed required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // Removed required: true (Google users don't have one)
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple users to have 'null' googleId (manual users)
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);