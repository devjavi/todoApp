const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { asyncErrorHandler, isLoggedIn, isAdmin } = require('../middleware/index');
const { uRegister, uLogin, uLogout } = require('../controllers/index');
const { todoNew } = require('../controllers/todo');

/* GET home/show page. */
router.get('/', (req, res, next) => {
	if (req.isAuthenticated()) {
		User.findById(req.user.id).populate('todos').exec((err, foundUser) => {
			if (err) {
				console.log(err);
			} else {
				res.render('index', { currentUser: foundUser });
			}
		});
	} else {
		res.render('index', { currentUser: req.user });
	}
});

/* POST register. */
router.post('/register', asyncErrorHandler(uRegister));

/* POST /login */
router.post('/login', uLogin);

/* GET /logout */
router.get('/logout', isLoggedIn, uLogout);

/* POST /user.todos */
router.post('/newtodo', isLoggedIn, asyncErrorHandler(todoNew));

module.exports = router;
