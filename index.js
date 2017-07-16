const express = require ('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 3000,
      data = require('./data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/includes', express.static(`${__dirname}/public`));
app.use( (req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/signUpUser',data.signUpUser);
app.post('/signInUser',data.signInUser);
app.get('/getRandomSongList',data.getRandomSongList);
app.post('/pushSongToUserHistory',data.pushSongToUserHistory);
app.post('/getSongHistoryList',data.getSongHistoryList);

// app.post('/getRandomSongsUser',data.getRandomSongsUser);
// app.post('/getCompositorSongs',data.getCompositorSongs);
// app.post('/getTagSongs',data.getTagSongs);
// app.post('/getAlbumSongs',data.getAlbumSongs);
// app.post('/pushSongToUserLikes',data.pushSongToUserLikes);
// app.post('/removeSongFromUserLikes',data.removeSongFromUserLikes);
// app.post('/getSongLikesList',data.getSongLikesList);


app.all('*', (req, res, next) => {
  console.log("runs for all HTTP verbs first");
  next();
});

app.get('/', (req,res) => {
  console.log(`__dirname: ${__dirname}`);
  res.sendFile(`${__dirname}/index.html`);
  });

app.all('*', function(req, res) {
  var error = {"error":"item not found"};
  res.status(200).json(error);
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
