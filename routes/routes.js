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

app.get("/", function(req, res)
{
  if(req.session.loggedin != true) {
    res.render("login", {layout: false});
  }
  else {
    res.render("home", {
      post: [
        {
          post_image: 'img/landing1.jpg',
          post_title: 'Manila at Night',
          post_author: 'Eugenio Pastoral',
          post_elapsed: '8 hours ago',
          post_description: 'I teased this shoot over on my Instagram a few weeks ago. Taken two days before Christmas last year. I first attempted to take a shot of this way back in November 2018 but was unsuccessful to my eyes. Fortunately, I spent that night near the location with all my gear.'
        },
        {
          post_image: 'img/landing4.jpg',
          post_title: 'Lights',
          post_author: 'Eugenio Pastoral',
          post_elapsed: '12 hours ago',
          post_description: 'It was a day before Christmas Eve. It has been raining continuously for a few days. Overlooking the streets, I was amused by how passing cars light up the moist window.'
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

app.get("/user/:username", function(req, res)
{
  res.render("profile", {avatar_id: "avatar"});
});

module.exports = app;
