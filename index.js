const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const typed = require('typed.js');

const port = process.env.PORT || 9090;
const app = express();
const path = require('path');
const profileRouter = require('./routes/profile');
const feedRouter = require('./routes/feed');


const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static('public'));


app.use('/', routes);




app.listen(port, function()
{
    console.log('listening at port ' + port);
});
