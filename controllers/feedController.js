function diff_hours(dt2, dt1)
{
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

var ObjectId = require('mongoose').Types.ObjectId;

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Post = require('../models/Post.js');
const User = require('../models/User.js');

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const feedController = {

  // executed when the client sends an HTTP GET request `/profile/:idNum`
  // as defined in `../routes/routes.js`
  getPosts: function (req, res) {

    // query where `idNum` is equal to URL parameter `idNum`
    var projection = '_id title user image description dateCreated';

    // calls the function findOne()
    // defined in the `database` object in `../models/db.js`
    // this function searches the collection `users`
    // based on the value set in object `query`
    // the third parameter is a string containing the fields to be returned
    // the fourth parameter is a callback function
    // this called when the database returns a value
    // saved in variable `result`
    db.findMany(Post, {}, projection, function(result) {
      var posts = [];
      for (i in result) {
        db.findById(User, result[i].user, function(resulta) {
          var obj =
            {
              post_author: resulta.username,
              post_image: result[i].image,
              post_title: result[i].title,
              post_elapsed: diff_hours(new Date(Date.now()), new Date(result[i].dateCreated)),
              post_description: result[i].description,
              post_id: result[i]._id,
              comment: [
                {
                  profpic: 'img/le.jpg',
                  name: 'Leanne Loyola',
                  text: 'Woah! Amazing 🌝'
                },

                {
                  profpic: 'img/thea.jpg',
                  name: 'Thea Go',
                  text: 'corpse'
                },

                {
                  profpic: 'img/boss.jpg',
                  name: 'Alexis Dela Cruz',
                  text: 'Awitt'
                },
                {
                  profpic: 'img/albert.jpg',
                  name: 'Albert Bofill',
                  text: 'Nice one'
                },

                {
                  profpic: 'img/mica.jpg',
                  name: 'Michaela Dizon',
                  text: 'haha'
                },

                {
                  profpic: 'img/raf.jpg',
                  name: 'Rafael Maderazo',
                  text: 'Nagtataka padin ako kung bakit ka single'
                }
              ]
            }
          console.log(obj);
          posts.push(obj);
          });
        console.log(posts);
      }
      res.render("home", posts);
      // if the user exists in the database
      // render the profile page with their details
      // if(result != null) {
      //     var details = {
      //         fName: result.fName,
      //         lName: result.lName,
      //         idNum: result.idNum
      //     };
      //
      //     // render `../views/profile.hbs`
      //     res.render('profile', details);
      // }
      // // if the user does not exist in the database
      // // render the error page
      // else {
      //     // render `../views/error.hbs`
      //     res.render('error');
      // }
    });
  }
}
// exports the object `signupController` (defined above)
// when another script exports from this file
module.exports = feedController;
