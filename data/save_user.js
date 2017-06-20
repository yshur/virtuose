const consts = require('./consts'),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);
const conn = mongoose.connection;//get default connection
//ref to MODEL
var User = require('./user_schema');

conn.on('error', (err) => {
  console.log(`connection error: ${err}`);
});
conn.once('open', () => {
  var newUser = new User({
	  name: "Idan",
	  email: "yair.shur@gmail.com",
	  password: "1234",
	  history: [],
	  likes: [] 
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