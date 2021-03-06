const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

const Follower = require('../models/Follower.js');
const Following = require('../models/Following.js');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/folioDB';

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
    },

    unfollow: (req, res) =>{
      var currentUser = req.session.username;
      var follow = req.body.follow;

      db.deleteOne(Following, {user: currentUser, following: follow});
      db.deleteOne(Follower, {user: follow, follower: currentUser});
      res.redirect('/home');
    }
}

module.exports = followController;
