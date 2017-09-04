const consts = require('./consts'),
    mongoose = require('mongoose');

var songSchema = require('./song_schema');
var Song = songSchema.songModel;
mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);
const conn = mongoose.connection;//get default connection
//ref to MODEL
var User = require('./user_schema');

conn.on('error', (err) => {
  console.log(`connection error: ${err}`);
});
conn.once('open', () => {
  Song.findOne({ 'name': '1. Kyrie' }, function (err, song) {
  if (err) return handleError(err);
  console.log(song); // Space Ghost is a talk show host.

  var newUser = new User({
	  name: "yair",
	  email: "yair.shur@gmail.com",
	  password: "1234",
    history: [{
      updateDate: Date.now(),
      numOfListen: 1,
      song: song
    }],
    likes: [{
      rateOfLike: 1,
      song: song
    }],
    mixtapes: [{
      name: 'haha',
      songs: [song]
    }]    
  	});
  newUser.save((err) => {
    if(err) console.log(`err: ${err}`);
    else {
      console.log(`Saved document: ${newUser}`);
      mongoose.disconnect();
    }
  })
  console.log(`Is document new? ${newUser.isNew}`); 

  });
 
});