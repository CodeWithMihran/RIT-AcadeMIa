const subjectModel = require("../models/subject-model"); // You will create this model

// Show subjects/content for logged-in user
module.exports.showSubjects = async (req, res) => {
    try {
        const { branch, semester } = req.user;

        // Fetch subjects for the user's branch and semester
        const subjects = await subjectModel.find({ branch, semester });

        res.render("subjects", { user: req.user, subjects });
    } catch (err) {
        res.send(err.message);
    }
};

// Admin: Add subject/content
module.exports.addSubject = async (req, res) => {
    try {
        const { name, syllabusLink, notesLink, pyqsLink, ytLink } = req.body;

        await subjectModel.create({
            name,
            branch: req.body.branch,
            semester: req.body.semester,
            syllabusLink,
            notesLink,
            pyqsLink,
            ytLink
        });

        req.flash("success", "Subject added successfully");
        res.redirect("/admin/subjects");
    } catch (err) {
        res.send(err.message);
    }
};

// Admin: Edit subject
module.exports.editSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await subjectModel.findById(id);
        if (!subject) {
            req.flash("error", "Subject not found");
            return res.redirect("/admin/subjects");
        }
        res.render("edit-subject", { subject });
    } catch (err) {
        res.send(err.message);
    }
};

// Admin: Update subject
module.exports.updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, syllabusLink, notesLink, pyqsLink, ytLink } = req.body;

        await subjectModel.findByIdAndUpdate(id, {
            name,
            syllabusLink,
            notesLink,
            pyqsLink,
            ytLink
        });

        req.flash("success", "Subject updated successfully");
        res.redirect("/admin/subjects");
    } catch (err) {
        res.send(err.message);
    }
};

// Admin: Delete subject
module.exports.deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await subjectModel.findByIdAndDelete(id);
        req.flash("success", "Subject deleted successfully");
        res.redirect("/admin/subjects");
    } catch (err) {
        res.send(err.message);
    }
};