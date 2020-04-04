$(document).ready(function() {
  $('#myInput').keyup(function() {
    event.preventDefault();
    var username = $('#myInput').val();
    $('#myDropdown').empty();

    $.get('/search', {username: username}, function(result) {
      if(result != null) {
        $('#myDropdown').append('<a href="/' + result.username + '"> ' + result.fullName + ' • ' + '@' + result.username);
        document.getElementById("myDropdown").classList.toggle("show");
      }
      else {
        return;
      }

    });
  });

  document.addEventListener("click", (evt) => {
    const flyoutElement = document.getElementById("myInput");
    let targetElement = evt.target; // clicked element

    do {
      if (targetElement == flyoutElement)
      return;
      targetElement = targetElement.parentNode;
    } while (targetElement);

    document.getElementById("myDropdown").classList.toggle("hide");
  });
});
