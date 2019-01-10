const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const Registration = mongoose.model('Registration');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
});

router.get('/Login', (req, res) => {
    res.render('login', { title: 'Login form', pageHeader: 'Login Page' });

});

router.post('/Welcome', (req, res) => {
    let logIn = req.body;

    Registration.find({ "$query": { name: logIn.nameLogin } })
    
    
        .then((registrations) => {
            console.log(registrations[0]);
            let registered = registrations[0];
            // Load hash from your password DB.
            bcrypt.compare(logIn.passwordLogin, registered.password, function (err, res) {
                if (res === true) {
                    console.log("test");
                   
                }
            });
            res.render('welcome', { title: 'Login form', registered, logIn, pageHeader: 'Your Page' });
                    })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
   

});

router.get('/', (req, res) => {
    res.render('layout', { title: 'Hello', pageHeader: 'Welcome to our site' });
});

router.get('/form', (req, res) => {
    res.render('form', { title: 'registration', pageHeader: 'Registration' });
});

router.post('/',

    [
        body('name')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        body('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an email'),
        body('password')
            .isLength({ min: 1 })
            .withMessage('Please enter an password'),
        body('passwordConf')
            .isLength({ min: 1 })
            .withMessage('Please enter an passwordConf')
    ],
    
    (req, res) => {

        // Create a password salt
            var salt = bcrypt.genSaltSync(10);

            // Salt and hash password
            var newPassword = bcrypt.hashSync(req.body.password, salt);

            const errors = validationResult(req);

            req.body.password = newPassword;

            if (errors.isEmpty()) {

                let registration = new Registration(req.body);

                registration.save()
                    .then(() => { res.send('Thank you for your registration!'); })
                    .catch(() => { res.send('Sorry! Something went wrong.'); });
            }
            else {
                res.render('form', {
                    title: 'Registration form',
                    errors: errors.array(),
                    data: req.body
                });
            }
        }

);



router.get('/registrations', auth.connect(basic), (req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('index', { title: 'Listing registrations', registrations });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/:id/delete', (req, res) => {
    console.log(req.body);
    Registration.findByIdAndDelete(req.params.id, function (err) {
        if (err) return next(err);
        res.render('delete');
    });
});

router.get('/test', (req, res) => {
    res.render('test', { title: 'Test', pageHeader: 'Welcome to our site' });
});



module.exports = router;


