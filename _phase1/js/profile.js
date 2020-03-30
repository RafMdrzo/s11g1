$(document).ready(function()
{

    $(".profile-red").click(function()
    {
        window.location.href = "profile.html";
    });

    function readURL(input) 
    {
        if (input.files && input.files[0]) 
        {
          var reader = new FileReader();

          reader.onload = function(e) 
          {
            $('#display-pic').attr('src', e.target.result);
          }

          reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function() 
    {
      readURL(this);
    });


    $("#newhandle").val($(".profile-handle").text());
    $("#newloc").val($(".user-location").text());
    $("#newbio").val($(".user-desc").text());
    $("#display-pic").attr('src', $(".prof-img-cont img").attr("src"));


      $("#save-dat").click(function()
      {
        var handle = $("#newhandle").val();
        var bio = $("#newbio").val();
        var loc = $("#newloc").val();

        $("#handle").text(handle);
        $("#bio").text(bio);
        $("#loc").text(loc);


        $(".prof-img-cont img").attr("src", $("#display-pic").attr('src'));
        $(".nav-avatar").attr("src", $("#display-pic").attr('src'));

      });


      $("#navfolio #home-red").click(function()
      {
          window.location.href = "home.html";
      });

      $(".gallery-column a").click(function()
      {
        var imgLoc = $(this).children("div").children("img").attr("src");
        $("#view-pic-cont").attr("src", imgLoc);
       
      });
});
