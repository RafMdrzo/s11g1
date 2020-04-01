var mongoose = require('mongoose');

var FollowingSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    following:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Following', FollowingSchema);