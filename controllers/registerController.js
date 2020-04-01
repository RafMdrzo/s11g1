const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const registerController = {
    postRegister: async function(req, res){
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
                location : "",
                avatar: null,
                imgType: ""
            } );

            res.redirect('/registerBioLoc?username=' + reqUsername);
    },
    postBioLoc: async function (req, res){
        var filter = {username: req.query.username};

        var reqBio = req.body.bio_assign;
        var reqLoc = req.body.loc_assign;

        var projection = 'bio location';
        db.updateOne(User, filter, 
            {
                bio: reqBio,
                location: reqLoc
            });
        
        res.redirect('/registerAvatar?username=' + req.query.username);

    },
    postAvatar: async function (req, res){
        var filter = {username: req.query.username};
        var picEncoded = req.body.upload;

        if(picEncoded != null)
        {
            var pic = JSON.parse(picEncoded);
            if(pic != null && imageMimeTypes.includes(pic.type))
            {
                var dat = new Buffer.from(pic.data, 'base64');
                var dattype = pic.type;

                db.updateOne(User, filter, 
                    {
                        avatar: dat,
                        imgType: dattype
                    });
                res.redirect('/');
            }
            
        }
        else 
        {
            res.send(500 + "Error in handling data");
        }
    },
    getBioLoc: function(req, res){
        res.render('reg_landing',{layout: false});
    },
    getAvatar: function(req, res){
        res.render('reg_avatar',{layout: false});
    }
};

module.exports = registerController;