var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
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
    },
    avatar: {
        type: Buffer,
        required: false
    },
    imgType: {
        type: String,
        required: false
    }
});

/*
UserSchema.virtual('avatarPath').get(function() {
    if (this.avatar != null && this.imgType != null) {
      return `data:${this.imgType};charset=utf-8;base64,${this.avatar.toString('base64')}`
    }
  })
  */

module.exports = mongoose.model('User', UserSchema);
