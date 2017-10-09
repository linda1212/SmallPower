(function (w, $, layer) {

    "use strict"

    function OpenAccountController(cfg) {

        eBase.debug('[openAccountController.js][OpenAccountController][构造器]');

        this.queryUrl = 'http://localhost:8080/Long/test';
        this.addUrl = 'http://localhost:8080/Long/add';
        this.editUrl = 'http://localhost:8080/Long/add';
        this.removeUrl = 'http://localhost:8080/Long/del';
    }

    OpenAccountController.prototype = {

        /**
         * 初始化函数
         * */
        init: function () {
            eBase.debug('[openAccountController.js][init]');
            this.sendAjax();
            this.addListeners();
        },

        /**
         * 鉴权
         * */
        sendAjax: function () {
            var self = this;
            $.ajax({
                type: 'get',
                url: "http://localhost:8080/Long/test",
                dataType: 'json'
            }).success(function (resp) {
                self.renderTable(resp.data);
                eBase.debug('[openAccountControllder.js][sendAjax][鉴权成功]');
            }).fail(function (resp) {
                eBase.debug('[openAccountControllder.js][sendAjax][鉴权失败]');
            }).done(function () {
                eBase.debug('[openAccountControllder.js][sendAjax][鉴权done]');
            });
        },

        /**
         * 初始化所有组件的监听函数
         * */
        addListeners: function () {
            this.addButtonListeners();
            this.addTableListeners();
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
            var self = this;

            $("#openAccount_addBtn").click(function () {
                var addBtn = $(this);
                self.addButtonHandler(addBtn);
            });
            $("#openAccount_editBtn").click(function () {
                eBase.debug('[openAccountController.js][addButtonListeners][openAccount_editBtn click handler]');
            });
            $("#openAccount_removeBtn").click(function () {
                eBase.debug('[openAccountController.js][addButtonListeners][openAccount_removeBtn click handler]');
            });
        },

        addButtonHandler: function (addBtn) {

            var self = this;

            var index = w.layer.open({
                id:'my_layer',
                type: 1,
                title:'编辑',
                skin: "layui-layer-rim",
                closeBtn: !0,
                area: ['800px', '300px'],
                shift: 2,
                shadeClose: !0,
                content: '<div id="app_layer_box"></div><div id="app_btn_box" class="row"></div>',
            });

            var wrap = $('<div id="contentBox" class="row form-horizontal m-t"></div>');
            var input_ids = [];

            var t = addBtn.data("table");

            $('#' + t).find("th[data-field]").each(function () {

                var input_field = $(this).data('field');
                var input_hidden = $(this).data('hidden');
                var input_label = $(this).text();

                if (!input_hidden) {

                    input_ids.push(input_field);

                    var item = $('<div class="col-md-6">' +
                        '<div class="form-group">' +
                        '<label class="col-sm-3 control-label">' + input_label + '</label>' +
                        '<div class="col-sm-9">' +
                        '<input type="text" id="' + input_field + '" class="form-control" placeholder="">' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    wrap.append(item);
                }
            });

            var buttonGroup = $('<div class="layui-layer-btn">' +
                '<button id="layer_OK_Button"  type="button" title="保存" class="btn btn-outline btn-default layui-layer-btn0">' +
                    /*'<i class="glyphicon" ></i>' +*/
                    '<span>保存</span>' +
                '</button>' +
                '<button id="layer_Cancel_Button"  type="button" title="保存" class="btn btn-outline btn-default layui-layer-btn1">' +
                    /*'<i class="glyphicon" ></i>' +*/
                    '<span>取消</span>' +
                '</button>' +
            '</div>');

            $("#app_layer_box").append(wrap);
            $("#app_btn_box").append(buttonGroup);

            var sendData = {};

            for (var i = 0; i < input_ids.length; i++) {
                sendData[input_ids[i]] = $('#' + input_ids[i]).val();
            }

            console.log('send data is :' + sendData);

            $('#layer_OK_Button').click(function () {
                self.layerOKButtonHandler(sendData);
            });

            $('#layer_Cancel_Button').click(function () {
                w.layer.close(index);
                self.layerCancelButtonHandler();
            });
        },

        layerOKButtonHandler: function (data) {
            this.addItem(data);
            eBase.debug('[openAccountController.js][layerOKButtonHandler]');
        },

        layerCancelButtonHandler: function () {
            eBase.debug('[openAccountController.js][layerCancelButtonHandler]');
        },

        addTableListeners: function () {
            $("#openAccountTable").on("all.bs.table", function () {
                //console.log('all.bs.table click');
            }).on("click-row.bs.table", function () {
                //console.log("Event:click-row.bs.table");
            }).on("dbl-click-row.bs.table", function () {
                //console.log("Event:dbl-click-row.bs.table");
            }).on("sort.bs.table", function () {
                //console.log("Event:sort.bs.table");
            }).on("check.bs.table", function () {
                //console.log("Event:check.bs.table");
            }).on("uncheck.bs.table", function () {
                //console.log("Event:uncheck.bs.table");
            }).on("check-all.bs.table", function () {
                //console.log("Event:check-all.bs.table");
            }).on("uncheck-all.bs.table", function () {
                //console.log("Event:uncheck-all.bs.table");
            }).on("load-success.bs.table", function () {
                //console.log("Event:load-success.bs.table");
            }).on("load-error.bs.table", function () {
                //console.log("Event:load-error.bs.table");
            }).on("column-switch.bs.table", function () {
                //console.log("Event:column-switch.bs.table");
            }).on("page-change.bs.table", function () {
                //console.log("Event:page-change.bs.table");
            }).on("search.bs.table", function () {
                //console.log("Event:search.bs.table");
            });
        },

        /**
         * 获取整个table的函数
         * */
        queryData: function () {
            var self = this;
            eBase.send({url: self.queryUrl}).done(function (result) {
                eBase.debug('[openAccountController.js][queryData][send success]');
            }).fail(function (result) {
                eBase.debug('[openAccountController.js][queryData][send fail]');
            });
        },

        /**
         * 增加,修改
         * */
        addItem: function (data) {

            var self = this;

            eBase.send({'url': self.addUrl, data: data}).done(function () {
                eBase.debug('[openAccountController.js][addItem][send success]');
                w.layer.msg('保存成功');
            }).fail(function () {
                eBase.debug('[openAccountController.js][addItem][send failed]');
                w.layer.msg('保存失败');
            });
        },

        removeItem: function () {
            eBase.debug('[openAccountController.js][removeItem]');
        }
    };

    var c = new OpenAccountController().init();

})(window, $, layer);
