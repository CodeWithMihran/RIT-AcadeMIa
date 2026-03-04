module.exports = function (req, res, next) {
    const { name, branch, year, semester, email, password, confirmPassword } = req.body;

    // Check if any required field is empty
    if (!name || !branch || !year || !semester || !email || !password || !confirmPassword) {
        req.flash("error", "All fields are required");
        return res.redirect("back"); // go back to the form
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        req.flash("error", "Passwords do not match");
        return res.redirect("back");
    }

    // Optional: check email format (basic)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        req.flash("error", "Invalid email address");
        return res.redirect("back");
    }

    // If everything is fine, proceed to controller
    next();
};