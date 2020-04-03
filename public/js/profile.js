$(document).ready(function()
{
  FilePond.registerPlugin(FilePondPluginImagePreview);
  FilePond.registerPlugin(FilePondPluginImageResize);
  FilePond.registerPlugin(FilePondPluginFileEncode);

  FilePond.setOptions({
      imagePreviewHeight: 250,
      imageResizeTargetWidth: 640,
      imageResizeTargetHeight: 480
  })

  FilePond.parse(document.body)

  $(document).tooltip();
  
    $("#profred").click(function()
    {
        window.location.href = "profile";
    });

    $("#logred").click(function()
    {
        window.location.href = "logout";
    });


    $("#navfolio #home-red").click(function()
    {
        window.location.href = "home";
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


});
