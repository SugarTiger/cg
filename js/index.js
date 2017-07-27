// 轮播图
!function () {
    var timer = null;
    var index = 0;
    var speed = 3000;
    function Banner(opt) {
        this.banner = document.querySelector(opt.banner);
        this.imgbox = this.banner.querySelector(opt.imgbox);
        this.imglis = this.imgbox.children;
        this.nav = this.banner.querySelector(opt.nav);
        this.navlis = this.nav.children;
        this.active = opt.active;
        this.auto = opt.autoplay;
        speed = opt.speed || 3000;
        this.init();
    }
    Banner.prototype.init = function () {
        var first = this.imglis[0].cloneNode(true);
        var last = this.imglis[this.imglis.length - 1].cloneNode(true);
        this.imgbox.appendChild(first);
        this.imgbox.insertBefore(last, this.imglis[0]);
        this.imgbox.style.left = "-100%";

        this.autoplay();
        this.swiper();
		this.windowBug();
    };
    Banner.prototype.autoplay = function () {
        if(this.auto === false){
            return;
        }
        var that = this;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            that.play();
        }, speed);
    };
    Banner.prototype.changeNav = function(){
        var len = this.navlis.length;
        for(var i=0;i<len;i++){
            this.navlis[i].className = "";
        }
        this.navlis[index].className = this.active;
    };
    Banner.prototype.play = function () {
        var that = this;
        animate(this.imgbox, (index + 1) * -100, function () {
            that.handle();
            that.changeNav();
        });
    };
    Banner.prototype.handle = function () {
        if (index < 0) {
            index = this.imglis.length - 3;
            this.imgbox.style.left = (index + 1) * -100 + '%';
        } else if (index > this.imglis.length - 3) {
            index = 0;
            this.imgbox.style.left = "-100%";
        }
    };
    Banner.prototype.swiper = function(){
        var that = this;
        var startX = 0;
        var endX = 0;
        var objleft = 0;
        this.banner.addEventListener('touchstart',function(event){
            clearInterval(timer);
            clearInterval(that.imgbox.timer);
            startX = event.touches[0].clientX;
            objleft = parseInt(that.imgbox.style.left);
        },false);
        this.banner.addEventListener('touchmove',function(event){
            endX = event.touches[0].clientX;
            var x = Math.round((endX - startX) / that.imglis[0].offsetWidth * 100);
            that.imgbox.style.left = objleft + x + "%";
        },false);
        this.banner.addEventListener('touchend',function(event){
            if(endX - startX >80){
                index--;
            }else if(endX - startX < -80){
                index++;
            }
            that.play();
            that.autoplay();
        },false);
    };
    Banner.prototype.windowBug = function(){
        var that = this;
        window.addEventListener('blur',function(){
            clearInterval(timer);
        },false);
        window.addEventListener('focus',function(){
            that.autoplay();
        },false);
    };

    function animate(obj,target,callback){
        clearInterval(obj.timer);
        var objleft = parseInt(obj.style.left,10);
        var dirspeed = objleft - target > 0?-1:1;
        obj.timer = setInterval(function(){
            objleft += dirspeed;
            obj.style.left = objleft + "%";
            if(Math.abs(objleft - target)<1){
                clearInterval(obj.timer);
                if(typeof callback === "function"){
                    callback();
                }
            }
        },2);
    }

    window.Banner = Banner;
}();
// 实例化
var banner = new Banner({
    banner: ".banners",
    imgbox: ".imgbox",
    nav: ".point",
    active: "active",
    speed: 1000,
    autoplay: true
});