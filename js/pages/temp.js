$(function () {

    //1.��ʼ��Table
    var oTable = new TableInit();
    oTable.Init();

    //2.��ʼ��Button�ĵ���¼�
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});


var TableInit = function () {
    var oTableInit = new Object();
    //��ʼ��Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: '/Home/GetDepartment', //�����̨��URL��*��
            method: 'get', //����ʽ��*��
            toolbar: '#toolbar', //���߰�ť���ĸ�����
            striped: true, //�Ƿ���ʾ�м��ɫ
            cache: false, //�Ƿ�ʹ�û��棬Ĭ��Ϊtrue������һ���������Ҫ����һ��������ԣ�*��
            pagination: true, //�Ƿ���ʾ��ҳ��*��
            sortable: false, //�Ƿ���������
            sortOrder: "asc", //����ʽ
            queryParams: oTableInit.queryParams,//���ݲ�����*��
            sidePagination: "server", //��ҳ��ʽ��client�ͻ��˷�ҳ��server����˷�ҳ��*��
            pageNumber: 1, //��ʼ�����ص�һҳ��Ĭ�ϵ�һҳ
            pageSize: 10, //ÿҳ�ļ�¼������*��
            pageList: [10, 25, 50, 100], //�ɹ�ѡ���ÿҳ��������*��
            search: true, //�Ƿ���ʾ����������������ǿͻ������������������ˣ����ԣ����˸о����岻��
            strictSearch: true,
            showColumns: true, //�Ƿ���ʾ���е���
            showRefresh: true, //�Ƿ���ʾˢ�°�ť
            minimumCountColumns: 2, //�������������
            clickToSelect: true, //�Ƿ����õ��ѡ����
            height: 500, //�иߣ����û������height���ԣ�����Զ����ݼ�¼�������ñ��߶�
            uniqueId: "ID", //ÿһ�е�Ψһ��ʶ��һ��Ϊ������
            showToggle: true, //�Ƿ���ʾ��ϸ��ͼ���б���ͼ���л���ť
            cardView: false, //�Ƿ���ʾ��ϸ��ͼ
            detailView: false, //�Ƿ���ʾ���ӱ�
            columns: [{
                checkbox: true
            }, {
                field: 'Name',
                title: '��������'
            }, {
                field: 'ParentName',
                title: '�ϼ�����'
            }, {
                field: 'Level',
                title: '���ż���'
            }, {
                field: 'Desc',
                title: '����'
            },]
        });
    };

    //�õ���ѯ�Ĳ���
    oTableInit.queryParams = function (params) {
        var temp = { //����ļ������ֺͿ������ı���������һֱ����߸Ķ���������Ҳ��Ҫ�ĳ�һ����
            limit: params.limit, //ҳ���С
            offset: params.offset, //ҳ��
            departmentname: $("#txt_search_departmentname").val(),
            statu: $("#txt_search_statu").val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //��ʼ��ҳ������İ�ť�¼�
    };

    return oInit;
};
