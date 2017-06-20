const consts = require('./consts'),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);
const conn = mongoose.connection;//get default connection
//ref to MODEL
var Song = require('./song_schema');

conn.on('error', (err) => {
  console.log(`connection error: ${err}`);
});
conn.once('open', () => {
  var newSong = new Song({
    name: "1. Kyrie",
    length: "04:10",
    compositor: "Johann Sebastian Bach",
    performer: "",
    image: "https://images-na.ssl-images-amazon.com/images/I/61kE6E%2BJSKL.jpg",
    voice: "http://imslp.nl/imglnks/usimg/3/35/IMSLP105659-PMLP04197-S001-02-128k.mp3",
    tags: ["Piano", "Cello", "Orchestra", "Religious", "Bach"],
    album: "Mass in B minor"
  	});
  newSong.save((err) => {
    if(err) console.log(`err: ${err}`);
    else {
      console.log(`Saved document: ${newSong}`);
      mongoose.disconnect();
    }
  })
  console.log(`Is document new? ${newSong.isNew}`);  
});