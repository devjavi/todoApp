const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	usermane: String,
	fName: String,
	lName: String,
	isAdmin: { type: Boolean, default: false },
	todos: {
		type: Schema.Types.ObjectId,
		ref: 'Todo'
	}
});

module.exports = mongoose.model('User', userSchema);
