var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
    dateCreated:{
        type: Date,
        required: true
    },
    text:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comments', CommentSchema);