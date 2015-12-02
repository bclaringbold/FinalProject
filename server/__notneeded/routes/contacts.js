var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var Contacts = require('../models/contacts');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* Render Contacts main page. With sort on Display Name*/
router.get('/', requireAuth, function (req, res, next) {
    Contacts.find({}, null, {sort: {displayName: 1}}, function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contacts/index', {
                title: 'Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* Render Contacts main page. 
router.get('/', requireAuth, function (req, res, next) {
    Contacts.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contacts/index', {
                title: 'Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});*/


/* Render the Add Contacts Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('contacts/add', {
        title: 'Contacts',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new user */
router.post('/add', requireAuth, function (req, res, next) {
    Contacts.create({
        email: req.body.email,
        displayName: req.body.displayName,
        contactNumber: req.body.contactNumber,
        created: Date.now(),
        updated: Date.now()
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

/* Render the Contacts Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right user
    Contacts.findById(id, function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('contacts/edit', {
                title: 'Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var contacts = new Contacts(req.body);
    contacts._id = id;
    contacts.updated = Date.now();
    
    // use mongoose to do the update
    Contacts.update({ _id: id }, contacts, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

/* run delete on the selected user */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Contacts.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

module.exports = router;