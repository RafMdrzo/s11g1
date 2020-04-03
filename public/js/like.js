$(document).ready(function() {
  $('#unliked').click(function() {
    var post_id = ($(this).attr("class")).substring(1);
    alert(post_id);
    $.post('/likepost', {post_id: post_id}, function(result) {
      if(result != null) {
        alert(result);
        $('#unlikedpic').attr("src", "img/heart2.png");
        $('#unlikedpic').attr("id", "likedpic");
        $('#unliked').attr("id", "liked");
      }
      else
        return;
    });
  });
});
