const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

const Like = require('../models/Likes.js');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/folioDB';

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
    },

    deleteLike: async function (req, res) {
      console.log({post: req.body.post_id, user: req.session.username})
        db.deleteOne(Like, {post: req.body.post_id, user: req.session.username});
    }
}

module.exports = likeController;
