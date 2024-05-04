var mongoose  = require("mongoose");
    
var curricularSchema = new mongoose.Schema({
    category: String,
    title: String,
    file: String,
    fileId: String,
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String,
        designation: String
    },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Curricula', curricularSchema);