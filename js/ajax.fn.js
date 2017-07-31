//自己封装的ajax函数
//JSDOC
/**
 * @param {method} string 请求数据的类型
 * @param {url} string 请求的地址
 * @param {data} string 发送的数据
 * @param {succFn} function 请求成功的回调函数
 * @param {errFn} function 请求失败的回调函数
 */
function ajaxFn(methmod,url,data,succFn,errFn){
    if(typeof methmod !== 'string'){
        console.log(typeof methmod);
        throw "methmod must is string!!!";
    }else if(typeof url !== 'string'){
        throw "url must is string!!!";
    }else if(typeof data !== 'string'){
        throw "data must is string!!!";
    }
    var ajax = null;
    if(XMLHttpRequest){
        ajax = new XMLHttpRequest();
    }else{
        ajax = ActiveXObject("Msxml2.XMLHTTP");
    }
    if(methmod.toLowerCase() === "get"){
        ajax.open("get",url+"?"+data,true);
        ajax.send();
    }else{
        ajax.open("POST",url,data);
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.send(data);
    }
    ajax.onreadystatechange = function(){
        if(ajax.readyState === 4){
            if(ajax.status>=200&&ajax.status<300||ajax.status===304){
                if(typeof succFn === 'function'){
                    succFn(ajax.responseText);
                }
            }else{
                if(typeof errFn === 'function'){
                    errFn(ajax.status);
                }
            }
        }
    };
}