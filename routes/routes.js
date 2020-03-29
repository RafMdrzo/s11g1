const express = require('express');
//for session checking
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//login
app.get("/", function(req, res)
{
  if(req.session.loggedin != true) {
    res.render("login", {layout: false});
  }
  else {
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
});

app.post('/auth', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username == "eugeniopastoral") {
    if(password == "helloworld") {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/');
    }
  }
  else {
    res.send('Incorrect Username and/or Password!');
  }
  res.end();
});

//db implementation of login
/*
app.post('/auth', function(request, response) {
var username = request.body.username;
var password = request.body.password;
if (username && password) {
connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
if (results.length > 0) {
request.session.loggedin = true;
request.session.username = username;
response.redirect('/home');
} else {
response.send('Incorrect Username and/or Password!');
}
response.end();
});
} else {
response.send('Please enter Username and Password!');
response.end();
}
});
*/

//logout
app.get('/logout', function(req, res) {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

app.get("/:username", function(req, res)
{
  res.render("profile", {avatar_id: "avatar"});
});

module.exports = app;
