$(document).ready(function() {
  $('#unliked').click(function() {
    var post_id = ($(this).attr("class")).substring(1);
    $.post('/likepost', {post_id: post_id}, function(result) {
      if(result != null) {
        $('#unlikedpic').attr("src", "img/heart2.png");
        $('#unlikedpic').attr("id", "likedpic");
        $('#unliked').attr("id", "liked");
      }
      else
        return;
    });
  });

  $('#liked').click(function() {
    var post_id = ($(this).attr("class")).substring(1);
    $.post('/unlikepost', {post_id: post_id}, function(result) {
      if(result != null) {
        $('#likedpic').attr("src", "img/heart.png");
        $('#likedpic').attr("id", "unlikedpic");
        $('#liked').attr("id", "unliked");
      }
      else
        return;
    });
  });
});
