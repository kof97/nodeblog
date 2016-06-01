var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '好久不见' });
});

/**
 * register view.
 * 
 * 
 */
router.get('/reg', function(req, res) {
    res.render('reg', { title: '用户注册' });
});

/**
 * register operating.
 * 
 * 
 */
router.post('/reg', function(req, res) {

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
