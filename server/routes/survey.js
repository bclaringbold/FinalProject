var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var survey = require('../models/survey');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

// Create Survey
router.post('/', requireAuth, function(req, res, next){
   survey.create(req.body, function(err, post){
       if (err) {
           return next(err);
       }
       res.json(post);
   }); 
});

// Read All Surveys
router.get('/', requireAuth, function(req, res, next){
   survey.find(function(err, surveys){
       if (err) {
         return next(err);}
       res.json(surveys);
   }); 
});


/* READ /surveys/id */
router.get('/:id', requireAuth, function(req,res, next) {
   survey.findById(req.params.id, function(err,post){
      if(err) {
        return next(err);}
       res.json(post);
   });
});

/* UPDATE /surveys/:id */
router.put('/:id', requireAuth, function(req,res, next){
   survey.findByIdAndUpdate(req.params.id, req.body, function(err, post){
      if(err) {return next(err);}
       res.json(post);
   }); 
});

/* DELETE /surveys/:id */
router.delete('/:id', requireAuth, function(req,res,next){
   survey.findByIdAndRemove(req.params.id, req.body, function(err,post){
      if(err) {return next(err);}
       res.json(post);
   });
});


module.exports = router;