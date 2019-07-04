$(function () {

    AjaxLoadEtiquetas();

    if (loginBack == false) {
        localStorage.setItem('userLogin', false);
    }

    // GET CITY CURRENT
    $.ajax({
        url: "https://geoip-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function (location) {
            console.log(location);
            $('#inpDepartamentos option:contains(' + location.state + ')').attr('selected', 'selected');
            AjaxLoadCiudades($('#inpDepartamentos option:contains(' + location.state + ')').val());
            $('#inpCiudades option:contains(' + location.city + ')').attr('selected', 'selected');
        },
        error: function (ex) {
            toastr.warning("Error obtener tu ubicacion actual");
        }
    });


    $.ajax({
        url: 'index.php/c_general/getCategorias',
        type: 'POST',
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.resultado == true) {
                $.each(data.data, function (key, value) {
                    $("#inpCategorias").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                });
            }
        }
    });

    $.ajax({
        url: 'index.php/c_general/getDepartamentos',
        type: 'POST',
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.resultado == true) {
                $.each(data.data, function (key, value) {
                    $("#inpDepartamentos").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                });
            }
        }
    });

    function AjaxLoadCiudades(id) {
        $("#inpCiudades").html("<option value='NaN'>Todas las ciudades</option>");
        $.ajax({
            url: 'index.php/c_general/getCiudadesByDepartamento',
            type: 'POST',
            dataType: "json",
            data: { idDepartamento: id },
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#inpCiudades").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                    });
                }
            }
        });
    }

    var arrayEtiquetas = [[], [], [], [], [], []];

    function prepareDataEtiquetas(i, push, padre) {
        arrayEtiquetas[i].padre = padre;
        var temp = arrayEtiquetas[i];
        temp.push({ "id": push.id, "nombre": push.nombre });
        arrayEtiquetas[i] = temp;
    }

    function AjaxLoadEtiquetas() {
        $.ajax({
            url: 'index.php/c_general/getEtiquetas',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        switch (value.id_categoria) {
                            case '1': // PRE
                                prepareDataEtiquetas(0, value, "#divCatPre");
                                break;
                            case '2': // MA
                                prepareDataEtiquetas(1, value, "#divCatMa");
                                break;
                            case '3': // TRA
                                prepareDataEtiquetas(2, value, "#divCatTra");
                                break;
                            case '4': // S
                                prepareDataEtiquetas(3, value, "#divCatS");
                                break;
                            case '5': // G
                                prepareDataEtiquetas(4, value, "#divCatG");
                                break;
                            case '6': // O
                                prepareDataEtiquetas(5, value, "#divCatO");
                                break;
                        }
                    });
                    renderCategoria();
                }
            }
        });
    }


    function renderCategoria() {
        $.each(arrayEtiquetas, function (keyData, data) {
            var count = 1;
            $(data.padre).append('<ul class="list-group list-group-horizontal fontSize12px width100porciento ulEtiquetas"></ul>');
            $.each(data, function (key, array) {
                if (count > 3) {
                    $(".ulEtiquetas").removeClass("ulEtiquetas");
                    $(data.padre).append('<ul class="list-group list-group-horizontal fontSize12px width100porciento ulEtiquetas"></ul>');
                    count = 1;
                }
                $(".ulEtiquetas").append('<li id="liEtiqueta' + array.id + '" class="list-group-item list-group-item-light width33porciento fontFamilyRoboto fontWeight300 colorGrisOscuro padding0 borderRadius0px paddingSuperiorInferior3px centradoVerticalHorizontal backgroundGrayMasClaroHover cursorPointer liEtiqueta" data-id="' + array.id + '">' + array.nombre + '</li>');
                count++;
            });
            $(".ulEtiquetas").removeClass("ulEtiquetas");
        });
    }


    $("#inpDepartamentos").change(function () {
        AjaxLoadCiudades($(this).val());
    });

    $(".hCategoria").click(function () {
        // ENVIAR PARAMETROS
        idCategoria = $(this).data("id");
        categoria = $(this).text();
        idEtiqueta = "NaN";
        etiqueta = "NaN";
        idDepartamento = $("#inpDepartamentos").val();
        idCiudad = $("#inpCiudades").val();
        text = "NaN";
        redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text);
    });

    $('body').on('click', '.liEtiqueta', function () {
        // ENVIAR PARAMETROS
        idCategoria = $(this).parent().parent().children(':first-child').data("id");
        categoria = $(this).parent().parent().children(':first-child').text();
        idEtiqueta = $(this).data("id");
        etiqueta = $(this).text();
        idDepartamento = $("#inpDepartamentos").val();
        idCiudad = $("#inpCiudades").val();
        text = "NaN";
        redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text);
    });

    $("#btnBuscar").click(function () {
        // ENVIAR PARAMETROS
        idCategoria = $("#inpCategorias").val();
        categoria = $("#inpCategorias option:selected").text();
        idEtiqueta = "NaN";
        etiqueta = "NaN";
        idDepartamento = $("#inpDepartamentos").val();
        idCiudad = $("#inpCiudades").val();
        text = $("#inpTextBuscar").val();
        redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text);
    });

    function redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text) {
        $(location).attr('href', urlProyect() + 'c_app/vstListaAnuncios?categ=' + categoria + '_' + idCategoria + '&etiq=' + etiqueta + '_' + idEtiqueta + '&state=' + idDepartamento + '&city=' + idCiudad + '&text=' + text);
    }

});