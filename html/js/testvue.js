(function() {

    function Module() {
        this.name = "tom";
    }

    Module.prototype = {

        test: function() {
            console.log("this is test");
        }
    };


    window.module = new Module;

})();