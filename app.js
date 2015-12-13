var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var i18n = require('i18next');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var hash = require('./helpers/hash.js');
var config = require('./config/config.js');


var users = require('./models/users'); // USER DB
/*
 i18n.init({

 debug: true,
 detectLngQS: 'lang',
 cookieName: 'lang',
 fallbackLng: 'en',
 preload: 'de',
 lowerCaseLng: true,
 resGetPath: 'locales/__lng__-__ns__.json'
 // useLocalStorage: true  // turn on on production
 //localStorageExpirationTime: 86400000 //in ms = 1 day

 });

 */


var app = express();


var user      = require('./routes/users');  // USER ROUTE
var routes    = require('./routes/index');
var training  = require('./routes/training');
var admin     = require('./routes/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

i18n.serveClientScript(app).serveDynamicResources(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(i18n.handle);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
      secret: 'mctIsTheBest',
      saveUninitialized: true,
      resave: false })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
          passReqToCallback: false
        },
        function(username, password, done) {

            //username = username.body.username;
            //password = username.body.password;

          var hashedPassword;
          ////////////////////////////////////////////////////////////////////////////
          hash(password, config.SALT, function(err, result) {
            if (err) {
              console.log(err);
            }
            else {
              hashedPassword = result.toString('hex');
              password = hashedPassword;
              ////////////////////////////////////////////////////////////////////////
              process.nextTick(function () {
                users.findOne({
                  'username': username
                }, function (err, user) {
                  if (err) {
                    console.dir(err);
                    return done(err);
                  }
                  if (!user) {
                    return done(null, false, {message: 'Incorrect Username'});
                  }
                  if (user.password != password) {
                    return done(null, false, {message: 'Incorrect Password'});
                  }
                  return done(null, user);
                });
              });

            }

          })
        })
);








app.use('/', routes);
app.use('/users', user);
app.use('/training', training);
app.use('/admin', admin);

//i18n.registerAppHelper(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
