;console.info("ender app.js");

define(function (require, exports, module) {

    var CategoryPriceManagerController = require('CategoryPriceManagerController').CategoryPriceManagerController;
    var categoryPriceManagerController = new CategoryPriceManagerController();

    var App = function(){};

    App.prototype = {

        init: function () {
            console.log('app init start');
            this.appFunc();
            categoryPriceManagerController.init();
        },
        appFunc:function(){

            console.log("this is appFunc");
        }
    };

    exports.app = new App();
});