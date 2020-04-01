var mongoose = require('mongoose');

var FollowerSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    follower:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Follower', FollowerSchema);