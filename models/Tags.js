var mongoose = require('mongoose');

var TagsSchema = new mongoose.Schema({
    
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
    tag:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tag', TagsSchema);