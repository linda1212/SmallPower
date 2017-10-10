(function (w, $, layer) {

    "use strict"

    function CURDTable(value) {

        this.cfg = $.extend(value, {
            /*t: "#openAccountTable",//操作表的ID
            uuid: "CId",//主键
            queryUrl: "js/demo/customer.json",
            addUrl: "http://localhost:8080/Long/add",
            delUrl: "http://localhost:8080/Long/del",
            toolbar:"exampleTableEventsToolbar",
            addBtn:"#openAccount_addBtn",
            editBtn:"#openAccount_editBtn",
            delBtn:"#openAccount_removeBtn"*/
        });

        eBase.debug('[CURDTable.js][CURDTable][构造器]');
    }

    CURDTable.prototype = {

        /**
         * 初始化函数
         * */
        init: function () {
            eBase.debug('[CURDTable.js][init]');

            this.addListeners();
            this.renderTable();
        },

        /**
         * 初始化所有组件的监听函数
         * */
        addListeners: function () {
            this.addButtonListeners();
            this.addTableListeners();
        },

        queryParams: function (params) {
            var result = {

                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                //limit: params.limit, //页面大小
                //page: params.offset, //页码

                pageSize: params.pageSize,
                pageIndex: params.pageNumber

            };
            return result;
        },

        renderTable: function () {

            var self = this;

            /*$(self.cfg.t).bootstrapTable({
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
             });*/


            $(self.cfg.t).bootstrapTable({
                url: self.cfg.queryUrl,
                search: !0,
                striped: true,
                pagination: !0,
                showRefresh: !0,
                showToggle: !0,
                showColumns: !0,
                iconSize: "outline",
                showExport: true,
                exportDataType: "basic",
                toolbar: self.toolbar,
                icons: {refresh: "glyphicon-repeat", toggle: "glyphicon-list-alt", columns: "glyphicon-list"}
            });

            return;

            $(self.cfg.t).bootstrapTable({
                url: 'js/demo/customer.json',
                method: 'get',
                striped: true,   //是否显示间隔色
                pagination: true, //是否分页
                sortable: false,
                cache: false,//是否启用缓存
                search: true, //是否显示搜索
                sortOrder: "asc",
                uniqueId: 'CId',
                sidePagination: "server",
                queryParamsType: "undefined",
                //queryParams: queryParams,
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                queryParams: function (params) {
                    var subcompany = $('#subcompany option:selected').val();
                    var name = $('#name').val();
                    return {
                        pageNumber: params.offset + 1,
                        pageSize: params.limit,
                        companyId: subcompany,
                        name: name
                    };
                },

                //Enable the strict search.
                strictSearch: true,
                clickToSelect: true,
                showExport: true,
                exportDataType: "basic"
                /*,
                 columns: [{
                 checkbox: true
                 }, {
                 field: 'userid',
                 title: 'userid'
                 }, {
                 field: 'username',
                 title: 'username'
                 }, {
                 field: 'password',
                 title: 'password'
                 }, {
                 field: 'age',
                 title: 'age'
                 }]*/

            });
        },

        addButtonListeners: function () {
            var self = this;

            $(self.cfg.addBtn).click(function () {
                eBase.debug('[CURDTable.js][addButtonListeners][addBtn click handler]');
                var addBtn = $(this);
                self.addOrEdit(false, addBtn);
            });
            $(self.cfg.editBtn).click(function () {
                eBase.debug('[CURDTable.js][addButtonListeners][editBtn click handler]');

                var selections = $(self.cfg.t).bootstrapTable('getSelections');

                if (selections && selections.length == 0) {
                    w.layer.msg("请选择一条记录");
                    return;
                } else if (selections && selections.length > 1) {
                    w.layer.msg("一次不能编辑多条");
                    return;
                }

                var editBtn = $(this);
                self.addOrEdit(true, editBtn, selections[0]);
            });
            $(self.cfg.delBtn).click(function () {
                eBase.debug('[CURDTable.js][addButtonListeners][openAccount_removeBtn click handler]');
                var selections = $(self.cfg.t).bootstrapTable('getSelections');
                if (selections && selections.length < 1) {
                    w.layer.msg("请选择要删除的数据");
                    return;
                }
                var delBtn = $(this);
                var ids = [];

                for (var i = 0; i < selections.length; i++) {
                    var item = {};
                    item[self.cfg.uuid] = selections[i][self.cfg.uuid];
                    ids.push(item);
                }
                self.delItem(ids);
            });
        },

        addOrEdit: function (edittype, btn, val) {

            var self = this;

            if ("#" + btn.data("table") !== self.cfg.t) return;

            var tit = edittype ? "编辑" : "添加";
            var index = w.layer.open({
                id: 'my_layer',
                type: 1,
                title: tit,
                skin: "layui-layer-rim",
                closeBtn: !0,
                area: ['800px', '300px'],
                shift: 2,
                shadeClose: !0,
                content: '<div id="app_layer_box"></div><div id="app_btn_box" class="row"></div>',
            });

            var wrap = $('<div id="contentBox" class="row form-horizontal m-t"></div>');
            var input_ids = [];

            var t = btn.data("table");

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

            //如果是编辑窗口，给各个字段赋值
            if (edittype && val) {
                for (var i = 0; i < input_ids.length; i++) {
                    $('#' + input_ids[i]).val(val[input_ids[i]]);
                }
            }

            var sendData = {};

            for (var i = 0; i < input_ids.length; i++) {
                sendData[input_ids[i]] = $('#' + input_ids[i]).val();
            }

            $('#layer_OK_Button').click(function () {
                self.addItem(sendData, input_ids);
            });

            $('#layer_Cancel_Button').click(function () {
                w.layer.close(index);
            });
        },

        addTableListeners: function () {
            var self = this;

            $(self.cfg.t).on("all.bs.table", function () {
                //console.log('all.bs.table click');
            }).on("click-row.bs.table", function (row, $element, field) {
                //console.log("Event:click-row.bs.table");
            }).on("dbl-click-row.bs.table", function () {
                //console.log("Event:dbl-click-row.bs.table");
            }).on("sort.bs.table", function () {
                //console.log("Event:sort.bs.table");
            }).on("check.bs.table", function (row, $element, field) {
                //console.log("Event:check.bs.table");
            }).on("uncheck.bs.table", function (row, $element, field) {
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
            eBase.send({url: self.cfg.queryUrl}).done(function (result) {
                eBase.debug('[CURDTable.js][queryData][send success]');
            }).fail(function (result) {
                eBase.debug('[CURDTable.js][queryData][send fail]');
            });
        },

        /**
         * 增加,修改
         * */
        addItem: function (sendData, itemNames) {

            for (var i = 0; i < itemNames.length; i++) {
                sendData[itemNames[i]] = $('#' + itemNames[i]).val();

                if ("" == sendData[itemNames[i]]) {
                    var msg = $('#' + itemNames[i]).parent().parent().find("label").text();
                    w.layer.msg(msg + "不能为空");
                    return;
                }
            }

            var self = this;

            eBase.send({'url': self.cfg.addUrl, data: sendData}).done(function () {
                eBase.debug('[CURDTable.js][addItem][send success]');
                w.layer.msg('保存成功');
            }).fail(function () {
                eBase.debug('[CURDTable.js][addItem][send failed]');
                w.layer.msg('保存失败');
            });
        },

        delItem: function (ids) {
            var self = this;
            eBase.debug('[CURDTable.js][delItem]');
            eBase.send({'url': self.cfg.delUrl, data: ids}).done(function () {
                eBase.debug('[CURDTable.js][delItem][send success]');
                w.layer.msg('删除成功');
            }).fail(function () {
                eBase.debug('[CURDTable.js][delItem][send failed]');
                w.layer.msg('删除失败');
            });
        }
    };

    //var c = new CURDTable().init();

    w.cur = CURDTable;

})(window, $, layer);
