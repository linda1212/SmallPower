(function (w, $, layer, d) {

    "use strict";

    function CURDTable(value) {

        this.cfg = $.extend({
            maxheight: 800,
            toolbar: "#exampleTableEventsToolbar",
            editTitle: "编辑",
            addTitle: "增加",
            confirmMsg: "确定删除此条数据?"
        }, value);

        this.addFlag = true;

        this.$t = null;
        this.$m = null;
        this.cobj = {};

        eBase.debug('[CURDTable.js][CURDTable][构造器]');
    }

    CURDTable.prototype = {

        /**
         * 初始化函数
         * */
        init: function () {
            eBase.debug('[CURDTable.js][init]');

            this.renderTable();
            this.addListeners();
            this.initModelData();
        },

        /**
         * 初始化所有组件的监听函数
         * */
        addListeners: function () {
            this.addButtonListeners();
            this.addTableListeners();
        },

        queryParams: function (params) {
            var result;

            result = {
                pageSize: params.pageSize,
                pageIndex: params.pageNumber
            };
            return result;
        },

        initDateInput: function () {
            var self = this;

            if(self.cfg.dataInputs && self.cfg.dataInputs.length > 0){
                for (var i = 0; i < self.cfg.dataInputs.length; i++) {
                    var item = self.cfg.dataInputs[i];
                    if($(item)){
                        d({elem: item, event: "focus"});
                    }
                }
            }
        },

        initModelData: function () {
            eBase.debug('[CURDTable.js][initModelData][enter]');
            var self = this;
            if (!self.cfg || !self.cfg.child) return;
            for (var i = 0; self.cfg.child.length; i++) {
                var obj = self.cfg.child[i];
                if (obj.type && obj.net && "select" === obj.type && "true" === obj.net) {

                    for (var key in obj) {
                        this.cobj[key] = obj[key];
                    }

                    eBase.send({'url': obj.url}).done(function (resp) {
                        self.setSelect(resp);

                    }).fail(function (resp) {
                        self.setSelect(resp);
                        w.layer.msg("获取数据失败");
                    });
                }
            }
        },

        setSelect: function (resp) {
            resp = resp || {};
            var list = resp.list || [];
            var self = this;

            //test code
            list = [{
                "mkt_id": "01",
                "mkt_name": "大唐电网"
            }, {
                "mkt_id": "02",
                "mkt_name": "国力电网"
            }, {
                "mkt_id": "03",
                "mkt_name": "xx交易市场名称"
            }];

            for (var i = 0; i < list.length; i++) {
                var otxt = list[i][self.cobj.showfield];
                $(self.cobj.el).append("<option value='" + list[i][self.cobj.idfield] + "'>" + otxt + "</option>")
            }

            $(self.cobj.el).val("");
        },

        initHideCols: function (pt) {
            var self = this;
            for (var i = 0; i < self.cfg.hideCols.length; i++) {
                pt.bootstrapTable("hideColumn", self.cfg.hideCols[i]);
            }
        },

        inHideCols: function (val) {
            var self = this;
            for (var i = 0; i < self.cfg.hideCols.length; i++) {
                if (val === self.cfg.hideCols[i]) {
                    return true;
                }
            }
            return false;
        },

        renderTable: function () {

            eBase.debug('[CURDTable.js][renderTable][enter]');

            var self = this;

            self.$t = $(self.cfg.t).bootstrapTable({
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

            self.$m = $(self.cfg.m).modal({show: false});

            self.initHideCols(self.$t);
            self.initDateInput();

            return;

            $(self.cfg.t).bootstrapTable({
                url: 'js/demo/customer.json',
                method: 'get',
                striped: true, //是否显示间隔色
                pagination: true, //是否分页
                sortable: false,
                cache: false, //是否启用缓存
                search: true, //是否显示搜索
                sortOrder: "asc",
                uniqueId: 'CId',
                sidePagination: "server",
                queryParamsType: "undefined",
                //queryParams: queryParams,
                pageNumber: 1, //初始化加载第一页，默认第一页
                pageSize: 10, //每页的记录行数（*）
                pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
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

        clearModal: function () {
            var self = this;
            self.$m.find('input[type="text"]').val("");
            self.$m.find('input[type="password"]').val("");
            self.$m.find('input[type="email"]').val("");
            self.$m.find('input[type="email"]').val("");
            self.$m.find('select').val("");
        },

        showModal: function (title, row) {

            var self = this;
            var def = {};
            def[self.uuid] = '';

            row = row || def;

            this.$m.data('id', row.id);
            self.$m.find('.modal-title').text(title);
            for (var name in row) {
                self.$m.find('input[name="' + name + '"]').val(row[name]);
                //self.$m.find('select[name="' + name + '"]').find("option[text='" + row[name] + "']").attr("selected", true);
                //var temp = self.$m.find('select[name="' + name + '"]');
                //var temp2 = temp.find("option[text='" + row[name] + "']").attr("selected", true);
                //var temp2 = temp.find("option:contains('" + row[name] + "')']");
                //var tempxxx = "xxxx";
            }
            self.$m.modal('show');
        },

        addButtonListeners: function () {
            var self = this;

            $(self.cfg.addBtn).click(function () {
                eBase.debug('[CURDTable.js][addButtonListeners][addBtn click handler]');
                self.addFlag = true;
                self.clearModal();
                self.showModal(self.cfg.addTitle);
            });
            $(self.cfg.editBtn).click(function () {
                eBase.debug('[CURDTable.js][addButtonListeners][editBtn click handler]');

                self.addFlag = false;
                var selections = $(self.cfg.t).bootstrapTable('getSelections');

                if (selections && selections.length == 0) {
                    w.layer.msg("请选择一条记录");
                    return;
                } else if (selections && selections.length > 1) {
                    w.layer.msg("一次不能编辑多条");
                    return;
                }
                self.showModal(self.cfg.editTitle, selections[0]);
            });
            $(self.cfg.delBtn).click(function () {
                eBase.debug('[CURDTable.js][addButtonListeners][openAccount_removeBtn click handler]');
                var selections = $(self.cfg.t).bootstrapTable('getSelections');
                if (selections && selections.length < 1) {
                    w.layer.msg("请选择要删除的数据");
                    return;
                }

                var delIndex = w.layer.confirm(self.cfg.confirmMsg, {
                    btn: ['删除', '取消'], //按钮
                    shade: false //不显示遮罩
                }, function () {
                    eBase.debug('[CURDTable.js][addButtonListeners][删除 click handler]');

                    var ids = [];

                    for (var i = 0; i < selections.length; i++) {
                        var item = selections[i][self.cfg.uuid];
                        //item[self.cfg.uuid] = selections[i][self.cfg.uuid];
                        item && ids.push(item);
                    }

                    self.delItem(ids);

                    w.layer.close(delIndex);

                }, function () {
                    eBase.debug('[CURDTable.js][addButtonListeners][取消 click handler]');
                });
            });

            self.$m && self.$m.find('.submit').click(function () {
                var row = {};
                var itemNames = [];
                self.$m.find('input[name]').each(function () {
                    //var l = $(this).parent().find("label").text();
                    itemNames.push($(this).attr('name'));
                    row[$(this).attr('name')] = $(this).val();
                });

                /*for (var i = 0; i < itemNames.length; i++) {
                    if (!self.inHideCols(itemNames[i]) && ("" == row[itemNames[i]] || undefined == row[itemNames[i]])) {
                        var msg = self.$m.find('input[name="' + itemNames[i] + '"]').parent().find("label").text();
                        w.layer.msg(msg + "不能为空");
                        return;
                    }
                }*/

                self.addItem(row);
            });
        },

        compileHeight: function () {
            var count = 0;
            var self = this;
            $(self.cfg.t).find("th[data-field]").each(function () {
                var input_hidden = $(this).data('hidden');
                if (!input_hidden) {
                    count++;
                }
            });
            return Math.ceil(count / 2) * 49 + 42 + 40 + 50 + 30;
        },

        addOrEdit: function (edittype, btn, val) {

            var self = this;

            if ("#" + btn.data("table") !== self.cfg.t) return;

            var pw = "800px";
            var ph = self.compileHeight() > self.cfg.maxheight ? self.cfg.maxheight + "px" : self.compileHeight() + "px";

            var tit = edittype ? "编辑" : "添加";
            var index = w.layer.open({
                id: 'my_layer',
                type: 1,
                title: tit,
                skin: "layui-layer-rim",
                closeBtn: !0,
                area: [pw, ph],
                shift: 2,
                shadeClose: !0,
                content: '<div id="app_layer_box"></div><div id="app_btn_box" class="row"></div>',
            });

            var wrap = $('<div id="contentBox" class="row form-horizontal m-t"></div>');
            var input_ids = [];

            $(self.cfg.t).find("th[data-field]").each(function () {

                var input_field = $(this).data('field');
                var input_hidden = $(this).data('hidden');
                var input_label = $(this).text() + "&nbsp:";

                if (!input_hidden) {

                    input_ids.push(input_field);

                    var item = $('<div class="col-md-6">' +
                        '<div class="form-group">' +
                        '<label class="col-sm-3 control-label">' + input_label + '</label>' +
                        '<div class="col-sm-9 form_box">' +
                        '<input type="text" id="' + input_field + '" class="form-control" placeholder="">' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    wrap.append(item);
                }
            });

            var buttonGroup = $('<div class="layui-layer-btn">' +
                '<button id="layer_OK_Button"  type="button" title="保存" class="btn btn-outline btn-default layui-layer-btn0">' +
                '<span>保存</span>' +
                '</button>' +
                '<button id="layer_Cancel_Button"  type="button" title="保存" class="btn btn-outline btn-default layui-layer-btn1">' +
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
                $(self.cfg.t).bootstrapTable('refresh');
            }).fail(function (result) {
                eBase.debug('[CURDTable.js][queryData][send fail]');
            });
        },

        trace: function (msg, row) {
            eBase.debug(msg + ":" + JSON.stringify(row));
        },

        /**
         * 增加,修改
         * */
        addItem: function (row) {
            var self = this;

            var url = self.addFlag ? self.cfg.addUrl : self.cfg.editUrl;
            var msg = self.addFlag ? "添加接口参数" : "编辑接口参数";

            self.trace("添加参数为：", row);

            eBase.send({'url': url, data: JSON.stringify(row)}).done(function () {
                eBase.debug('[CURDTable.js][addItem][send success]');
                w.layer.msg('保存成功');
                self.$m.modal('hide');
                self.$t.bootstrapTable('refresh');
            }).fail(function () {
                eBase.debug('[CURDTable.js][addItem][send failed]');
                self.$m.modal('hide');
                w.layer.msg('保存失败');
            });
        },

        delItem: function (ids) {
            var self = this;
            self.trace("删除参数：", ids);
            eBase.debug('[CURDTable.js][delItem]');
            eBase.send({'url': self.cfg.delUrl, data: JSON.stringify(ids)}).done(function () {
                eBase.debug('[CURDTable.js][delItem][send success]');
                self.$t.bootstrapTable('refresh');
                w.layer.msg('删除成功');
            }).fail(function () {
                eBase.debug('[CURDTable.js][delItem][send failed]');
                w.layer.msg('删除失败');
            });
        }
    };

    w.cur = CURDTable;

})(window, $, layer, laydate);