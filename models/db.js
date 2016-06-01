var setting = require('../setting.js');

var mongoose = require('mongoose');

var db = mongoose.createConnection(setting.host, setting.db);

module.exports = { mongoose: mongoose, db: db };