const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const unitSchema = new mongoose.Schema({
  unitNumber: {
    type: Number,
    required: true
  },

  unitTitle: {
    type: String,
    required: true
  },

  // Resources unit-wise
  notes: [
    {
      title: String,
      link: String
    }
  ],

  books: [
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
  ],

  // Topics inside the unit
  topics: [topicSchema]
});

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

  units: {
  type: [unitSchema],
  default: []
}
});

module.exports = mongoose.model("Subject", subjectSchema);