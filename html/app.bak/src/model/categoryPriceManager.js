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

// $(function({
//     var list = window.categoryPriceManagerModule.getData();

//     var app = new Vue({
//         el: '#cpm_table_tr',
//         data: {
//             items: list
//         }
//     });
// }));