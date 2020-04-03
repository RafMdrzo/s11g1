const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

const Follower = require('../models/Follower.js');
const Following = require('../models/Following.js');

const url = 'mongodb://localhost:27017/folioDB';

const followController = {
    follow: async function(req,res) {
        var userQuery = req.session.username;
        var follow = req.body.follow;

        console.log(userQuery);
        console.log(follow);

        db.insertOne(Follower, {
            user: follow,
            follower: userQuery
        });

        db.insertOne(Following, {
            user: userQuery,
            following: follow
        });
    }
}

module.exports = followController;
