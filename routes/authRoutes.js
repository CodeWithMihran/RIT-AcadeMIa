const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/* =========================
   REGISTER (POST only)
========================= */
router.post("/register", authController.registerUser);

/* =========================
   LOGIN (POST only)
========================= */
router.post("/login", authController.loginUser);

/* =========================
   LOGOUT
========================= */
router.get("/logout", authController.logoutUser);

module.exports = router;