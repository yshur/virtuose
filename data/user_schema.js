var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	userSchema = new schema({
	  name: {type:String, index:1, required:true, unique:true},
	  email: String,
	  password: String,
	  history: [String],
	  likes: [String]
	}, {collection: 'users'});

//connect schema to MODEL (MVC) on default conn:
var userModel = mongoose.model('user', userSchema);
module.exports = userModel;