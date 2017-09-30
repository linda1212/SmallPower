(function() {

    function loginSuccessHandler(resp) {
        console.log('[login.js][loginSuccessHandler][resp = ]');
    }

    function loginFailedHandler(resp) {
        console.log('[login.js][loginFailedHandler][resp = ]');
    }

    function gotoPage(){
        console.log('[login.js][gotoPage][enter]');
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

    $('#submitBtn').click(function () {
        sendLoginReq();
    });

})();