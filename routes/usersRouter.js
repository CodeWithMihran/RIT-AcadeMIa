const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const validateUserInput = require("../middlewares/validateUserInput");

// Dashboard (after login)
router.get("/dashboard", isLoggedIn, userController.showDashboard);

// View profile
router.get("/profile", isLoggedIn, userController.viewProfile);

// Update profile
router.post("/profile/update", isLoggedIn, validateUserInput, userController.updateProfile);

module.exports = router;