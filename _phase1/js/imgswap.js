
function myFunction() {
    let retVal = Math.floor((Math.random() * 5) + 0);
    return retVal;
};
let ok = myFunction();
let temp = ok.toString();
$('body').css('background-image', 'url(img/landing'+ temp +'.jpg)');
