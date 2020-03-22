const express = require('express');
const port = process.env.PORT || 9090;
const hbs = require('hbs');
const app = express();
const path = require('path');

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static('public'));


app.get("/", function(req, res)
{
       res.render("face", {});
});

app.get("/profile", function(req, res)
{
       res.render("profile", {});
});


app.get("/home", function(req, res)
{
       res.render("home", {});
});

app.listen(port, function()
{
    console.log('listening at port ' + port);
});
