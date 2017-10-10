(function ($) {

    window.eBase = {

        isDebug: !0,

        gotoLoginPage: function () {
            this.debug('[eBase.js][gotoLoginPage][enter]');

            window.location.href = '././login.html';
        },

        gotoHomePage: function () {
            this.debug('[eBase.js][gotoHomePage][enter]');

            window.location.href = '././index.html';
        },

        checkAuthentication: function (currentpage, username, password) {

            var self = this;

            if ('' == username || '' == password) {
                self.debug('[login.js][checkAuthentication][username or password is null]');
                return;
            }

            self.debug('[login.js][checkAuthentication][begin send request]');

            /*if ('' != username && '' != password) {
             self.loginSuccessHandler(currentpage)
             } else {
             self.loginFailedHandler(currentpage);
             }*/

            var dfd = $.Deferred();

            self.send({
                "url": '/login',
                "request": {
                    "id": username, //用户名
                    "psd": password //密码
                }
            }).done(function(resp){
                self.loginSuccessHandler(currentpage, resp);
                dfd.resolve(resp);
            }).fail(function(resp){
                self.loginFailedHandler(currentpage, resp);
                dfd.reject(resp);
            });

            return dfd;

            /*$.ajax({
                "url": '/login',
                "request": {
                    "id": username, //用户名
                    "psd": password //密码
                }
            }).success(function (resp) {
                self.loginSuccessHandler(currentpage, resp);
            }).fail(function (resp) {
                self.loginFailedHandler(currentpage, resp);
            });*/
        },

        initPages: function () {
            this.debug('[eBase.js][initPages]');
        },

        loginSuccessHandler: function (currentpage, resp) {

            if ('login' == currentpage) {
                this.gotoHomePage();
            }
        },

        loginFailedHandler: function (currentpage, resp) {
            if ('login' == currentpage) {
                console.log('[eBase.js][loginFailedHandler][login failed]');
            } else {
                this.gotoLoginPage();
            }
        },

        send: function (ajaxData, type) {

            var _type = type || 'post';
            var defaultParams = {
                type: _type,
                dataType: 'json'
            };
            var newParams = $.extend(defaultParams, ajaxData);
            var dfd = $.Deferred();
            $.ajax(newParams).success(function (resp) {
                dfd.resolve(resp);
            }).fail(function (resp) {
                dfd.reject(resp);
            });
            return dfd;
        },

        debug: function (string) {
            this.isDebug && console.log(string);
        }
    };

})(jQuery);