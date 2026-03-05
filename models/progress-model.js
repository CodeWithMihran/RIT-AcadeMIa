const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true
    },

    unitIndex: {
        type: Number,
        required: true
    },

    topicIndex: {
        type: Number,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model("progress", progressSchema);