var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
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
        type: String,
        required: false
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
