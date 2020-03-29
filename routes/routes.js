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
});

app.post('/auth', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username == "eugeniopastoral") {
    if(password == "helloworld") {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/home');
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

app.get("/home", function(req, res)
{
  res.render("home", {});
});

module.exports = app;
