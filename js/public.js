function windowSize() {
    //获取屏幕宽度
    var deviceWidth = document.documentElement.clientWidth;
    // 设计稿width为720px
    if (deviceWidth > 720)deviceWidth = 720;
    if (deviceWidth < 320)deviceWidth = 320;
    document.documentElement.style.fontSize = deviceWidth / 7.2 + "px";
};
windowSize();
window.onresize = function () {
    windowSize();
};