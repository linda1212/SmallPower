(function(){

    function CMP_Module() {}

    CMP_Module.prototype =  {
        test:function(){
            console.log("this is test function");
        }
    };

    window.cmp = new CMP_Module();
})();

$(function(){

    console.log("categorypriceManager.js load end");

});