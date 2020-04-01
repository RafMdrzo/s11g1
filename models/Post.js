var mongoose = require('mongoose');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];


var PostSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    postpic:
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

module.exports = mongoose.model('Post', PostSchema);
