$(document).ready(function() {
  $('#follow').click(function() {
    var userFollowing = ($("#handle")).text().substring(1);
    $.post('/following', {follow: userFollowing}, function(result) {
      if(result != null) {
        $('#follow').val("Unfollow");
        $('#follow').attr("id", "unfollow");
      }
      else {
        return;
      }
    });
  });

  $('#unfollow').click(function() {
    var userFollowing = ($("#handle")).text().substring(1);
    $.post('/unfollowing', {follow: userFollowing}, function(result) {
      if(result != null) {
        $('#unfollow').val("Follow");
        $('#unfollow').attr("id", "follow");
      }
      else {
        return;
      }
    });
  });
});
