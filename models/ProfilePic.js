var mongoose = require('mongoose');

var ProfPicSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    avatar:{
        type: Buffer,
        required: true
    },
    imgType:{
        type: String,
        required: true
    },
    defaultPic:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('ProfPics', ProfPicSchema);