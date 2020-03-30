var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({

});

module.exports = mongoose.model('Comments', CommentSchema);