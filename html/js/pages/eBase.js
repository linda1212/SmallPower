(function () {

    window.eBase = {

        gotoLoginPage: function () {
            console.log('[eBase.js][gotoLoginPage][enter]');

            window.location.href = '././login.html';
        },

        gotoHomePage: function () {
            console.log('[eBase.js][gotoHomePage][enter]');

            window.location.href = '././index.html';
        },

        checkAuthentication: function (currentpage, username, password) {

            var self = this;

            if ('' == username || '' == password) {
                console.log('[login.js][checkAuthentication][username or password is null]');
                return;
            }

            console.log('[login.js][checkAuthentication][begin send request]');

            if ('' != username && '' != password) {
                self.loginSuccessHandler(currentpage)
            } else {
                self.loginFailedHandler(currentpage);
            }

            return;

            $.ajax({
                url: 'login',
                username: username,
                password: password
            }).done(function (resp) {
                self.loginSuccessHandler(currentpage, resp);
            }).fail(function (resp) {
                self.loginFailedHandler(currentpage, resp);
            });
        },

        initPages: function () {
            console.log('[eBase.js][initPages]');
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
        }
    };

})($);