var express = require('express');
var router = express.Router();

// crypto 生成散列哈希值
var crypto = require('crypto'),
    User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '好久不见', user: req.session.user });
});

/**
 * register view.
 * 
 * 
 */
router.get('/reg', function(req, res) {
    res.render('reg', { title: '用户注册', error: req.flash('error') });
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
        req.flash('error', '两次输入的密码不一致!'); 
        return res.redirect('/reg');
    };

    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    // question
    User.find({ name: name }, function(err, user) {
        console.log(user.length);
        if (user.length > 0) {
            // req.flash('error', '用户已存在!');
            // return res.redirect('back');
            return res.render('reg', { title: '用户注册', error: '用户已存在!' });
        };
    });

    var user = new User({
        name: name,
        password: password,
        email: email
    });
    user.save(function(err, user) {
        if (err) {
            req.flash('error', '注册失败!');
            return res.redirect('/reg');
        };

        req.session.user = user.name;//用户信息存入 session
        req.flash('success', '注册成功!');
        res.redirect('/');//注册成功后返回主页
    });




//    req.flash('error', password); return res.redirect('/reg');
    

});

/**
 * login view.
 * 
 * 
 */
router.get('/login', function(req, res) {
    res.render('login', { title: '用户登录' });
});

/**
 * login operating.
 * 
 * 
 */
router.post('/login', function(req, res) {

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

});

module.exports = router;
