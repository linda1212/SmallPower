define(function(require, exports, module) {

    var CategoryPriceManagerController = function(){

    };

    CategoryPriceManagerController.prototype = {

        init:function(){

            console.log("this is init");
            this.setFun();
        },

        setFun:function(){
            console.log("this is setFun");
        }

    };

    exports.CategoryPriceManagerController = CategoryPriceManagerController;
});