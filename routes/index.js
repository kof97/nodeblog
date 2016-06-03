var express = require('express');
var router = express.Router();

// crypto
var crypto = require('crypto'),
    User = require('../models/user.js');

router.get('/', function(req, res, next) {
    res.render('index', { 
        title: '好久不见', 
        user: req.session.user
    });
});

router.get('/index', function(req, res, next) {
    if (req.session.user) {
        res.json({ res: "welcome " + req.session.user });
    } else {
        res.json({ res: "主页" });
    };
});

/**
 * register operating.
 * 
 * 
 */
router.post('/reg', function(req, res) {
    var name = req.body.name,
        password = req.body.password,
        passwordRepeat = req.body.passwordRepeat,
        email = req.body.email;

    if (password != passwordRepeat) {
        return res.json({ error: "两次密码不一致" });
    };

    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    // question
    User.find({ name: name }, function(err, user) {
        if (user.length > 0) {
            // console.log(user.length);
            return res.json({ error: "用户已存在" });
        } else {
            var user = new User({
                name: name,
                password: password,
                email: email
            });
            user.save(function(err, user) {
                if (err || !user) {
                    throw 'Error';
                } else {
                    req.session.user = user.name;
                    return res.json({ error: "success" });
                }   
                
            });
        };
    });

});

/**
 * login operating.
 * 
 * 
 */
router.post('/login', function(req, res) {
    var name = req.body.name,
        password = req.body.password;

    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    User.findOne({name: name, password: password}, function(err, user) {
        if (user) {
            req.session.user = user.name;
            return res.json({error: "success"});
        } else {
            return res.json({error: "用户名或密码错误"});
        };
    });

});

/**
 * post article view.
 * 
 * 
 */
router.get('/post', function (req, res) {
    res.render('post', { title: '发表文章' });
});

/**
 * post article operating.
 * 
 * 
 */
router.post('/post', function (req, res) {

});

/**
 * logout.
 * 
 * 
 */
router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
