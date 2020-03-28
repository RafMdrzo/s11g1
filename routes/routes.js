const express = require('express');
const app = express();



app.get("/", function(req, res)
{
  res.render("face", {});
});

app.get("/user/:username", function(req, res)
{
  res.render("profile", {avatar_id: "avatar"});
});


app.get("/home", function(req, res)
{
  res.render("home", {});
});

module.exports = app;
