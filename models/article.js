var mongoose = require('./db.js').mongoose;
var db = require('./db.js').db;

var articleSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    time: String,
    content: String
});

module.exports = db.model('articles', articleSchema);

