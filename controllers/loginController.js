const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');
// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const url = 'mongodb://localhost:27017/folioDB';
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const loginController = {

  // executed when the client sends an HTTP GET request `/login`
  // as defined in `../routes/routes.js`
  getLogIn: async function (req, res) {
    res.render('login', {layout: false});
  },

  // executed when the client sends an HTTP POST request `/signup`
  // as defined in `../routes/routes.js`
  postLogIn: async function (req, res) {

    // when submitting forms using HTTP POST method
    // the values in the input fields are stored in the req.body object
    // each <input> element is identified using its `name` attribute
    // Example: the value entered in <input type="text" name="fName">
    // can be retrieved using req.body.fName
    var query = {username: req.body.username};

    // fields to be returned
    var projection = 'username password avatar imgType';
    
    db.findOne(User, query, projection, function(result) {
      console.log(result);
      if(result != null) {
        if(req.body.username == result.username) {
          if(req.body.password == result.password) {
            req.session.username = result.username;
            console.log(req.session.username);
            
              var newprojection = '_id user title description dateCreated postpic imgType';
            
              var imgTypeRes = '';
      
              db.findMany(Post, {}, newprojection,function(result){
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
                                          post_id: 'a' + doc._id,
                                          post_author: doc.user,
                                          post_title: doc.title,
                                          post_description: doc.description,
                                          post_elapsed: '8 hours ago',
                                          post_image: `data:${doc.imgType};charset=utf-8;base64,${doc.postpic.toString('base64')}`
                                      };
                                      console.log(postMirror.post_id);
                                      resulter.push(postMirror);
      
                                  }, function(){
                                      client.close();
                                      res.render('home', {
                                          avatar: `data:${newRes.imgType};charset=utf-8;base64,${newRes.avatar.toString('base64')}`,
                                          post: resulter,
                                          comment:[]
                                          
                                          });
          
                                  });
                              });
      
                              
                          }
                       });
      
      
                      
                  } else {
                      res.send(500);
                  }
              });
          
           
          }
        }
      }
    });
  }

}

// exports the object `signupController` (defined above)
// when another script exports from this file
module.exports = loginController;
