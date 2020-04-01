const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const url = 'mongodb://localhost:27017/folioDB';
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const postController = {
    postAddPost: async function (req, res){
        var query = {username: req.session.username};
        //post contents
        var desc = req.body.descriptor ;
        var post_title = req.body.post_title;
        var picEncoded = req.body.upload;

        if(picEncoded != null)
        {
            var pic = JSON.parse(picEncoded);
            if(pic != null && imageMimeTypes.includes(pic.type))
            {
                var dat = new Buffer.from(pic.data, 'base64');
                var dattype = pic.type;

                db.insertOne(Post, 
                    {
                        postpic: dat,
                        imgType: dattype,
                        title: post_title,
                        description: desc,
                        user: req.session.username
                    });
                res.redirect('/home');
            } else {
                db.insertOne(Post,
                    {
                        user: req.session.username,
                        title: post_title,
                        postpic: null,
                        description: desc,
                        imgType: ""

                    } );
                res.redirect('/home');
            }
            
        }
        else 
        {
            res.send(500 + "Error in handling data");
        }
    },
    getHome: async function(req, res){
        var projection = 'user title description dateCreated postpic imgType';
      
        var imgTypeRes = '';

        db.findMany(Post, {}, projection,function(result){
            if(result != null){
                var newQuery = {username: req.session.username};
                var newProjection = 'avatar imgType';

                db.findOne(User, newQuery, newProjection, (newRes)=>{
                    if(newRes != null){
                        var resulter = [];
                        mongo.connect(url, function(err, client){
                            assert.equal(null, err);
                            var cursor = client.collection('posts').find();

                            cursor.forEach(function(doc, err){
                                assert.equal(null, err);
                                var postMirror = {
                                    post_author: doc.user,
                                    post_title: doc.title,
                                    post_description: doc.description,
                                    post_elapsed: '8 hours ago',
                                    post_image: `data:${doc.imgType};charset=utf-8;base64,${doc.postpic.toString('base64')}`
                                };

                                resulter.push(postMirror);

                            }, function(){
                                client.close();
                                res.render('home', {
                                    avatar: `data:${newRes.imgType};charset=utf-8;base64,${newRes.avatar.toString('base64')}`,
                                    post: resulter,
                                    comment: [{}]
                                    
                                    });
    
                            });
                        });

                        
                    }
                 });


                
            } else {
                res.send(500);
            }
        });

            

        console.log("i'm outside bitch");
    }
     /*,
    postEditPost: async function (req, res){
        var filter = {username: req.query.username};

        var reqBio = req.body.bio_assign;
        var reqLoc = req.body.loc_assign;

        var projection = 'bio location';
        db.updateOne(User, filter, 
            {
                bio: reqBio,
                location: reqLoc
            });
        
        res.redirect('/registerAvatar?username=' + req.query.username);
        
    } */
};

module.exports = postController;