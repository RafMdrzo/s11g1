const express = require('express');
//for session checking
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const loginController = require('../controllers/loginController.js');
const feedController = require('../controllers/feedController.js');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//login
app.get('/login', loginController.getLogIn);

app.post('/login', loginController.postLogIn);

app.get('/', feedController.getPosts);

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
  res.render("profile", {
    avatar_id: "avatar.jpg",
    avatar: 'img/avatar.jpg',

    name: "Eugenio Pastoral",
    username: "@"+req.session.username,
    location: "Manila, Philippines",
    bio: "21-year-old photographer based in the Philippines.",
    status: 0,
    follow: 1,

    posts: [
      {
        post_name: 'post1.jpg'
      },
      {
        post_name: 'landing.jpg'
      },
      {
        post_name: 'landing3.jpg'
      },
      {
        post_name: 'albert.jpg'
      },
      {
        post_name: 'landing1.jpg'
      },
      {
        post_name: 'landing4.jpg'
      },
      {
        post_name: 'raf.jpg'
      },
      {
        post_name: 'landing.jpg'
      },
    ]
  });
});

module.exports = app;
