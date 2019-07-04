const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { currentUser: req.isAuthenticated() });
});

/* POST register. */
router.post('/register', (req, res) => {
	let user = {
		username: req.body.username,
		fName: req.body.fName,
		lName: req.body.lName,
		email: req.body.email
	};

	if (req.body.isAdmin == 'on') {
		user.isAdmin = true;
	}
	User.register(new User(user), req.body.password, (err, user) => {
		if (err) {
			console.log(err.message);

			res.redirect('/');
		} else {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/');
			});
		}
	});
});

/* POST /login */
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/'
	}),
	(req, res) => {
		console.log('Logged in Successfully!');
	}
);

/* GET /logout */
router.get('/logoff', (req, res) => {
	req.logOut();
	console.log('Logged you out!');
	res.redirect('/');
});

module.exports = router;
