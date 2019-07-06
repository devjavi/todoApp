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
						user.todos.push(todo);
						user.save();
					}
				});
			}
		});
		res.redirect('/');
	},
	todoKill(req, res) {
		Todo.findByIdAndDelete(req.params.todo_id, (err) => {
			if (err) {
				console.log(err);
				res.render('error', { error: err });
			} else {
				User.findById(req.params.user_id, (err, user) => {
					if (err) {
						console.log(err);
						res.render('error', { error: err });
					} else {
						console.log(req.params.todo_id);
						user.todos.remove(req.params.todo_id);
						user.save();
					}
				});
				res.redirect('/');
			}
		});
	}
};
