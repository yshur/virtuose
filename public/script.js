
function signUpUser() {
  var userUp=$('#userUp').val();
  var emailUp=$('#emailUp').val();
  var passUp=$('#passUp').val();
  $.post("https://virtuoso-music.herokuapp.com/signUpUser",
    {
      name:userUp,
      email:emailUp,
      pass:passUp
    },
    function(data) {
      $(".result").empty();
      $(".result").append(JSON.stringify(data, null, '\t'));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function signInUser() {
  var userIn=$('#userIn').val();
  var emailIn=$('#emailIn').val();
  var passIn=$('#passIn').val();
  $.post("https://virtuoso-music.herokuapp.com/signInUser",
    {
      name:userIn,
      email:emailIn,
      pass:passIn
    },
    function(data) {
      $(".result").empty();
      $(".result").append(JSON.stringify(data, null, '\t'));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function getRandomSongList() {
  $.get("https://virtuoso-music.herokuapp.com/getRandomSongList",
    function(data) {
      $(".result").empty();
      $(".result").append(JSON.stringify(data, null, '\t'));
      console.log("Return data: "+JSON.stringify(data));
    });
};
function pushSongToUserHistory() {
  var user_name=$('#user_name').val();
  var email=$('#email').val();
  var song_name=$('#song_name').val();
  $.post("https://virtuoso-music.herokuapp.com/pushSongToUserHistory",
    {
      user_name: user_name,
      email: email,
      song_name: song_name
    },
    function(data) {
      $(".result").empty();
      $(".result").append(JSON.stringify(data, null, '\t'));
      console.log("Return data: "+JSON.stringify(data));
  });
};
function getSongHistoryList() {
  var user_name=$('#user_name').val();
  var email=$('#email').val();
  $.post("https://virtuoso-music.herokuapp.com/getSongHistoryList",
    {
      user_name: user_name,
      email: email
    },
    function(data) {
      $(".result").empty();
      $(".result").append(JSON.stringify(data, null, '\t'));
      console.log("Return data: "+JSON.stringify(data));
  });
};
