var mongoose = require('mongoose');

var FollowerSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Users'
    }
});

module.exports = mongoose.model('Followers', FollowerSchema);