(function () {

    function CMP_Module() {
    }

    CMP_Module.prototype = {
        test: function () {
            console.log("this is test function");
        }
    };

    window.cmp = new CMP_Module();
})();

$(function () {

    console.log("categorypriceManager.js load end");

    /*$('#openAccount_table').DataTable({
        dom: "Tfrtip",
        ajax: "assets/php/table.admins.php",
        columns: [
            {data: "id"},
            {data: "name"},
            {data: "joindate"},
            {data: "section"},
            {data: "tutor"},
            {data: "lesson1"},
            {data: "lesson2"},
            {data: "lesson3"},
            {data: "versus"},
            {data: "insults"}
        ],
        tableTools: {
            sRowSelected: "os",
            aButtons: [
                {sExtends: "editor_create", editor: editor},
                {sExtends: "editor_edit", editor: editor},
                {sExtends: "editor_remove", editor: editor}
            ]
        }
    });*/

});