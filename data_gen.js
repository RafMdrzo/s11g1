const db = require('./models/db.js');

const collection = ['Users', 'ProfilePic', 'Posts', 'Comments', 'Followers', 'Tags', 'Images'];

db.createDatabase();

for (let i =0; i < collection.length; i++)
{
    db.createCollection(collection[i]);
}