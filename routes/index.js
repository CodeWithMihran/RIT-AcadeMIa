const express = require("express");
const router = express.Router();

// Home / Welcome page
router.get("/", (req, res) => {
    res.render("home"); // home.ejs with intro + login/register box
});

module.exports = router;