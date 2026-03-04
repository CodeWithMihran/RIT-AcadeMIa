require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Global User (for EJS access)
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

// Routes
const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/", authRoutes);

// Temporary Dashboard
const Subject = require("./models/subject-model");

app.get("/dashboard", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  const subjects = await Subject.find({
    branch: req.session.user.branch,
    semester: req.session.user.semester
  });

  res.render("dashboard", {
    user: req.session.user,
    subjects
  });
});

// Temporary Admin
app.get("/admin", (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.send("Access Denied");
  }
  res.render("admin");
});

// Add-subject form
app.get("/admin/add-subject", (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.send("Access Denied");
  }
  res.render("add-subject");
});

app.post("/admin/add-subject", async (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.send("Access Denied");
  }

  const { name, branch, semester, syllabus } = req.body;

  await Subject.create({
    name,
    branch,
    semester,
    syllabus
  });

  res.redirect("/admin");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});