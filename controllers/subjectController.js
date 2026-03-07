const subjectModel = require("../models/subject-model");


// =============================
// Show subjects for students
// =============================
module.exports.showSubjects = async (req, res) => {
    try {

        const { branch, semester } = req.user;

        const subjects = await subjectModel.find({
            branch,
            semester
        });

        res.render("subjects", { user: req.user, subjects });

    } catch (err) {

        res.send(err.message);

    }
};



// =============================
// Admin: Add Subject
// =============================
module.exports.addSubject = async (req, res) => {

    try {

        const { name, branch, semester } = req.body;

        await subjectModel.create({

            name,
            branch,
            semester,

            // VERY IMPORTANT
            units: []

        });

        req.flash("success", "Subject added successfully");
        res.redirect("/admin");

    } catch (err) {

        res.send(err.message);

    }

};



// =============================
// Admin: Edit Subject
// =============================
module.exports.editSubject = async (req, res) => {

    try {

        const { id } = req.params;

        const subject = await subjectModel.findById(id);

        if (!subject) {

            req.flash("error", "Subject not found");
            return res.redirect("/admin");

        }

        res.render("edit-subject", { subject });

    } catch (err) {

        res.send(err.message);

    }

};



// =============================
// Admin: Update Subject
// =============================
module.exports.updateSubject = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedData = req.body;

        await subjectModel.findByIdAndUpdate(id, updatedData);

        req.flash("success", "Subject updated successfully");

        res.redirect("/admin");

    } catch (err) {

        res.send(err.message);

    }

};



// =============================
// Admin: Delete Subject
// =============================
module.exports.deleteSubject = async (req, res) => {

    try {

        const { id } = req.params;

        await subjectModel.findByIdAndDelete(id);

        req.flash("success", "Subject deleted successfully");

        res.redirect("/admin");

    } catch (err) {

        res.send(err.message);

    }

};


// Show single subject with units
module.exports.viewSubject = async (req, res) => {

    try {

        const { id } = req.params;

        const subject = await subjectModel.findById(id);

        if (!subject) {
            return res.send("Subject not found");
        }

        res.render("view-subject", { subject });

    } catch (err) {

        res.send(err.message);

    }

};