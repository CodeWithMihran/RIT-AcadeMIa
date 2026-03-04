const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  syllabus: String,
  books: [
    {
      title: String,
      link: String
    }
  ],
  notes: [
    {
      title: String,
      link: String
    }
  ],
  pyqs: [
    {
      title: String,
      link: String
    }
  ],
  youtubeLinks: [
    {
      title: String,
      link: String
    }
  ]
});

module.exports = mongoose.model("subject", subjectSchema);