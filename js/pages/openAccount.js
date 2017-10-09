(function () {
    function parserResp(resp) {
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

        bindingTable(resp.data);
    }

    function bindingTable(list) {
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
    }

    function addListeners() {
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
    }

    function addElmentsListener() {
        $("openAccount_addBtn").click(function () {

        });
    }

    function queryData(){
        eBase.send({url: 'http://localhost:8080/Long/test'}).done(function (result) {
            console.log('query data success');
        }).fail(function (result) {
            console.log('query data failed');
        });
    }

    function addItem() {
        eBase.send({url: 'http://localhost:8080/Long/test'}).done(function () {
            console.log('add item success');
        }).fail(function () {
            console.log('add item failed');
        });
    }

    function sendAjax() {
        $.ajax({
            type: 'get',
            url: "http://localhost:8080/Long/test",
            dataType: 'json'
        }).success(function (resp) {
            parserResp(resp);
            console.log("返回成功");
        }).fail(function (resp) {
            console.log('返回失败');
        }).done(function () {
            console.log("done");
        });
    }

    sendAjax();
    addListeners();
})();
