const passport = require('passport');
const User = require('../models/user');

module.exports = {
	async uRegister(req, res) {
		let newUser = {
			username: req.body.username,
			fName: req.body.fName,
			lName: req.body.lName
			//lead: req.body.lead
		};

		await User.register(newUser, req.body.password, (err, user) => {
			if (err) {
				console.log(err.message);
				res.render('error', { error: err, message: err.message });
			} else if (req.body.isAdmin == 'on') {
				user.roles.admin = true;
				user.save();
				passport.authenticate('local')(req, res, () => {
					res.redirect('/');
				});
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
