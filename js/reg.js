var reg = document.querySelector('.reg');
var codeimg = reg.querySelector('.code_img');

codeimg.onclick = changeVCode;
function changeVCode(){
    var imgw = codeimg.clientWidth;
    var imgh = codeimg.clientHeight;
    var time = new Date().getTime();
    codeimg.src="admin/code.php?&n=4&s=20&w="+imgw+"&h="+imgh+"&time="+time;
}
changeVCode();

var sub = document.querySelector('.sub');
sub.onclick = function(event){
    if(event.preventDefault){
        event.preventDefault();
    }else if(event.returnValue){
        event.returnValue = false;
    }
    var user = reg.querySelector('.user').value;
    var pwd = reg.querySelector('.pwd').value;
    var rpwd = reg.querySelector('.rpwd').value;
    var ycode = reg.querySelector('.ycode').value;
};