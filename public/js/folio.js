var users = [];
$( document ).ready(function()
{
    function createUser(username, firstname, lastname, email, password)
    {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;

        this.getUsername = function()
        {
            return this.username;
        }
    }
/*REGISTRATION*/
    function checkPass()
    {
        userName = $("#userName").val();
        lastName = $("#lastName").val();
        firstname = $("#firstName").val();
        email = $("#email").val();

        passVal = $("#passCode").val();
        confVal = $("#conf_pass").val();

        if(passVal != confVal)
        {
            if(passVal.length < 8)
            {
                $("#passCode").css("border-color", "red");
                var stmt = "Password has to be more than 8 characters.";
                $("#error-msg").val(stmt);
            }
            else
            {
                $("#error-msg").val("");
            }

            $("#passCode").css("border-color", "red");
            $("#confVal").css("border-color", "red");

            var stmt = "Passwords don't match.";
            $("#error-msg").val(stmt);
        }
        else
        {
            $("#passCode").css("border-color", "green");
            $("#confVal").css("border-color", "green");
            var check = false;
            for(x in users)
            {
                if(x.getUsername == userName)
                {
                    $("#error-msg").val("Username already exists.");
                    check = true;
                }
            }

            if(check == true)
            {
                $("#userName").css("border-color", "red");
                $("#error-msg").val("Username already exists.");
            }
            else
            {
                var person = new createUser(userName, firstName, lastName, email, passVal);
                users.push(person);

                $("#userName").css("border-color", "green");
                $("#error-msg").val("");
            }
        }

    }

    $("#regMod").click(function()
    {
        checkPass();
    });

    $("#cancelMod").click(function()
    {
        userName = $("#userName").val("");
        lastName = $("#lastName").val("");
        firstname = $("#firstName").val("");
        email = $("#email").val("");

        passVal = $("#passCode").val("");
        confVal = $("#conf_pass").val("");
    });
/*LOG-IN*/
    /*MASTER ACCOUNT FOR LOGGING IN (TEMPORARY ONLY) */
    $("#logBtn").click(function()
    {
        if($("#userLog").val()=="eugeniopastoral")
        {
            if($("#passLog").val()=="superpassword")
            {
                window.location.href = "home";
            }
            else
            {
                $("#passLog").css("border-color", "red");
            }
        }
    });

/* COMMENT */
    $(".addcommentbtn").click(function()
    {
        var comment = $(".addcomment").val();
        var stmt = "<div class = 'comment-cont'>" +
                    "<button class='close delete-comm' type='button'>"+
                    "x</button>" +
                   "<img src ='img/avatar.jpg'>" +
                   "<div class='row-name'>" +
                   "<strong> Eugenio Pastoral </strong>"+
                   "<div class='row-comment text-break'>" +
                   comment + "</div></div></div>";

        $(".comments").append(stmt);
        $(".addcomment").val("");
    });

    $(document).on('click', '.delete-comm', function(e)
    {
        $(this).parent().remove();
    });

    $(".profile-red").click(function()
    {
        window.location.href = "profile";
    });

/* UPLOAD */
    $(".addpostbtn").click(function()
    {
        var stmt = "<div id='post'>" +
                "<button class='close delete-post' type='button'>x</button>" +
                "<div id='photo-container'>" +
                "<div id='photo'>" +
                "<img class='fill' src='" + $(".fill-row").attr('src') + "'>" +
                "</div></div>" +
                "<div id='meta-container'>" +
                "<div id='meta'>" +
                "<div class='photo-header'>" +
                "<label>" + $(".addposttitle").val() + "</label><br><br>" +
                "<span class='author'>by Eugenio Pastoral</span><br>" +
                "<span class='date'>8 hours ago</span><br>" +
                "</div><hr>" +
                "<div class='photo-description'>" +
                "<label>" + $(".addpostdesc").val() + "</label></div>" +
                "<div class='photo-actions'>" +
                "<img class='socact-action' src='img/heart.png'>" +
                "<a class='socact-container' data-toggle='modal' data-target='#postModal'>" +
                "<img class='socact-action' src='img/comment.png'>" + "</a>" +
                "<img class='socact-action' src='img/share.png'>" +
                "<a class='edit-post socact-container' data-toggle='modal' data-target='#editModal'>" +
                "<img class='socact-action' src='img/options.png'>" + "</a>" +
                "</div></div></div></div>";
        $("#post-container").append(stmt);
        $(".addposttitle").val("");
        $(".addpostdesc").val("");
    });

    function readURL(input)
    {
        if (input.files && input.files[0])
        {
            var reader = new FileReader();
            reader.onload = function(e)
            {
                $('.fill-row').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgUpload").change(function()
    {
        readURL(this);
    });

    $(document).on('click', '.delete-post', function(e)
    {
        $(this).parent().remove();
    });

    $(document).on('click', '.edit-post', function(e)
    {
        var titletext = $(this).parent().parent().find(".photo-header").find("label").text();
        var desc = $(this).parent().parent().find(".photo-description").find("label").text();
        var header = $(this).parent().parent().find(".photo-header");
        var photodesc = $(this).parent().parent().find(".photo-description");

        $("#editModal").find(".addposttitle").val(titletext);
        $("#editModal").find('.addpostdesc').val(desc);

        $(".editpostbtn").click(function()
        {
            $(header).children("label").text($("#editModal").find(".addposttitle").val());
            $(photodesc).children("label").text($("#editModal").find('.addpostdesc').val());
        });
    });
/*
    function imageIsLoaded(e)
    {
        $('.pic-col').append("<img class='fill' src='" + e.target.result + "'>");
    };*/

    $("#navfolio #home-red").click(function()
    {
        window.location.href = "home.html";
    });
});
