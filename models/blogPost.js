var mongoose  = require("mongoose");
    

var blogSchema = new mongoose.Schema({
    imageId: String,
    image: {type: String, default: "../images/logo.jpeg"},
    title: String,
    description: String,
    created_at: { type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Likes"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BlogComment"
        }
    ]
});

module.exports = mongoose.model("Blog", blogSchema);