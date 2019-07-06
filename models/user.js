const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	fName: String,
	lName: String,
	email: String,
	isAdmin: { type: Boolean, default: false },
	todos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Todo'
		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
