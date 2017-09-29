function loadjscssfile(filename, filetype)
{
    var fileref;

    if (filetype=="css")
    {
        fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);

    } else if(filetype=="icon") {
        fileref=document.createElement("link");
        fileref.setAttribute("rel", "shortcut icon");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

var baseurl = "css";

loadjscssfile(baseurl + "favicon.ico", "icon");
loadjscssfile(baseurl + "\/font-awesome.min93e3.css", "css");
loadjscssfile(baseurl + "\/animate.min.css", "css");
loadjscssfile(baseurl + "\/style.min862f.css", "css");
loadjscssfile(baseurl + "\/plugins/dataTables/dataTables.bootstrap.css", "css");
loadjscssfile(baseurl + "\/plugins\/treeview\/bootstrap-treeview.css", "css");


