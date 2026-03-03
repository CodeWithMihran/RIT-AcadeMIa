const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, branch, year, semester, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.send("Passwords do not match");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      branch,
      year,
      semester,
      email,
      password: hashedPassword
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("Error registering user");
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials");

    req.session.user = user;

    if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/dashboard");
    }

  } catch (error) {
    console.log(error);
    res.send("Login error");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};