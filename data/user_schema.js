var mongoose = require('mongoose'),
	songSchema = require('./song_schema')
	Song = songSchema.songSchema;
	schema = mongoose.Schema,
	userSchema = new schema({
	  name: {type:String, index:1, required:true, unique:true},
	  email: String,
	  password: String,
	  history: [{
	  	updateDate: Date,
	  	numOfListen: Number,
	  	song: {type: schema.Types.ObjectId, ref: 'Song'}
	  }],
	  likes: [{
	  	rateOfLike: Number,
	  	song: {type: schema.Types.ObjectId, ref: 'Song'}
	  }],
	  mixtapes: [{
	  	name: String,
	  	songs: [{type: schema.Types.ObjectId, ref: 'Song'}]
	  }]
	}, {collection: 'users'});

//connect schema to MODEL (MVC) on default conn:
var userModel = mongoose.model('user', userSchema);
module.exports = userModel;
