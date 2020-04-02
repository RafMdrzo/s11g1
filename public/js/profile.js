$(document).ready(function()
{

    $(".profile-red").click(function()
    {
        window.location.href = "profile";
    });

    $(".profile-blue").click(function()
    {
        window.location.href = "logout";
    });


    $("#navfolio #home-red").click(function()
    {
        window.location.href = "home";
    });

    $(".gallery-column a").click(function()
    {
      var imgLoc = $(this).children("div").children("img").attr("src");
      $("#view-pic-cont").attr("src", imgLoc);

    });
});
