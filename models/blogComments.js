var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String
    },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("BlogComment", commentSchema);