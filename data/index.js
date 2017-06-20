'use strice';

const consts = require('./consts'),
	mongoose = require('mongoose'),
	user = require('./user_schema'),
    song = require('./song_schema'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

mongoose.connect(consts.MLAB_KEY,options);

exports.signUpUser = (req, res) => {
	console.log(`signUpUser() :: name = ${req.body.name}`);
    console.log(`email = ${req.body.email}, pass = ${req.body.pass}`);
    var name = req.body.name ? req.body.name : exports.finalize(0,0,res) ,
        email = req.body.email ? req.body.email : exports.finalize(0,0,res) ,
        pass = req.body.pass ? req.body.pass : exports.finalize(0,0,res) ,
        newUser = new user({
            name : name,
            email : email,
            password : pass,
            history : [],
            likes : []
        });
    newUser.save(
        (err) => {
            if(err) {
                res.status(200).json({ "err" : `${err}` });
                return;
            }
            else {
                res.status(200).json({"ok":`document saved ${newUser}`});
                console.log(`Saved document: ${newUser}`);
            }
        }
    );
};

exports.signInUser = (req, res) => {
    console.log(`signInUser() :: name = ${req.body.name}`);
    console.log(`email = ${req.body.email}, pass = ${req.body.pass}`);
    var name = req.body.name ? req.body.name : exports.finalize(0,0,res) ,
        email = req.body.email ? req.body.email : exports.finalize(0,0,res) ,
        pass = req.body.pass ? req.body.pass : exports.finalize(0,0,res); 
        user.find({
         $and: [{name:{$eq:name}}, {email:{$eq:email}}, {password:{$eq:pass}} ]
        }, (err,usr) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            } else {
                console.log(usr);
                res.status(200).json(usr);
            }
        });
};

exports.getRandomSongList = (req, res) => {
    var len = 16;
    console.log(`getRandomSongList() :: list of ${len} random songs`);
    // Get len random documents from the songs collection.
    song.aggregate(
     { $sample: { size: len } }, (err,sng) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            } else {
                console.log(sng);
                res.status(200).json(sng);
            }
        });
};	

exports.pushSongToUserHistory = (req, res) => {
    console.log(`pushSongToUserHistory() :: user_name = ${req.body.user_name}`);
    console.log(`email = ${req.body.email}, song_name = ${req.body.song_name}`);
    var user_name = req.body.user_name ? req.body.user_name : exports.finalize(0,0,res),
        email = req.body.email ? req.body.email : exports.finalize(0,0,res),
        song_name = req.body.song_name ? req.body.song_name : exports.finalize(0,0,res);
    var conditions = {name:user_name, email:email},
        update = {$set:{name:user_name, email:email},
                  $push:{history:song_name}},
        opts = {multi:true};
    user.update(conditions, update, opts, (err, usr) => {
        if(err){
            console.log(`err: ${err}`);
            res.status(200).json(`{ err : ${err}`);
        } else {
            console.log(`Updated document: ${usr}`);
            res.status(200).json(usr);    
      }
   });
};

exports.getSongHistoryList = (req, res) => {
    console.log(`getSongHistoryList() :: user_name = ${req.body.user_name}`);
    console.log(`email = ${req.body.email}`);
    var user_name = req.body.user_name ? req.body.user_name : exports.finalize(0,0,res),
        email = req.body.email ? req.body.email : exports.finalize(0,0,res);
    user.findOne({
     $and: [{name:{$eq:user_name}}, {email:{$eq:email}} ]
    }, (err,usr) => {
        if(err){
            console.log(`err: ${err}`);
            res.status(200).json(`{ err : ${err}`);
        } else {
            console.log(usr.history);
            song.find({
                name: { $in: usr.history }
            }, (err,sng) => {
                if(err){
                    console.log(`err: ${err}`);
                    res.status(200).json(`{ err : ${err}`);
                } else {
                    console.log(sng);
                    res.status(200).json(sng);
                }
            });
        }
    });
};  
