/// <reference path="../../Service.svc" />
$(function () {
    //LISTA DE MENUS
    GC_Web.Lista_Menu();
});

var GC_Web = (function (obj) {
    obj.url = "Frm_Principal.aspx/";

    //Lista Menu de Opciones
    obj.Lista_Menu = function () {
        $.ajax({
            async: false,
            type: "POST",
            url: obj.url + "getMenuPerfil",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var data = (typeof response.d) == "string" ? eval("(" + response.d + ")") : response.d;
                var hijo = data;
                var hijo_1 = data;
                var nieto = data;
                if (data.length > 0) {
                    var item = "";
                    item += "<ul class='sidebar-menu'>";
                    //1° Nivel
                    for (var i = 0; i < data.length; i++) {
                        if ((data[i].in_PadreID == 0)) {
                            item += "<li class='treeview'><a href='" + data[i].vc_Url + "'><i class='" + data[i].vc_Imagen + "'></i><span>" + data[i].vc_NomMenu + "</span><i class='fa fa-angle-left pull-right'></i></a>";
                            item += "<ul class='treeview-menu'>";

                            //2º Nivel
                            for (var h = 0; h < hijo.length; h++) {
                                if (data[i].in_MenuID == hijo[h].in_PadreID) {
                                    item += "<li><a href='" + hijo[h].vc_Url + "' ><i class='" + data[h].vc_Imagen + "'></i>" + hijo[h].vc_NomMenu + "</a></li>";
                                }
                            }
                            item += "</ul></li>"
                        }
                    }//Fin for 1° Nivel
                    item += "</ul>"
                    $("#divMenu_Horiz").append(item);
                }
            }
        });//ajax
    }; // Fin Lista Menu

   return obj;
}(GC_Web || {}));

function JQ_Logout() {
    var url = "Frm_Principal.aspx/";
    new Messi('Desea cerrar su session actual?', {
        modal: true, center: true,
        title: 'Confirmacion', titleClass: 'anim error', buttons: [{ id: 0, label: 'SI', class: 'btn-success', val: true }, { id: 1, label: 'NO', class: 'btn-danger', val: false }], callback: function (val) {
            if (val == true) {
                if (sessionStorage.getItem("sePerfil") != null) {
                    sessionStorage.removeItem("sePerfil");
                }
                $.ajax({
                    async: false,
                    type: "POST",
                    url: url + "cerrarSession",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var xobj = data.d;
                        if (xobj === 1) {
                            location.href = 'Login.aspx';
                        }
                    }
                }); // Fin ajax	
            } // Fin del IF
        } // Fin title
    }); // Fin Messi
};
