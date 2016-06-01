var mongoose = require('./db.js').mongoose;
var db = require('./db.js').db;

var userSchema = new mongoose.Schema({ 
    name: String,
    password: String,
    email: String
});

exports.User = db.model('user', userSchema);

