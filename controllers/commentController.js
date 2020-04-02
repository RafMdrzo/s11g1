const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

const url = 'mongodb://localhost:27017/folioDB';
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const commentController = {
    postAddComment: async (req, res)=>{
        var modifiedPost_id = req.body.hidden_id;
        var comment = req.body.comment;
        var userQuery = req.session.username;
        var originalID = modifiedPost_id.substr(1);

        db.insertOne(Comment, {
            user: userQuery,
            post: originalID,
            text: comment
        });

        res.redirect('home');
    }
}

module.exports = commentController;