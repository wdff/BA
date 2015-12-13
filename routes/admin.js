var express  = require('express');
var router   = express.Router();
var DBuser   = require('../models/users.js');
var problems = require('../models/problems.js');
var user     = require('../routes/users.js');

router.get('/', function(req, res) {
  if (req.user && req.user.role == 'admin') {

    DBuser.count({ role: 'student' }, function(err, studCount) {
      if (err) {console.dir(err);}
      problems.count({ finished: 'true' }, function(err, probCount) {
        if (err) {console.dir(err);}
        res.render('admin', { title: 'Admin', user: req.user, studentCount: studCount, problemCount: probCount });
      })
    })


  } else { // not logged in
    res.render('customerror', { title: "Error", errMsg1: "error.error", errMsg2: "error.notLoggedIn" });
}
});


router.get('/userstats/', function(req, res) {               // TODO if (user/admin)
  DBuser.find({ role: 'student' }, function (err, users) {
    if (err) console.dir(err);
    res.render('userstats', {title: "User Stats", userNames: users, user: req.user});

  })

});

router.get('/userstats/:id', function(req, res) {
  console.log('userstats id ' + req.params.id);
  user.getUserStats(req, res, req.params.id);
});


module.exports = router;