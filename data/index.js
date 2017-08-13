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
                res.status(200).json(newUser);
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
        user.findOne({
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
    var len = 9;
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

exports.pushSongToUserLikes = (req, res) => {
    console.log(`pushSongToUserLikes() :: user_name = ${req.body.user_name}`);
    console.log(`email = ${req.body.email}, song_name = ${req.body.song_name}`);
    var user_name = req.body.user_name ? req.body.user_name : exports.finalize(0,0,res),
        email = req.body.email ? req.body.email : exports.finalize(0,0,res),
        song_name = req.body.song_name ? req.body.song_name : exports.finalize(0,0,res);
    var conditions = {name:user_name, email:email},
        update = {$set:{name:user_name, email:email},
                  $push:{likes:song_name}},
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

exports.getSongLikesList = (req, res) => {
    console.log(`getSongLikesList() :: user_name = ${req.body.user_name}`);
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
            console.log(usr.likes);
            song.find({
                name: { $in: usr.likes }
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

exports.removeSongFromUserLikes = (req, res) => {
    console.log(`removeSongFromUserLikes() :: user_name = ${req.body.user_name}`);
    console.log(`email = ${req.body.email}, song_name = ${req.body.song_name}`);
    var user_name = req.body.user_name ? req.body.user_name : exports.finalize(0,0,res),
        email = req.body.email ? req.body.email : exports.finalize(0,0,res),
        song_name = req.body.song_name ? req.body.song_name : exports.finalize(0,0,res);
    var conditions = {name:user_name, email:email},
        update = {$set:{name:user_name, email:email},
                  $pull:{likes: { $in: [song_name] } }},
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
}
exports.getCompositorSongs = (req, res) => {
    console.log(`getCompositorSongs() :: compositor = ${req.body.compositor}`);
    var compositor = req.body.compositor ? req.body.compositor : exports.finalize(0,0,res);
    song.find({
        compositor: { $eq: compositor }
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
exports.getTagSongs = (req, res) => {
    console.log(`getTagSongs() :: tag = ${req.body.tag}`);
    var tag = req.body.tag ? req.body.tag : exports.finalize(0,0,res);
    song.find({
        tags: { $eq: tag }
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
exports.getAlbumSongs = (req, res) => {
    console.log(`getAlbumSongs() :: album = ${req.body.album}`);
    var album = req.body.album ? req.body.album : exports.finalize(0,0,res);
    song.find({
        album: { $eq: album }
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

// exports.getRandomSongsUser = (req, res) => {
//     //now it returns the history songs only
//     //I dont know now how combine tags of the history with random list
//     console.log(`getRandomSongsUser() :: user_name = ${req.body.user_name}`);
//     console.log(`email = ${req.body.email}`);
//     var user_name = req.body.user_name ? req.body.user_name : exports.finalize(0,0,res),
//         email = req.body.email ? req.body.email : exports.finalize(0,0,res);
//     user.findOne({
//      $and: [{name:{$eq:user_name}}, {email:{$eq:email}} ]
//     }, (err,usr) => {
//         if(err){
//             console.log(`err: ${err}`);
//             res.status(200).json(`{ err : ${err}`);
//         } else {
//             console.log(usr.history);
//             song.find({
//                 name: { $in: usr.history }
//             }, (err,sng) => {
//                 if(err){
//                     console.log(`err: ${err}`);
//                     res.status(200).json(`{ err : ${err}`);
//                 } else {
//                     console.log(sng);
//                      res.status(200).json(sng);
//                     // song.find({
//                     //     tags: { $eq: sng.tags }
//                     // }, (err,tagssong) => {
//                     //     if(err){
//                     //         console.log(`err: ${err}`);
//                     //         res.status(200).json(`{ err : ${err}`);
//                     //     } else {
//                     //         console.log(tagssong); 
//                     //         res.status(200).json(tagssong);
//                     //     }
//                     // });
//                 }
//             });
//         }
//     });        
// }