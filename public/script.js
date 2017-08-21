
function signUpUser() {
  var userUp=$('#userUp').val();
  var emailUp=$('#emailUp').val();
  var passUp=$('#passUp').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/signUpUser/",
    {
      name:userUp,
      email:emailUp,
      pass:passUp
    },
    function(data) {
      $(".result1").empty();
      $(".result1").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function signInUser() {
  var userIn=$('#userIn').val();
  var emailIn=$('#emailIn').val();
  var passIn=$('#passIn').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/signInUser/",
    {
      name:userIn,
      email:emailIn,
      pass:passIn
    },
    function(data) {
      $(".result2").empty();
      $(".result2").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function getRandomSongList() {
  $.get("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/getRandomSongList/",
    function(data) {
      $(".result3").empty();
      $(".result3").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
    });
};
function pushSongToUserHistory() {
  var user_name=$('#user_name').val();
  var email=$('#email').val();
  var song_name=$('#song_name').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/pushSongToUserHistory/",
    {
      user_name: user_name,
      email: email,
      song_name: song_name
    },
    function(data) {
      $(".result4").empty();
      $(".result4").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function getSongHistoryList() {
  var user_name=$('#user_name').val();
  var email=$('#email').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/getSongHistoryList/",
    {
      user_name: user_name,
      email: email
    },
    function(data) {
      $(".result5").empty();
      $(".result5").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};

function pushSongToUserLikes() {
  var user_name=$('#user_name1').val();
  var email=$('#email1').val();
  var song_name=$('#song_name1').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/pushSongToUserLikes/",
    {
      user_name: user_name,
      email: email,
      song_name: song_name
    },
    function(data) {
      $(".result6").empty();
      $(".result6").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function removeSongFromUserLikes() {
  var user_name=$('#user_name2').val();
  var email=$('#email2').val();
  var song_name=$('#song_name2').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/removeSongFromUserLikes/",
    {
      user_name: user_name,
      email: email,
      song_name: song_name
    },
    function(data) {
      $(".result7").empty();
      $(".result7").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};

function getSongLikesList() {
  var user_name=$('#user_name3').val();
  var email=$('#email3').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/getSongLikesList/",
    {
      user_name: user_name,
      email: email
    },
    function(data) {
      $(".result8").empty();
      $(".result8").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};

function getCompositorSongs() {
  var compositor=$('#compositor1').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/getCompositorSongs/",
    {
      compositor: compositor
    },
    function(data) {
      $(".result9").empty();
      $(".result9").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function getTagSongs() {
  var tag=$('#tag1').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/getTagSongs/",
    {
      tag: tag
    },
    function(data) {
      $(".resultA").empty();
      $(".resultA").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function getAlbumSongs() {
  var album=$('#album1').val();
  $.post("http://virtuose-load-balancer-936867685.us-west-2.elb.amazonaws.com/getAlbumSongs/",
    {
      album: album
    },
    function(data) {
      $(".resultB").empty();
      $(".resultB").append(JSON.stringify(data));
      console.log("Return data: "+JSON.stringify(data));
  });
};

