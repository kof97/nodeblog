var express = require('express');
var router = express.Router();

// crypto
var crypto = require('crypto'),
    User = require('../models/user.js'),
    Article = require('../models/article.js'),
    markdown = require('markdown').markdown;

router.get('/', function(req, res, next) {
    res.render('index', { 
        title: '好久不见', 
        user: req.session.user
    });
});

router.get('/index', function(req, res, next) {
    if (req.session.user) {
        res.json({ res: "welcome " + req.session.user, user: 0, u: req.session.user });
    } else {
        res.json({ res: "好久不见，要回来了吗？", user: 1, u: req.session.user });
    };
});

/**
 * register operating.
 * 
 * 
 */
router.post('/reg', alreadyLogin);
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
 * post article operating.
 * 
 * 
 */
router.post('/post', function (req, res) {
    var user = req.body.user,
        title = req.body.title,
        content = req.body.content;

    User.findOne({name: user}, function(err, user) {
        if (user) {
            var today = new Date();
            var article = new Article({
                user: user.name,
                title: title,
                time: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay(),
                content: content
            });
            article.save(function(err, article) {
                if (err || !article) {
                    throw 'Error';
                } else {
                    return res.json({ error: "success" });
                }   
            });

        } else {
            return res.json({error: "该用户不存在"});
        };
    });


});

/**
 * article list.
 * 
 * 
 */
router.get('/list', function (req, res) {
    if (req.session.user) {
        Article.find({user: req.session.user}, function(err, article) {
            if (article) {
                return res.json(article);
            } else {
                return res.json({});
            };
        });
    } else {
        return res.json({});
    }; 

});

/**
 * article.
 * 
 * 
 */
router.get('/article/:id', function(req, res) {
    Article.findById(req.params.id, '', { lean: true }, function(err, article) {
        if (article) {
            article.content = markdown.toHTML(article.content);
            return res.json(article);
        } else {
            return res.json({});
        };
    });

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

function notLogin(req, res, next) {
    if (!req.session.user) {
        return res.json({ error: "请先登录" });
    };
    next();
}

function alreadyLogin(req, res, next) {
    if (req.session.user) {
        return res.json({ error: "用户已登录" });
    };
    next();
}

module.exports = router;
