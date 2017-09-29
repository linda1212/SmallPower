(function(){

    function OpenAccount() {}

    OpenAccount.prototype =  {
        test:function(){
            console.log("this is test function");
        }
    };

    window.openAccount = new OpenAccount();
})();

$(function(){
    console.info("OpenAccount.js load end");

    window.openAccount.test();
});