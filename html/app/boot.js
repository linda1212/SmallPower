;require.config({

    baseUrl: "./app",

    paths: {
        'app':'app',
        "CategoryPriceManagerController": "src/controller/CategoryPriceManagerController"
    }

});


define(function(require, exports, module) {
    var app = require('app').app;
    app.init();
});