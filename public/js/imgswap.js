
function myFunction() {
    var retVal = Math.floor((Math.random() * 5) + 0);
    return retVal;
};
var ok = myFunction();
var temp = ok.toString();
$('body').css('background-image', 'url(img/landing'+ temp +'.jpg)');
