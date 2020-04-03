$(document).ready(function() {
  $('#follow').click(function() {
    var userFollowing = ($("#handle")).text().substring(1);
    alert(userFollowing);
    $.post('/following', {follow: userFollowing}, function(result) {
      if(result != null) {
        alert(result);
        $('#follow').val("Unfollow");
        $('#follow').attr("id", "unfollow");
      }
      else {
        return;
      }

    });
  });
});
