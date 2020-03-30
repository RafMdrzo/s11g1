var mongoose = require('mongoose');

var FollowingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    following:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Users'
    }
});

module.exports = mongoose.model('Following', FollowingSchema);