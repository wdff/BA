var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('tips-front', {user: req.user, title: 'Tips'});
});

router.get('/addition', function(req, res) {
  res.render('tips-addition', {user: req.user});
});

router.get('/addition/:number', function(req, res) {
  res.render('tips/add/add' + req.params.number);
});

router.get('/subtraction', function(req, res) {
  res.render('tips-subtraction', {user: req.user});
});

router.get('/subtraction/:number', function(req, res) {
  res.render('tips/sub/sub' + req.params.number);
});

router.get('/multiplication', function(req, res) {
  res.render('tips-multiplication', {user: req.user});
});

router.get('/multiplication/:number', function(req, res) {
  res.render('tips/mul/mul' + req.params.number);
});

router.get('/division', function(req, res) {
  res.render('tips-division', {user: req.user});
});

router.get('/division/:number', function(req, res) {
  res.render('tips/div/div' + req.params.number);
});

router.get('/fraction', function(req, res) {
  res.render('tips-frac', {user: req.user});
});

router.get('/fraction/:number', function(req, res) {
  res.render('tips/frac/frac' + req.params.number);
});

router.get('/sqrt', function(req, res) {
  res.render('tips-sqrt', {user: req.user});
});

router.get('/sqrt/:number', function(req, res) {
  res.render('tips/sqrt/sqrt' + req.params.number);
});

module.exports = router;