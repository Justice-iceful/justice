var mongoose = require("mongoose");

var industrySchema = new mongoose.Schema({
    title: String,
    video: String,
    videoId: String,
    videoUrl: String,
    category: String,
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        avatar: String,
        designation: String
    },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("IndustryCourse", industrySchema);