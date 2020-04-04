const db = require('../models/db.js');
const assert = require('assert');
const mongo = require('mongodb');
// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/folioDB';
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const searchController = {

  getSearch: async function (req, res) {

    // when submitting forms using HTTP POST method
    // the values in the input fields are stored in the req.body object
    // each <input> element is identified using its `name` attribute
    // Example: the value entered in <input type="text" name="fName">
    // can be retrieved using req.body.fName
    var user = req.query.username;
    console.log(user);


    db.findOne(User, {username: user}, 'username fullName', function(result) {
      if(result != null) {
        console.log(result);
        res.send(result);
        console.log(result);
      }
    });
  }
}

// exports the object `signupController` (defined above)
// when another script exports from this file
module.exports = searchController;
