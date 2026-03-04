const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const checkRole = require("../middlewares/checkRole");

// Student view: subjects/content
router.get("/", isLoggedIn, subjectController.showSubjects);

// Admin routes: add/edit/delete subjects
router.get("/add", isLoggedIn, checkRole(["admin"]), (req, res) => res.render("add-subject"));
router.post("/add", isLoggedIn, checkRole(["admin"]), subjectController.addSubject);

router.get("/edit/:id", isLoggedIn, checkRole(["admin"]), subjectController.editSubject);
router.post("/edit/:id", isLoggedIn, checkRole(["admin"]), subjectController.updateSubject);

router.post("/delete/:id", isLoggedIn, checkRole(["admin"]), subjectController.deleteSubject);

module.exports = router;