const User = require('../models/user');
const Todo = require('../models/todo');

module.exports = {
	//CREATE NEW TODO
	todoNew(req, res) {
		User.findById(req.user.id, (err, user) => {
			if (err) {
				console.log(err);
			} else {
				Todo.create(req.body, (err, todo) => {
					if (err) {
						console.log(err);
						res.send('User not found');
					}
					{
						todo.target.id = req.user._id;
						todo.target.username = req.user.username;
						todo.text = req.body.text;
						todo.save();
						console.log(todo);
						user.todos.push(todo);
						user.save();
					}
				});
			}
		});
		res.redirect('/');
	}
};
