const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	username: String,
	fName: String,
	lName: String,
	todos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Todo'
		}
	]
});

userSchema.pre('remove', async function() {
	await Todo.findByIdAndDelete({
		_id: {
			$in: this.todos
		}
	});
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
