var sub = document.querySelector('.sub');
sub.onclick = function(event){
    if(event.preventDefault){
        event.preventDefault();
    }else if(event.returnValue){
        event.returnValue = false;
    }
    var reg = document.querySelector('.reg');
    var user = reg.querySelector('.user').value;
    var pwd = reg.querySelector('.pwd').value;
    var rpwd = reg.querySelector('.rpwd').value;
    var ycode = reg.querySelector('.ycode').value;
};