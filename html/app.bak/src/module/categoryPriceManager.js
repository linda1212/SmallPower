(function() {

    function CategoryPriceManagerModule() {
        this.jsondata = {};
    }

    CategoryPriceManagerModule.prototype = {

        getData: function() {
            var result = {

                list: [{
                    name: "tom",
                    age: "14"
                }, {
                    name: "hellen",
                    age: "15"
                }]
            }

            return result
        }
    };

    window.categoryPriceManagerModule = new CategoryPriceManagerModule();

})();