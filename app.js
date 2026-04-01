require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport"); // Added
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Added
const userModel = require("./models/user-model"); // Ensure this path is correct

const app = express();

// Required for Render deployment to trust HTTPS headers
app.set("trust proxy", 1);

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
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // true if deployed on HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use(flash());

// ------------------
// Passport Configuration (Added)
// ------------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    proxy: true 
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;

        // --- RIT ROORKEE DOMAIN RESTRICTION ---
        if (!email.endsWith('@ritroorkee.com')) {
            return done(null, false, { message: 'Access Denied: Use @ritroorkee.com email only.' });
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            // Create new student with placeholders for required fields
            user = await userModel.create({
                name: profile.displayName,
                email: email,
                googleId: profile.id,
                branch: "Not Set", 
                year: 1,
                semester: 1,
                role: "student"
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Save user ID to session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Retrieve user from DB using ID in session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

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
    // Check both session and passport user for currentUser
    res.locals.currentUser = req.user || req.session.user || null;
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

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/subjects", subjectRoutes);
app.use("/admin", adminRoutes);
app.use("/progress", progressRoutes);

// ------------------
// 404 & Error Handler
// ------------------
app.use((req, res) => {
    res.status(404).render("404", { url: req.originalUrl });
});


// ------------------
// 500 & Error Handler
// ------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("500", { error: err.message });
});

// ------------------
// Start Server
// ------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});