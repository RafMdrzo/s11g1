var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
    imgType:{
        type: String,
        required: true
    },
    image:{
        type: ArrayBuffer,
        required: false
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Images', ImageSchema);