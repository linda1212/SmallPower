window.jsConfig = {
    jsBasePath: 'js',
    baseUrls: [{
        //base start
        url: 'jquery.min.js'
    }, {
        url: 'pages/eBase.js'
    }, {
        url: 'vue.js'
    }, {
        url: 'bootstrap.min.js'
    }, {
        //tree view start
        url: 'plugins/treeview/bootstrap-treeview.js'
    }, {
        url: 'demo/treeview-demo.min.js'
    }, {
        //dataTables
        url: 'plugins/jeditable/jquery.jeditable.js'
    }, {
        url: 'plugins/dataTables/jquery.dataTables.js'
    }, {
        url: 'plugins/dataTables/dataTables.bootstrap.js'
    }, {
        url: 'startDataTable.js'
    }],
    importJSFilesByList: function (list) {
        var self = this;
        for (var i = 0; i < list.length; i++) {
            document.write('<script language="javascript" src="' + self.jsBasePath + '\/' + list[i].url + '"></script>');
        }
    },
    initNormalPages: function () {
        this.importJSFilesByList(this.baseUrls);
    }
};

window.jsConfig.initNormalPages();