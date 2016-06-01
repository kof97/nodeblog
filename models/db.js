var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'nodeblog');

module.exports = { mongoose: mongoose, db: db };