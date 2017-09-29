$(function () {
    $(".dataTables-example ").dataTable();
    var oTable = $("#editable ").dataTable();
    oTable.$("td ").editable("http://www.zi-han.net/theme/example_ajax.php ", {
        "callback ": function (sValue, y) {
            var aPos = oTable.fnGetPosition(this);
            oTable.fnUpdate(sValue, aPos[0], aPos[1])
        },
        "submitdata ": function (value, settings) {
            return {"row_id ": this.parentNode.getAttribute("id "), "column ": oTable.fnGetPosition(this)[2]}
        },
        "width ": "90% ",
        "height ": "100% "
    })
});

function fnClickAddRow() {
    $("#editable ").dataTable().fnAddData(["Custom row ", "New row ", "New row ", "New row ", "New row "])
}