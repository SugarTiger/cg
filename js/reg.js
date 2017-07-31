var reg = document.querySelector('.reg');
var codeimg = reg.querySelector('.code_img');

// 验证码
codeimg.onclick = changeVCode;

function changeVCode() {
    var imgw = codeimg.clientWidth;
    var imgh = codeimg.clientHeight;
    var time = new Date().getTime();
    codeimg.src = "admin/code.php?&n=4&s=20&w=" + imgw + "&h=" + imgh + "&time=" + time;
}
changeVCode();

// 提交
var sub = document.querySelector('.sub');
sub.onclick = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else if (event.returnValue) {
        event.returnValue = false;
    }
    var user = reg.querySelector('.user');
    var pwd = reg.querySelector('.pwd');
    var rpwd = reg.querySelector('.rpwd');
    var ycode = reg.querySelector('.ycode');
    // 去除头尾空格
    var uVal = user.value;
    var pVal = pwd.value;
    var rpVal = rpwd.value;
    var cVal = ycode.value;
    if( !(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(uVal)) && !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/i.test(uVal))){
        alert("请填写正确的手机/邮箱");
        user.focus();
        return false;
    }
    if(!/\w{7,17}/.test(pVal)){
        alert("请输入六位以上密码，且只能包含字符、数字和下划线");
        pwd.focus();
        return false;
    }
    if(pVal!==rpVal){
        alert("两次输入密码不一致");
        rpwd.focus();
        return false;
    }
    ajaxFn('get', 'admin/vcode.php', 'code=' + cVal, function (data) {
        var iscode;
        if (JSON.parse(data).result === 'success') {
            iscode = true;
        } else {
            iscode = false;
        }
        if (!iscode) {
            alert('验证码错误');
            ycode.value = '';
            changeVCode();
            return false;
        }
        // 发送数据到后台
        var query = "u=" + uVal + "&p=" + md5(pVal);
        ajaxFn('POST', 'admin/reg.php', query, function (rep) {
            var resule = JSON.parse(rep);
            if (resule.type === 'success') {
                localStorage.setItem("cguserinfo",JSON.stringify(resule.userinfo));
                alert('注册成功');
            } else if(resule.code === '0') {
                alert('用户已存在');
            }
        }, function (error) {
            console.log('ajax请求失败，错误代码为：' + error);
        });
    }, function (error) {
        console.log('ajax请求失败，错误代码为：' + error);
    });
};