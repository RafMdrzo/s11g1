function diff_hours(dt2, dt1)
{
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');
const R = require('ramda');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

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
        var projection = '_id user title description dateCreated postpic imgType';
        var imgTypeRes = '';

        var postResulter = [];
        var commentResulter = [];
        var userResulter = [];
        var customResulter = [];

        var commentProjection = '_id post text user dateCreated';
        var userProjection = 'username avatar imgType';

        db.findMany(Post, {}, projection,function(result){
          if(result != null){
            //process post result for views


            for(i = 0; i < result.length; i++)
            {
              var postMirror = {
                post_image: `data:${result[i].imgType};charset=utf-8;base64,${result[i].postpic.toString('base64')}`,
                post_title: result[i].title,
                post_description: result[i].description,
                post_author: result[i].user,
                post_elapsed: diff_hours(new Date(Date.now()), new Date(result[i].dateCreated)) + ' hours ago',
                post_id: 'a' + result[i]._id,
                comment: []
              };
              postResulter.push(postMirror);
            }
            //process comment
            db.findMany(Comment, {}, commentProjection, (commRes)=>{
              if(commRes != null){
                for(i = 0; i < commRes.length; i++)
                {
                  var commentMirror = {
                    username: commRes[i].user,
                    post_id: commRes[i].post,
                    dateCreated: commRes[i].dateCreated,
                    text: commRes[i].text
                  }

                  commentResulter[i] = commentMirror;
                }
                //process user result
                db.findMany(User, {}, userProjection, (profRes)=>{
                  if(profRes != null){
                    for(i = 0; i < profRes.length; i++)
                    {
                      var userMirror = {
                        username: profRes[i].username,
                        virtualPath:  `data:${profRes[i].imgType};charset=utf-8;base64,${profRes[i].avatar.toString('base64')}`
                      }

                      userResulter.push(userMirror);

                    }
                    for(i = 0; i < postResulter.length; i++)
                    {
                      var finalResulter = [];
                      for(j = 0; j < commentResulter.length; j++)
                      {
                        if(commentResulter[j].post_id == postResulter[i].post_id)
                        {
                          for(n = 0; n < userResulter.length; n++)
                          {
                            if(userResulter[n].username == commentResulter[j].username)
                            {
                              var finalMirror = {
                                virtualPath: userResulter[n].virtualPath,
                                text: commentResulter[j].text,
                                name: userResulter[n].username,
                              }
                              postResulter[i].comment.push(finalMirror);
                            }
                          }
                        }
                      }
                    }


                    //logged-in User
                    var newQuery = {username: req.session.username};
                    var newProjection = 'avatar imgType';
                    db.findOne(User, newQuery, newProjection, async (newRes)=>{
                      if(newRes != null){

                        res.render('home',{
                          avatar:  `data:${newRes.imgType};charset=utf-8;base64,${newRes.avatar.toString('base64')}`,
                          post: postResulter
                        })
                      }
                    });
                  } else {
                    res.send(500 + 'Error in handling data');
                  }
                });
                //process and combine gathered queries from user and comment to show comments in views
              } else {
                res.send(500 + 'Error in handling data');
              }
            });
          } else {
            res.send(500);
          }
        });
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
