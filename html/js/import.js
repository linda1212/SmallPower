window.jsConfig = {
    jsBasePath: 'js',
    jQueryUrl: [{
        url: 'jquery.min.js'
    }],
    jsUrls: [ {
        url: 'jquery.min.js'
    },{
        url: 'pages/eBase.js'
    }, {
        url: 'vue.js'
    }, {
        url: 'bootstrap.min.js'
    }, {
        url: 'plugins/metisMenu/jquery.metisMenu.js'
    }, {
        url: 'plugins/slimscroll/jquery.slimscroll.min.js'
    }, {
        url: 'plugins/layer/layer.min.js'
    }, {
        url: 'plugins/dataTables/jquery.dataTables.js'
    }, {
        url: 'plugins/dataTables/dataTables.bootstrap.js'
    }, {
        url: 'plugins/treeview/bootstrap-treeview.js'
    }, {
        url: 'demo/treeview-demo.min.js'
    }, {
        url: 'startDataTable.js'
    }, {
        url: 'hplus.min.js'
    }, {
        url: 'contabs.min.js'
    }, {
        url: 'plugins/pace/pace.min.js'
    }, {
        url: 'plugins/echarts/echarts-all.js'
    }, {
        url: 'demo/echarts-demo.min.js'
    }],
    importJSFilesByList: function (list) {
        var self = this;
        for (var i = 0; i < list.length; i++) {
            document.write('<script language="javascript" src="' + self.jsBasePath + '\/' + list[i].url + '"></script>');
        }
    },
    importJQuery: function () {
        this.importJSFilesByList(this.jQueryUrl);
    },
    importJSFiles: function () {
        this.importJSFilesByList(this.jsUrls);
    },
    importOnlyBootstrap:function(){
        this.importJQuery();
    },
    importOnlyEChart:function(){

    },
    importBoostrapAndEChart:function(){

    },

    importIndepent:function(){

    }
};

window.jsConfig.importJSFiles();




