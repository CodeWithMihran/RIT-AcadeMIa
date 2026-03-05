const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/:subjectId", isLoggedIn, progressController.showProgress);

router.post("/toggle", isLoggedIn, progressController.toggleTopic);

module.exports = router;