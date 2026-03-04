const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");


// Register
module.exports.registerUser = async (req, res) => {
  try {
    const { name, branch, year, semester, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/");
    }

    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "You already have an account, please login.");
      return res.redirect("/");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      branch,
      year,
      semester,
      email,
      password: hash
    });

    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/");

  } catch (err) {
    res.send(err.message);
  }
};

// Login
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/");
    }

    let token = generateToken(user);
    res.cookie("token", token);

    if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/dashboard");
    }

  } catch (err) {
    res.send(err.message);
  }
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};