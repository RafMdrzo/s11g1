const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');
const R = require('ramda');

const Like = require('../models/Likes.js');

const url = 'mongodb://localhost:27017/folioDB';

const likeController = {
    postLike: async (req, res)=>{
        var post_id = req.body.hidden_id;
        var userQuery = req.session.username;
        var date = new Date(Date.now());

        console.log("hello");

        db.insertOne(Like, {
            user: userQuery,
            post: post_id,
            dateLiked: date
        });
        res.redirect('/home');
    }
}

module.exports = likeController;