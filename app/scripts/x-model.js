/**
 * Created by dddpe on 2016-8-4.
 */
(function (window, jQuery) {
    var HTMLS = {
        ovl: '<div id="x_WinpopMask"></div>' +
        '<div id="x_WinpopBox">' +
        '<div class="x_WinpopMain"></div>' +
        '<div class="x_WinpopBtns"></div>' +
        '</div>',
        alert: '<input type="button" class="x_AltBtn" value="确定">',
        confirm: '<input class="x_CfmTrue" type="button" value="确定">'+
        '<input class="x_CfmFalse" type="button"   value="取消">'
    };

    function Winpop() {
        var config = {};
        this.get = function (n) {
            return config[n];
        }

        this.set = function (n, v) {
            config[n] = v;
        }
        this.init();
    }

    Winpop.prototype = {
        opened:[],
        init: function () {
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var body = jQuery("body"),
                ovl = jQuery("#x_WinpopBox");

            if (ovl.length === 0) {
                body.append(HTMLS.ovl);
            }

            this.set("ovl", jQuery("#x_WinpopBox"));
            this.set("mask", jQuery("#x_WinpopMask"));
        },
        bindEvent: function () {
            var _this = this,
                ovl = _this.get("ovl"),
                mask = _this.get("mask");
            ovl.on("click", ".x_AltBtn", function (e) {
                _this.hide();
            });
            ovl.on("click", ".x_CfmTrue", function (e) {
                var cb = _this.get("confirmBack");
                _this.hide();
                cb && cb(true);
            });
            ovl.on("click", ".x_CfmFalse", function (e) {
                var cb = _this.get("confirmBack");
                _this.hide();
                cb && cb(false);
            });
            mask.on("click", function (e) {
                _this.hide();
            });
            jQuery(document).on("keyup", function (e) {
                var kc = e.keyCode,
                    cb = _this.get("confirmBack");
                ;
                if (kc === 27) {
                    _this.hide();
                } else if (kc === 13) {
                    _this.hide();
                    if (_this.get("type") === "confirm") {
                        cb && cb(true);
                    }
                }
            });
        },
        alert: function(str, btnstr) {
            var str = typeof str === 'string' ? str : str.toString(),
                opened=this.opened,
                ovl = this.get("ovl"),
                _this=this;
            var timer=setInterval(function(){
                if(opened.length==0){
                    clearInterval(timer);
                    _this.set("type", "alert");
                    ovl.find(".x_WinpopMain").html(str);
                    if (typeof btnstr == "undefined") {
                        ovl.find(".x_WinpopBtns").html(HTMLS.alert);
                    } else {
                        ovl.find(".x_WinpopBtns").html(btnstr);
                    }
                    _this.show();
                }
            },10);

        },
        confirm: function(str, callback) {
            var str = typeof str === 'string' ? str : str.toString(),
                ovl = this.get("ovl"),
                opened=this.opened,
                _this=this;
            var timer=setInterval(function(){
                if(opened.length==0){
                    clearInterval(timer);
                    _this.set("type", "confirm");
                    ovl.find(".x_WinpopMain").html(str);
                    ovl.find(".x_WinpopBtns").html(HTMLS.confirm);
                    _this.set("confirmBack", (callback || function() {}));
                    _this.show();
                }
            },10);

        },
        show: function() {
            this.opened.push(1);
            this.get("ovl").show();
            this.get("mask").show();

        },
        hide: function() {
            this.opened.shift();
            var ovl = this.get("ovl");
            ovl.find(".x_WinpopMain").html("");
            ovl.find(".x_WinpopBtns").html("");
            ovl.hide();
            this.get("mask").hide();
        },
        destory: function() {
            this.get("ovl").remove();
            this.get("mask").remove();
            delete window.alert;
            delete window.confirm;
        }
    };

    var obj = new Winpop();
    window.alert = function(str) {
        obj.alert.call(obj, str);
    };
    window.confirm = function(str, cb) {
        obj.confirm.call(obj, str, cb);
    };
})(window, jQuery);