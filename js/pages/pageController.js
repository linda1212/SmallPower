(function (w, $) {

    function OpenAccountController() {
        console.log("构造器");
    }

    OpenAccountController.prototype = {

        /**
         * 初始化函数
         * */
        init: function () {
            console.log("page controller init");
            this.sendAjax();
            this.addListeners();
        },

        /**
         * 鉴权
         * */
        sendAjax: function () {
            $.ajax({
                type: 'get',
                url: "http://localhost:8080/Long/test",
                dataType: 'json'
            }).success(function (resp) {
                this.parserResp(resp);
                console.log("返回成功");
            }).fail(function (resp) {
                console.log('返回失败');
            }).done(function () {
                console.log("done");
            });
        },

        /**
         * 初始化所有组件的监听函数
         * */

        addListeners: function () {
            this.addButtonListeners();
            this.addTableListeners();
        },

        parserResp: function (resp) {
            var list = resp.data;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                console.log(item.custom_id);
                console.log(item.custom_name);
                console.log(item.cusotm_sname);
                console.log(item.custom_address);
                console.log(item.custom_contact);
                console.log(item.custom_tel);
                console.log("-------------------");
            }

            this.renderTable(resp.data);
        },

        renderTable: function (list) {
            $("#openAccountTable").bootstrapTable({
                search: true,
                pagination: true,
                showRefresh: true,
                showToggle: true,
                showColumns: true,
                data: list,
                height: "600",
                iconSize: "outline",
                toolbar: "#exampleTableEventsToolbar",
                icons: {refresh: "glyphicon-repeat", toggle: "glyphicon-list-alt", columns: "glyphicon-list"}
            });
        },

        addButtonListeners: function () {
            $("openAccount_addBtn").click(function () {

            });
        },

        addTableListeners: function () {
            $("#openAccountTable").on("all.bs.table", function () {
                console.log('all.bs.table click');
            }).on("click-row.bs.table", function () {
                console.log("Event:click-row.bs.table");
            }).on("dbl-click-row.bs.table", function () {
                console.log("Event:dbl-click-row.bs.table");
            }).on("sort.bs.table", function () {
                console.log("Event:sort.bs.table");
            }).on("check.bs.table", function () {
                console.log("Event:check.bs.table");
            }).on("uncheck.bs.table", function () {
                console.log("Event:uncheck.bs.table");
            }).on("check-all.bs.table", function () {
                console.log("Event:check-all.bs.table");
            }).on("uncheck-all.bs.table", function () {
                console.log("Event:uncheck-all.bs.table");
            }).on("load-success.bs.table", function () {
                console.log("Event:load-success.bs.table");
            }).on("load-error.bs.table", function () {
                console.log("Event:load-error.bs.table");
            }).on("column-switch.bs.table", function () {
                console.log("Event:column-switch.bs.table");
            }).on("page-change.bs.table", function () {
                console.log("Event:page-change.bs.table");
            }).on("search.bs.table", function () {
                console.log("Event:search.bs.table");
            });
        },

        /**
         * 获取整个table的函数
         * */
        queryData: function () {
            eBase.send({url: 'http://localhost:8080/Long/test'}).done(function (result) {
                console.log('query data success');
            }).fail(function (result) {
                console.log('query data failed');
            });
        },

        /**
         * 增加,修改
         * */

        addItem: function () {
            eBase.send({url: 'http://localhost:8080/Long/test'}).done(function () {
                console.log('add item success');
            }).fail(function () {
                console.log('add item failed');
            });
        },

        removeItem:function(){
            console.log("remove item");
        }
    };

    var c = new OpenAccountController().init();

})(window, $);
