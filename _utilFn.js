/**
 * 工具方法
 * @author Cc
 * 
 */
var UtilFn = {
    // 动态设置html的font-size，用于rem的计算
    setHtmlFontSize: function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = (clientWidth * 0.1) + 'px';
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        // DOM加载之后及资源加载之前去执行，即对应jQuery中的document ready
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },

    // 移动端浏览器查看log
    checkLogInMobile: {
        init: function() {
            var that = this;
            // get the mobile device
            var userAgent = navigator.userAgent.toLowerCase();
            window.device = {};
            device.isMobile = _find("iphone") || _find("ipad") || _find("android");

            function _find(deviceNameInLowerCase) {
                return userAgent.indexOf(deviceNameInLowerCase) !== -1;
            }

            // store all the consolelogs
            var mLogger = "Console logging...<br />";
            if (window.device.isMobile) {
                window.console.log = function(_log) {
                    var _now = new Date();
                    mLogger = mLogger + '<span style="background: #f00;color: #fff">[' + _now.getHours() + 'h ' + _now.getMinutes() + 'm ' + _now.getSeconds() + 's' + ']</span> ' + _log.toString() + '<br />';
                }

                // trigger
                $('body').append('<div id="js_showConsole" style="position: fixed;z-index: 998;bottom: 0;right: 0;width: .5rem;height: .5rem;background: rgba(255,0,0,.3)"></div>');
                $("#js_showConsole").bind("click", function() {
                    that.showConsole(mLogger);
                });
            }
        },

        // print the consolelogs to the element
        showConsole: function(param) {
            if ($("#logBlock")[0]) {
                return;
            }
            var logBlock = '<div id="logBlock" style="overflow: auto;position: absolute;z-index: 999;left: 0;right: 0;top: 0;bottom: 0;box-sizing: border-box;padding: .1rem;background: rgba(0,0,0,.8);color: #fff;"></div>'
            $('body').append(logBlock);
            $('#logBlock').html(param);
            $('#logBlock').click(function() {
                $(this).remove();
            });
        },
    },

    // 获取location search参数，返回一个search对象
    getLocationSearchObj: function(qstring) {
        var splitUrl = qstring.split("?");
        var strUrl = (splitUrl.length > 1) ? decodeURIComponent(splitUrl[1]).split("&") : [];
        var str = "";
        var obj = {};
        for (var i = 0, l = strUrl.length; i < l; i++) {
            str = strUrl[i].split("=");
            obj[str[0]] = str[1];
        }
        return Array.prototype.sort.call(obj);
    },

    // 设置弹窗垂直居中
    setPopupVerticalMid: function(domObj) {
        if ($(domObj)) {
            var popupHeight = $(domObj).height(),
                widHeight = $(window).height();

            $(domObj).css({
                'top': (widHeight - popupHeight) / 2,
            })
        } else {
            alert("Popup is not exist！");
        }
    },

    // 判断邮箱正则
    isEmail: function(str) {
        return /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);
    },

    // 判断环境
    isiOS: function() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    isAndriod: function() {
        return /android/.test(navigator.userAgent.toLowerCase());
    },
    isWeChat: function() {
        return /micromessenger/.test(navigator.userAgent.toLowerCase());
    },
}