var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var survey = require('../models/survey');
var Response = require('../models/response');

/* Render Responses main page. */
router.get('/', function(req, res, next) {
  res.render('responses/index', { 
    title: 'Response',
    displayName: req.user ? req.user.displayName : ''
   });
});


/* Show Survey List Page */
router.get('/:id', function (req, res, next) {

    // create an id variable
    var id = req.params.id
    
    // use mongoose and our model to find the right user
    survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
                if (survey.active == false) {
                    res.redirect('/');
                }
                
                else {
                    //show the edit view
                    res.render('responses/response', {
                    title: 'Respond to Survey', 
                    displayName: req.user ? req.user.displayName : '',
                    username: req.user ? req.user.username : '',
                    survey: survey

                });
              } 
           
        }
    });
});

/* process the submission of a new response */
router.post('/:id', function (req, res, next) {
    //var response = new Response(req.body);
    
    Response.create({
       name: req.body.name,
	   surveyid: req.body.surveyid,
	   questions: req.body.questions,
       multiplechoice: req.body.multiplechoice,
	   answerq01: req.body.answerq01,
	   answerq02: req.body.answerq02,
	   answerq03: req.body.answerq03,
	   answerq04: req.body.answerq04,
	   answerq05: req.body.answerq05,
	   answerq06: req.body.answerq06,
	   answerq07: req.body.answerq07,
	   answerq08: req.body.answerq08,
	   answerq09: req.body.answerq09,
	   answerq10: req.body.answerq10,
       created: Date.now(),
    }, function (err, Response) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');
        }
    });
    
});

module.exports = router;