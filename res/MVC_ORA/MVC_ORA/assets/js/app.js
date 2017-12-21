$(document).ready(function () {
    //alert("RUN");
    $("#btnGuardar").click(function () {
        $.ajax({
            type: "POST",
            url: "/SVC/btnGuardar",
            data: { "nombre": $("#txtNombre").val(), "apPat": $("#txtApPaterno").val(), "apMat": $("#txtApMaterno").val(), "sueldo": $("#txtSueldo").val() },
            success: function (data) {
                alert(data);
            }
        });
    });
});