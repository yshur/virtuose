var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	songSchema = new schema({
	  name: {type:String, index:1, required:true, unique:true},
	  length: String,
	  compositor: {type:String, index:1},
	  image: String,
	  voice: String,
	  tags: [String],
	  album: {type:String, index:1},
	  numOfListen: Number
	}, {collection: 'songs'});

//connect schema to MODEL (MVC) on default conn:
exports.songModel = mongoose.model('song', songSchema);
exports.songSchema = songSchema;
