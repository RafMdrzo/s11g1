const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

const Like = require('../models/Likes.js');

const url = 'mongodb://localhost:27017/folioDB';

const likeController = {
    postLike: async function (req, res) {
        var post_id = req.body.post_id;
        var userQuery = req.session.username;
        var date = new Date(Date.now());

        console.log(post_id);

        db.insertOne(Like, {
            user: userQuery,
            post: post_id,
            dateLiked: date
        });
        res.redirect('/home');
    }
}

module.exports = likeController;
