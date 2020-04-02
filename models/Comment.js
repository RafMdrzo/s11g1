var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
        },
    post:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    text:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);