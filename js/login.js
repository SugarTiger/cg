var login = document.querySelector('.login');
var user = login.querySelector('.user');
var pwd = login.querySelector('.pwd');
var ycode = login.querySelector('.ycode');
var codeimg = login.querySelector('.code_img');
var sub = login.querySelector('.sub');
codeimg.onclick = changeVCode;
changeVCode();
var isUser = true;
var isPwd = true;
user.onchange = function () {
    if (!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(this.value)) && !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/i.test(this.value))) {
        alert("请填写正确的会员号");
        user.focus();
        isUser = false;
    } else {
        isUser = true;
    }
};
pwd.onchange = function () {
    if (!/\w{7,17}/.test(this.value)) {
        alert("请输入六位以上密码，且只能包含字符、数字和下划线");
        pwd.focus();
        isPwd = false;
    } else {
        isPwd = true;
    }
};
sub.onclick = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else if (event.returnValue) {
        event.returnValue = false;
    }
    if (!isUser) {
        alert("请填写正确的会员号");
        user.focus();
        return false;
    }
    if (!isPwd) {
        alert("请输入六位以上密码，且只能包含字符、数字和下划线");
        pwd.focus();
        return false;
    }
    ajaxFn('get', 'admin/vcode.php', 'code=' + ycode.value, function (rep) {
        var repObj = JSON.parse(rep);
        if (repObj.result === 'success') {
            var query = 'u=' + user.value + '&p=' + md5(pwd.value);
            ajaxFn('post', 'admin/login.php', query, function (rep) {
                var obj = JSON.parse(rep);
                switch (obj.code) {
                    case "0":
                        alert('不存在此用户');
                        ycode.value = '';
                        changeVCode();
                        return false;
                        break;
                    case "1":
                        alert('用户名或密码输入错误');
                        ycode.value = '';
                        changeVCode();
                        return false;
                        break;
                    case "2":
                        window.location.href = 'index.html';
                        break;
                    default:
                        alert('发生未知错误');
                        return false;
                }
            }, function (error) {
                console.log('ajax请求失败，错误代码为：' + error);
            });
        } else if (repObj.result === 'fail') {
            alert('验证码错误');
            ycode.value = '';
            changeVCode();
            return false;
        }
    }, function (error) {
        console.log('ajax请求失败，错误代码为：' + error);
    });
};