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
        default: Date.now
    },
    likes:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Likes'
    },
    postPic:
    {
        type: Buffer,
        required: false
    },
    imgType: 
    {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Posts', PostSchema);
