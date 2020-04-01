const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const url = 'mongodb://localhost:27017/folioDB';
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const profileController = {
    getSelfProfile: async (req, res)=>{
        var currentUser = req.session.username;

        var query = {username: currentUser};

        var projection = 'avatar username fullName bio location imgType';

        db.findOne(User, query, projection,
            (result)=>{
                if(result != null){
                    var resulter = [];
                    mongo.connect(url, function(err, client){
                        assert.equal(null, err);
                        var cursor = client.collection('posts').find();

                        cursor.forEach(function(doc, err){
                            assert.equal(null, err);
                            var postMirror = {
                                path: `data:${doc.imgType};charset=utf-8;base64,${doc.postpic.toString('base64')}`
                            };

                            resulter.push(postMirror);

                        }, function(){
                            client.close();
                            res.render('profile', {
                                avatar: `data:${result.imgType};charset=utf-8;base64,${result.avatar.toString('base64')}`,
                                bio: result.bio,
                                location: result.location,
                                username: result.username,
                                name: result.fullName,
                                posts: resulter,
                                });

                        });
                    });
                } else {
                    res.send(500 + " Can't find the user");
                }
                
            });
    }
}

module.exports = profileController;
