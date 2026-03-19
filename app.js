require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const app = express();

// ------------------
// Database Connection
// ------------------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// ------------------
// Middlewares
// ------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// ------------------
// Static Files
// ------------------
app.use(express.static(path.join(__dirname, "public")));

// ------------------
// View Engine
// ------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ------------------
// Global Variables for EJS
// ------------------
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ------------------
// Routes
// ------------------
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/authRouter");
const userRoutes = require("./routes/usersRouter");
const subjectRoutes = require("./routes/subjectsRouter");
const adminRoutes = require("./routes/adminRouter");
const progressRoutes = require("./routes/progressRouter");

// Home / Welcome page
app.use("/", indexRoutes);

// Authentication
app.use("/auth", authRoutes);

// User dashboard / profile
app.use("/", userRoutes);

// Subjects (students & admin)
app.use("/subjects", subjectRoutes);

// Admin dashboard / manage users & subjects
app.use("/admin", adminRoutes);

// Progress Tracker / track progress of user
app.use("/progress", progressRoutes);

// ------------------
// 404 Page
// ------------------
// app.use((req, res) => {
//     res.status(404).render("404", { url: req.originalUrl });
// });

// ------------------
// Global Error Handler
// ------------------
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).render("500", { error: err });
// });

// ------------------
// Start Server
// ------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});