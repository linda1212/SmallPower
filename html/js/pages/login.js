(function () {

    $('#loginBtn').click(function () {
        var username = $('#username').val();
        var password = $('#userpsw').val();
        eBase.checkAuthentication('login', username, password);
    });

})();