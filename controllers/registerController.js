const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');


const registerController = {
    postRegister: function(req, res){
        var reqName = req.body.fullName_;
        var reqUsername = req.body.userName_;
        var reqEmail = req.body.email_;
        var reqPw = req.body.pw_;

       

        db.insertOne(User,
            {
                fullName: reqName,
                username : reqUsername,
                email : reqEmail,
                password : reqPw,
                emailConf: false,
                bio : "",
                location : ""
            } );
    }
};

module.exports = registerController;