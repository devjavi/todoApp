const passport = require('passport');
const User = require('../models/user');

module.exports = {
	async uRegister(req, res) {
		let newUser = {
			username: req.body.username,
			fName: req.body.fName,
			lName: req.body.lName,
			email: req.body.email
		};

		if (req.body.isAdmin == 'on') {
			newUser.isAdmin = true;
		}
		await User.register(newUser, req.body.password, (err, user) => {
			if (err) {
				console.log(err.message);

				res.render('error', { error: err, message: err.message });
			} else {
				passport.authenticate('local')(req, res, () => {
					res.redirect('/');
				});
			}
		});
	},
	uLogin(req, res, next) {
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/'
		})(req, res, next);
	},
	uLogout(req, res) {
		req.logOut();
		console.log('Logged you out!');
		res.redirect('/');
	}
};
