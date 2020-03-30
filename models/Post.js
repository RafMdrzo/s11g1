var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    title:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        required: true
    },
    likes:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Likes'
    }
});

module.exports = mongoose.model('Posts', PostSchema);
