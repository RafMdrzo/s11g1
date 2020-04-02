const express = require('express');
//for session checking
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const assert = require('assert');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');
const postController = require('../controllers/postController.js');
const profileController = require('../controllers/profileController.js');
const commentController = require('../controllers/commentController.js');

app.use(session({
  cookieName:'session',
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//login
app.get("/",loginController.getLogIn);

app.post('/home', loginController.postLogIn);
app.post('/register', registerController.postRegister);

//registration
app.get('/registerBioLoc', registerController.getBioLoc);
app.get('/registerAvatar', registerController.getAvatar)

app.post('/registerBioLoc', registerController.postBioLoc);
app.post('/registerAvatar', registerController.postAvatar);

//posting
app.post('/postprocessing', postController.postAddPost);
app.get('/home', postController.getHome);

//commenting

app.post('/addcomment', commentController.postAddComment);


//logout
app.get('/logout', function(req, res) {

  req.session.destroy((err) => {

    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

app.get("/profile", profileController.getSelfProfile);
app.get("/:username", profileController.getUserProfile);


module.exports = app;
