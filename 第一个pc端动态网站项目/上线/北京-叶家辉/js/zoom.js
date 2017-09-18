function Zoom() {
    var oBigPic = document.querySelector(".bigPic");
    var oSmallPic = document.querySelector('.productDetailImgB');
    var oZoom = document.querySelector('.zoom');
    var oProductDetailLeft=document.querySelector(".productDetailLeft");

    var bigPicWidth = parseFloat(fetchComputedStyle(oBigPic, 'width'));
    var smallPicWidth = parseFloat(fetchComputedStyle(oSmallPic, 'width'));
    var zoomWidth = parseFloat(fetchComputedStyle(oZoom, 'width'));
    var rate = (960 - bigPicWidth) / (smallPicWidth - zoomWidth);

    oSmallPic.onmouseover = function () {
        oZoom.style.display = 'block';
        oBigPic.style.display = 'block';
        this.style.backgroundColor="rgba("+255+","+255+","+255+","+0.3+")";
    }
    oSmallPic.onmouseout = function () {
        oZoom.style.display = 'none';
        oBigPic.style.display = 'none';
        this.style.opacity=1;
    }
    oSmallPic.onmousemove = function (event) {
        event = event || window.event;
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var x = event.clientX - (getAllLeft(oSmallPic) - scrollLeft) - oZoom.clientWidth / 2;
        var y = event.clientY - (getAllTop(oSmallPic) - scrollTop) - oZoom.clientHeight / 2;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > oSmallPic.clientWidth - oZoom.clientWidth) {
            x = oSmallPic.clientWidth - oZoom.clientWidth;
        }
        if (y > oSmallPic.clientHeight - oZoom.clientHeight) {
            y = oSmallPic.clientHeight - oZoom.clientHeight;
        }
        oZoom.style.top = y + 'px';
        oZoom.style.left = x + 'px';
        oBigPic.style.backgroundPosition = -x * rate + 'px ' + -y * rate + 'px';
    }
    function fetchComputedStyle(obj, property) {
        if (window.getComputedStyle) {
            property = property.replace(/[A-Z]/g, function (match) {
                return '-' + match.toLowerCase();
            });
            return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
        } else {
            property = property.replace(/-([a-z])/g, function (match, $1) {
                return $1.toUpperCase();
            });
            return obj.currentStyle[property];
        }
    }

    function getAllTop(obj) {
        var allTop = obj.offsetTop;
        var currentObj = obj;
        while ((currentObj = currentObj.offsetParent)) {
            allTop += currentObj.offsetTop;
        }
        return allTop;
    }

    function getAllLeft(obj) {
        var allLeft = obj.offsetLeft;
        var currentObj = obj;
        while ((currentObj = currentObj.offsetParent)) {
            allLeft += currentObj.offsetLeft;
        }
        return allLeft;
    }
    function setAlphaOpacity(elm,value){
        elm=typeof elm=="string"?document.getElementById(elm):elm;
        if(document.all){
            elm.style.filter='alpha(opacity='+value+')';
        }else{
            elm.style.opacity=value/100;
        }
    }
}


