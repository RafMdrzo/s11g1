var mongoose = require('mongoose');

var LikeSchema = new mongoose.Schema({
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
    dateLiked:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Likes', LikeSchema);