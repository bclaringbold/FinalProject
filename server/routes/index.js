var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var survey = require('../models/survey');

/* Utility function to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Survey Site',
    displayName: req.user ? req.user.displayName : ''
   });
});


/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Please Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/contacts');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


/* Show Registration Page */

router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'User Registration',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});


/* POST signup data. */

router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/index',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

/* Show Survey List Page */
router.get('/surveylist', requireAuth, function (req, res, next) {

        res.render('surveylist', {
            title: 'Survey Managment',
            displayName: req.user ? req.user.displayName : '',
            username: req.user ? req.user.username : '' 
        });
});

/* Show Survey List Page */
router.get('/surveyresponse/:id', function (req, res, next) {

    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right user
    survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('surveyresponse', {
            title: 'Response to Survey', 
            displayName: req.user ? req.user.displayName : '',
            username: req.user ? req.user.username : '',
            survey: survey

            });
        }
    });
});

/* Show Survey List Page */
router.post('/surveyresponse/:id', function (req, res, next) {
/*
    var user = new User(req.body);
    var hashedPassword = user.generateHash(user.password);
    survey.create({
        email: req.body.email,
        password: hashedPassword,
        displayName: req.body.displayName,
        username: req.body.username,
        provider: 'local',
        created: Date.now(),
        updated: Date.now()
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
    
});*/



});

module.exports = router;
