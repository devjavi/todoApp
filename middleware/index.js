const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
	asyncErrorHandler: (fn) => (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	},
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/');
			alert('not logged in');
		}
	},
	async isAdmin(req, res, next) {
		let user = await User.findById(req.user.id, function(err, user) {
			if (err) {
				console.log(err);
			} else {
				return user.isAdmin;
			}
		});
		if (user.isAdmin) {
			next();
		} else {
			res.send('nope');
		}
		req, res, next;
	}
};
