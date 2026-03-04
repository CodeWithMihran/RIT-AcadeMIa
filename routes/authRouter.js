const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateUserInput = require("../middlewares/validateUserInput"); // registration validation

// Registration
router.post("/register", validateUserInput, authController.registerUser);

// Login (basic validation for email & password)
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("back");
    }
    next();
}, authController.loginUser);

// Logout
router.get("/logout", authController.logoutUser);

module.exports = router;