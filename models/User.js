var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type:String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    emailConf: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Users', UserSchema);