const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Following = require('../models/Following');
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
                        var cursor = client.collection('posts').find({user: result.username});

                        cursor.forEach(function(doc, err){
                            assert.equal(null, err);
                            var postMirror = {
                                path: `data:${doc.imgType};charset=utf-8;base64,${doc.postpic.toString('base64')}`
                            };

                            resulter.push(postMirror);

                        }, function(){
                            client.close();
                            res.render('profile', {
                                layout: false,
                                myavatar: `data:${result.imgType};charset=utf-8;base64,${result.avatar.toString('base64')}`,
                                avatar: `data:${result.imgType};charset=utf-8;base64,${result.avatar.toString('base64')}`,
                                bio: result.bio,
                                location: result.location,
                                username: result.username,
                                name: result.fullName,
                                posts: resulter,
                                custom_nav: '<button type="button" class="dropdown-item btn-light" id="getdat" data-toggle="modal" data-target="#profset">Profile Settings</button>'
                                });

                        });
                    });
                } else {
                    res.send(500 + " Can't find the user");
                }

            });
    },

    getUserProfile: async (req, res)=>{
        var currentUser = req.params.username;

        var query = {username: currentUser};

        var projection = 'avatar username fullName bio location imgType';

        db.findOne(User, query, projection,
            (result)=>{
                if(result != null){
                    var resulter = [];
                    mongo.connect(url, function(err, client){
                        assert.equal(null, err);
                        var cursor = client.collection('posts').find({user: result.username});

                        cursor.forEach(function(doc, err){
                            assert.equal(null, err);
                            var postMirror = {
                                path: `data:${doc.imgType};charset=utf-8;base64,${doc.postpic.toString('base64')}`
                            };

                            resulter.push(postMirror);

                        }, function(){
                            client.close();
                            var myUser = req.session.username;
                            var projectNew = 'imgType avatar';
                            var findFollow = 'user following';

                            db.findOne(User, {username: myUser}, projectNew, (checkRes)=>{
                                if(checkRes != null)
                                {
                                    var userMirror = {
                                        myavatar: `data:${checkRes.imgType};charset=utf-8;base64,${checkRes.avatar.toString('base64')}`,
                                        avatar: `data:${result.imgType};charset=utf-8;base64,${result.avatar.toString('base64')}`,
                                        bio: result.bio,
                                        location: result.location,
                                        username: result.username,
                                        name: result.fullName,
                                        posts: resulter,
                                        status: myUser != currentUser ? true : false,
                                        follow: false
                                    }

                                    db.findOne(Following, {user: myUser, following: userMirror.username}, findFollow, (followRes)=>{
                                        if(followRes != null)
                                        {
                                            var followVal = true;
                                        }
                                    });

                                    res.render('profile', {                                    
                                        myavatar: `data:${checkRes.imgType};charset=utf-8;base64,${checkRes.avatar.toString('base64')}`,
                                        avatar: `data:${result.imgType};charset=utf-8;base64,${result.avatar.toString('base64')}`,
                                        bio: result.bio,
                                        location: result.location,
                                        username: result.username,
                                        name: result.fullName,
                                        posts: resulter,
                                        status: myUser != currentUser ? true : false,
                                        follow: followVal
                                    });
                                } else {
                                    res.send(500 + ' Error loading');
                                }
                            })
                        });
                    });
                } else {
                    res.send(500 + " Can't find the user");
                }

            });
    },

    postEditProfile: (req, res)=> {
        var newbio = req.body.newbio;
        var newloc = req.body.newloc;
        var newavatar = req.body.newavatar;
        var newusername = req.body.newhandle;

        var currentUser = req.session.username;
        var filter = {username: currentUser};

        if(newavatar != null)
        {
            var pic = JSON.parse(newavatar);

            if(pic != null && imageMimeTypes.includes(pic.type))
            {
                var dat = new Buffer.from(pic.data, 'base64');
                var dattype = pic.type;

                db.updateOne(User, filter, {
                    bio: newbio,
                    username: newusername,
                    location: newloc,
                    avatar: dat,
                    imgType: dattype
                });
            } else {
                db.updateOne(User, filter, {
                    bio: newbio,
                    username: newusername,
                    location: newloc
                });
            }
           
        } else {
            db.updateOne(User, filter, {
                bio: newbio,
                username: newusername,
                location: newloc
            });
        }
        

        res.redirect('/profile');

    }
}

module.exports = profileController;
