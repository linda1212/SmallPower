(function () {

    function loginSuccessHandler(resp) {
        console.log('[login.js][loginSuccessHandler][enter]');

        eBase.gotoHomePage();
    }

    function loginFailedHandler(resp) {
        console.log('[login.js][loginFailedHandler][enter]');

        eBase.gotoLoginPage();
    }

    function sendLoginReq() {

        console.log('[login.js][sendLoginReq][enter]');

        var username = $('#username').val();
        var password = $('#userpsw').val();

        if ('' == username || '' == password) {
            console.log('[login.js][sendLoginReq][username or password is null]');
            return;
        }

        console.log('[login.js][sendLoginReq][begin send request]');

        if ('admin' === username && '1' === password) {
            loginSuccessHandler()
        } else {
            loginFailedHandler();
        }

        return;

        $.ajax({
            url: 'login',
            username: username,
            password: password
        }).done(function (resp) {
            loginSuccessHandler(resp)
        }).fail(function (resp) {
            loginFailedHandler(resp);
        });
    }

    $('#loginBtn').click(function () {
        sendLoginReq();
    });

})();