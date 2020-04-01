const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/User.js');
const Post = require('../models/Post.js');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const postController = {
    postAddPost: async function (req, res){
        var query = {username: req.session.username};
        //post contents
        var desc = req.body.descriptor ;
        var post_title = req.post_title;
        var picEncoded = req.body.upload;

        if(picEncoded != null)
        {
            var pic = JSON.parse(picEncoded);
            if(pic != null && imageMimeTypes.includes(pic.type))
            {
                var dat = new Buffer.from(pic.data, 'base64');
                var dattype = pic.type;

                db.insertOne(Post, 
                    {
                        postpic: dat,
                        imgType: dattype,
                        title: post_title,
                        description: desc,
                        user: re.session.username
                    });
                res.redirect('/home');
            } else {
                db.insertOne(Post,
                    {
                        user: req.session.username,
                        title: post_title,
                        postpic: null,
                        description: desc,
                        imgType: ""

                    } );
                res.redirect('/home');
            }
            
        }
        else 
        {
            res.send(500 + "Error in handling data");
        }
    } /*,
    postEdit: async function (req, res){
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
        
    } */
};

module.exports = registerController;