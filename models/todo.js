const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	target: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	text: String
});

module.exports = mongoose.model('User', userSchema);
