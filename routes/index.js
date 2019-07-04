const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { asyncErrorHandler, isLoggedIn, isAdmin } = require('../middleware/index');
const { uRegister, uLogin, uLogout } = require('../controllers/index');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { currentUser: req.isAuthenticated() });
});

/* POST register. */
router.post('/register', asyncErrorHandler(uRegister));

/* POST /login */
router.post('/login', uLogin);

/* GET /logout */
router.get('/logout', isLoggedIn, uLogout);

//TEST ROUTE
router.get('/admin', isAdmin, (req, res, next) => {
	res.send('You rock! Congratulations on the admin role');
});

module.exports = router;
