// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const loginController = {

  // executed when the client sends an HTTP GET request `/login`
  // as defined in `../routes/routes.js`
  getLogIn: function (req, res) {
    res.render('login', {layout: false});
  },

  // executed when the client sends an HTTP POST request `/signup`
  // as defined in `../routes/routes.js`
  postLogIn: function (req, res) {

    // when submitting forms using HTTP POST method
    // the values in the input fields are stored in the req.body object
    // each <input> element is identified using its `name` attribute
    // Example: the value entered in <input type="text" name="fName">
    // can be retrieved using req.body.fName
    var query = {username: req.body.username};

    // fields to be returned
    var projection = 'username password';

    db.findOne(User, query, projection, function(result) {
      console.log(req.body.username);
      console.log(result);
      if(result != null) {
        if(req.body.username == result.username) {
          if(req.body.password == result.password) {
            res.render("home", {
              avatar: 'img/avatar.jpg',
              post: [
                {
                  post_image: 'img/landing1.jpg',
                  post_title: 'Manila Bay',
                  post_author: 'Eugenio Pastoral',
                  post_elapsed: '8 hours ago',
                  post_description: 'I teased this shoot over on my Instagram a few weeks ago. Taken two days before Christmas last year. I first attempted to take a shot of this way back in November 2018 but was unsuccessful to my eyes. Fortunately, I spent that night near the location with all my gear.',
                  post_id: 'com1',
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
                },
                {
                  post_image: 'img/landing4.jpg',
                  post_title: 'Lights',
                  post_author: 'Eugenio Pastoral',
                  post_elapsed: '12 hours ago',
                  post_description: 'It was a day before Christmas Eve. It has been raining continuously for a few days. Overlooking the streets, I was amused by how passing cars light up the moist window.',
                  post_id: 'com2',
                  comment: [
                    {
                      profpic: 'img/le.jpg',
                      name: 'Leanne Loyola',
                      text: 'Gandaaa'
                    },

                    {
                      profpic: 'img/thea.jpg',
                      name: 'Thea Go',
                      text: 'Mama mo padin'
                    },

                    {
                      profpic: 'img/boss.jpg',
                      name: 'Alexis Dela Cruz',
                      text: 'XDDD'
                    },
                    {
                      profpic: 'img/albert.jpg',
                      name: 'Albert Bofill',
                      text: 'Grabe'
                    },

                    {
                      profpic: 'img/mica.jpg',
                      name: 'Michaela Dizon',
                      text: 'lmao'
                    },

                    {
                      profpic: 'img/raf.jpg',
                      name: 'Rafael Maderazo',
                      text: 'Single po siya'
                    }
                  ]
                }
              ]
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
