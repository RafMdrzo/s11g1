$(document).ready(function() {
    $(document).on('click', '#follow', function(){
        alert("follow");
      var userFollowing = ($(document).find(".profile-handle")).text.substring(1);
      alert(userFollowing);
      $.post('/following', {follow: userFollow}, function(result) {
        if(result != null) {
          alert(result);
          $('#follow').attr("id", "unfollow");
        }
        else
          return;
      });
    });
  });
  