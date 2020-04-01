var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
        },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
    dateCreated:{
        type: Date,
        defualt: Date.now
    },
    text:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comments', CommentSchema);