$(function () {

    $('.menu .item').tab();

    var selectTags = [];
    var numRowsOptionServicios = [1];
    var numNumbers = 0;
    var loadMiGaleria = false;
    var selectMisFotos = [];
    AjaxLoadNumbers();
    AjaxloadOptionsServices({ tipo: "class" });
    AjaxGetUsersMensajes();
    AjaxAlarmMensajes();
    AjaxGetPreciosCreditos();
    AjaxGetMisCreditos();

    $.ajax({
        url: '../c_general/getCategorias',
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
        url: '../c_general/getDepartamentos',
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

    function AjaxLoadNumbers() {
        $("#divTelefonos").html("");
        numNumbers = 0;
        $.ajax({
            url: '../c_general/getCelularesByUser',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    cantVacias = 4 - data.length;
                    $.each(data, function (key, value) {
                        numNumbers++;
                        renderCelulares(numNumbers, value.id, value.celular);
                    });
                    for (var i = 0; i < cantVacias; i++) {
                        renderCelularesVacias();
                    }
                }
            }
        });
    }

    function AjaxCreateTags(id) {
        $("#tagCloud").html("");
        $.ajax({
            url: '../c_general/getEtiquetasByCategoria',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: id },
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (index, value) {
                        $("#tagCloud").append('<span class="badge badge-pill etiquetas cursorPointer itemTag fontFamilyRoboto" data-id="' + value.id + '">' + value.nombre + '</span>');
                    });
                }
            }
        });
    }

    function AjaxloadOptionsServices(obj) {

        var selector = { tiempo: ".inpTiempo", relaciones: ".inpRelaciones" };
        if (obj.tipo == "id") {
            selector.tiempo = "#inpTiempo" + obj.id;
            selector.relaciones = "#inpRelaciones" + obj.id;
        }

        $.ajax({
            url: '../c_general/getTiemposServicios',
            type: 'POST',
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $(selector.tiempo).append("<option value=" + value.id + ">" + value.valor + "</option>");
                    });
                }
            }
        });

        $.ajax({
            url: '../c_general/getRelacionesServicios',
            type: 'POST',
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $(selector.relaciones).append("<option value=" + value.id + ">" + value.valor + "</option>");
                    });
                }
            }
        });

    }

    function AjaxLoadCiudades(id) {
        $("#inpCiudades").html("");
        $.ajax({
            url: '../c_general/getCiudadesByDepartamento',
            type: 'POST',
            dataType: "json",
            data: { idDepartamento: id },
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#inpCiudades").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                    });
                }
            }
        });
    }

    function AjaxAlarmMensajes() {
        $.ajax({
            url: '../c_general/getAlarmaMensajesByUser',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    if (data[0].mensajes > 0) {
                        $("#tabMensajes").append('<span class="badge badge-pill badge-danger margin_left_5px fontFamilyRoboto fontSize11px">' + data[0].mensajes + '</span>');
                    }
                }
            }
        });
    }

    function AjaxSetUltimaVistaMensajes() {
        $.ajax({
            url: '../c_general/setUltimaVistaMensajes',
            type: 'POST'
        });
    }

    function AjaxAddNumber(number) {
        $.ajax({
            url: '../c_general/addNumber',
            type: 'POST',
            dataType: "json",
            data: { number: number },
            success: function (data) {
                if (data.resultado == true) {
                    AjaxLoadNumbers();
                    toastr.success(data.message);
                    //$("#modalNumber").modal("hide");
                } else {
                    toastr.error(data.message);
                }
            }
        });
    }

    function AjaxDeleteNumber(id) {
        $.ajax({
            url: '../c_general/deleteNumber',
            type: 'POST',
            dataType: "json",
            data: { id: id },
            success: function (data) {
                if (data.resultado == true) {
                    AjaxLoadNumbers();
                    toastr.success(data.message);
                    //$("#modalEliminarNumero").modal("hide");
                } else {
                    toastr.error(data.message);
                }
            }
        });
    }

    function AjaxGetMisCreditos() {
        $.ajax({
            url: '../c_general/getCreditosByUser',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    $("#spCreditos2").html('Tus créditos: ' + data[0]["cantidad"] + ' <i class="fas fa-coins"></i>');
                } else {
                    toastr.error("Error al cargar los créditos");
                }
            }
        });
    }

    function AjaxGetPreciosCreditos() {
        $.ajax({
            url: '../c_general/getPreciosCreditos',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#divPrecios").append('<div class="col-12 col-sm-4 col-md-2"><div class="card"><div class="card-body centradoVerticalHorizontal" style="height: 80px"><h5 class="card-title textCenter fontSize22px fontBold">' + value.creditos + '</h5><h6 class="fontFamilyRoboto">&nbsp;Créditos</h6></div><ul class="list-group list-group-flush"><li class="list-group-item textCenter fontSize18px fontFamilyRoboto paddingSuperiorInferior20px">' + formatCurrencyString(value.valor) + '</li></ul><div class="card-body backgroundPinkClaro textCenter cursorPointer hoverBackgroundPinkOscuro"><h4 class="colorWhite fontSize14px textUppercase fontWeight600">Comprar</h4></div></div></div>');
                    });
                } else {
                    toastr.error("Error al cargar los precios");
                }
            }
        });
    }

    function AjaxGetMisFotos() {
        $("#divMisFotos").html("");
        $.ajax({
            url: '../c_general/getFotosByUser',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#divMisFotos").append('<div class="card cursorPointer cardMiFoto displayNoneToI" data-id="' + value.id + '"><img src="../../uploads/anuncios/' + value.url + '" class="card-img-top"><i class="fas fa-check-circle iconSelectMisFotos"></i></div>');
                    });
                } else {
                    toastr.error("Error al cargar mis fotos");
                }
            }
        });
    }

    function limpiar() {
        selectTags = [];
        for (var i = 1; i <= numRowsOptionServicios.length; i++) {
            $("#rowOptionService" + (i + 1)).remove();
        }
        numRowsOptionServicios = [1];
        for (var i = 0; i < numNumbers; i++) {
            $("#inpWhat" + (i + 1)).prop("checked", false);
            $("#inpTel" + (i + 1)).prop("checked", false);
        }
        loadMiGaleria = false;
        selectMisFotos = [];
        $("#inpCategorias").val("N/A");
        AjaxCreateTags($("#inpCategorias").val());
        $("#inpDepartamentos").val("N/A");
        $("#inpCiudades").html('<option value="N/A">Ciudad *</option>');
        $("#inpTitulo").val("");
        $("#inpDescripcion").val("");
        $("#inpPrecio1").val("");
        $("#inpTiempo1").val("N/A");
        $("#inpRelaciones1").val("N/A");
        $("#inpAceptTerms").prop("checked", false);
        $("#pro-image").val("");
        $(".preview-images-zone").html("");
        $("#btnMiGaleria").text('Mi Galeria');
    }

    function AjaxGetUsersMensajes() {
        $.ajax({
            url: '../c_general/getUsuariosMensajes',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        if (key == 0) {
                            AjaxGetMensajes(value.correo);
                            $("#divRemitentes").append('<div class="rowRemitentes col-sm-12 borderSolidGray2 paddingSuperiorInferior15px hoverLeftSolidPink cursorPointer fontFamilyRoboto" data-correo="' + value.correo + '"><i class="fas fa-user fontSize22px paddingLeft15px colorGrisMasClaro"></i><label class="paddingLeft15px">' + value.correo + '</label><button class="btn btn-light btnMarkItemAnuncio fontWeight400 btnResponderMail height100porciento fontFamilyRoboto paddingSuperiorInferior5px" data-correo="' + value.correo + '"><span class="oi oi-share"></span> <br> Enviar mail</button></div>');
                        } else {
                            $("#divRemitentes").append("<div class='rowRemitentes col-sm-12 borderSolidGray2 paddingSuperiorInferior15px hoverLeftSolidPink cursorPointer fontFamilyRoboto' data-correo='" + value.correo + "'><i class='fas fa-user fontSize22px paddingLeft15px colorGrisMasClaro'></i><label class='paddingLeft15px'>" + value.correo + "</label></div>");
                        }
                    });
                } else {
                    toastr.error("Error al cargar los remitentes");
                }
            }
        });
    }

    function AjaxGetMensajes(correo) {
        $("#divMensajes").html("");
        $.ajax({
            url: '../c_general/getMensajesByUser',
            type: 'POST',
            dataType: "json",
            data: { correo: correo },
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#divMensajes").append('<div class="burbujaChat fontFamilyRoboto colorGrisOscuro"><p>' + value.mensaje + '</p><div class="textRight fontFamilyRoboto fontWeight300 colorGrisMenosOscuro"><small>Recibido: ' + value.fecha + '</small></div></div>');
                    });
                } else {
                    toastr.error("Error al cargar los mensajes");
                }
            }
        });
    }

    function loadImagenes(id) {
        var data = new FormData();
        jQuery.each(jQuery('#pro-image')[0].files, function (i, file) {
            data.append('file-' + i, file);
        });

        data.append('numFiles', $('#pro-image')[0].files.length);
        data.append('idAnuncio', id);

        jQuery.ajax({
            url: 'loadImages',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    limpiar();
                    toastr.success(data.mensaje);
                } else {
                    toastr.error(data.mensaje);
                }
            }
        });
    }

    function loadImagenesGaleria(id) {
        var stringData = JSON.stringify({
            imagenes: selectMisFotos
        });

        $.ajax({
            url: '../c_general/setImagenesAnuncioLocal',
            type: 'POST',
            dataType: "json",
            async: false,
            data: { data: stringData, idAnuncio: id },
            success: function (data) {
            }
        });
    }

    function renderCelulares(i, id, number) {
        $("#divTelefonos").append('<div class="col-sm-3"><div class="card"><div class="card-body textCenter"><h6 id="lblNumero' + id + '" class="card-subtitle mb-2 text-muted textCenter fontWeight600 colorGrisOscuroTels">' + number + '</h6><p class="card-text"><div class="form-group pull-left centradoVertical"><input id="inpWhat' + i + '" type="checkbox" name="inpWhat' + i + '" class="checkStyle margin_left_small" data-id="' + id + '"><label for="inpWhat' + i + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">WhatsApp</label></div><br><div class="form-group pull-left centradoVertical margin_top_small"><input id="inpTel' + i + '" type="checkbox" name="inpTel' + i + '" class="checkStyle margin_left_small"  data-id="' + id + '"><label for="inpTel' + i + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">Llamadas</label></div></p><br><br><br><a id="btnEliminar' + i + '" href="#" class="card-link margin0 colorRed hoverGrisClaro fontFamilyRoboto" data-id="' + id + '" onclick="eliminarNumero(this)" data-toggle="modal" data-target="#modalEliminarNumero">Eliminar</a></div></div></div>');
    }

    function renderCelularesVacias() {
        $("#divTelefonos").append('<div class="col-sm-3"><div class="card backgroundGrayDos colorWhite cursorPointer" style="height: 169px"><div class="card-body textCenter"><h6 class="card-subtitle mb-2 text-muted textCenter"></h6><p class="card-text"><div class="form-group"><img class="height80px" src="../../images/phone_plus.svg"></div></p><a href="#" class="card-link hoverGrisClaro fontFamilyRoboto" data-toggle="modal" data-target="#modalNumber">Agregar número</a></div></div></div>');
    }

    function addRowOptionsServicios(num) {
        $("#divRowsOptionsServicios").append('<div id="rowOptionService' + num + '" class="row margin_top_small rowOptionService"><div class="col-sm-3"><input type="text" class="form-control inputStyle" id="inpPrecio' + num + '" name="inpPrecio' + num + '" placeholder="Valor" data-type="currency" pattern="^\\$\\d{1,3}(,\\d{3})"></div><div class="col-sm-4"><select id="inpTiempo' + num + '" class="form-control inputStyle"><option value="N/A">Tiempo</option></select></div><div class="col-sm-4"><select id="inpRelaciones' + num + '" class="form-control inputStyle"><option value="N/A">Relaciones</option></select></div><div class="col-sm-1 centradoVertical"><button type="button" class="borderNone backgroudNone colorRed btnDeleteRowOptionService hoverGrisClaro outlineNone" data-id="' + num + '"><i class="far fa-2x fa-minus-square"></i></button></div></div>');
    }

    $("#inpCategorias").change(function () {
        AjaxCreateTags($(this).val());
        selectTags = [];
    });

    $("#inpDepartamentos").change(function () {
        AjaxLoadCiudades($(this).val());
    });

    $('body').on('click', '.itemTag', function () {
        if ($(this).data('select') == 1) {
            $(this).css('background-color', "#999");
            $(this).data('select', 0);
            var index = selectTags.indexOf($(this).data('id'));
            if (index > -1) {
                selectTags.splice(index, 1);
            }
        } else {
            if (selectTags.length >= 6) {
                toastr.info("Solo puede seleccionar 6 etiquetas");
                return false;
            }
            $(this).css('background-color', "#C501FE");
            $(this).data('select', 1);
            selectTags.push($(this).data('id'));
        }
    });

    $("#btnGuardarNumero").click(function () {
        AjaxAddNumber($("#inpNumber").val());
    });

    $("#btnEliminarNumero").click(function () {
        AjaxDeleteNumber($("#inpIdEliminar").val());
    });

    $('body').on('click', '.btnDeleteRowOptionService', function () {
        $("#rowOptionService" + $(this).data("id")).remove();
        var index = numRowsOptionServicios.indexOf($(this).data("id"));
        if (index > -1) {
            numRowsOptionServicios.splice(index, 1);
        }
    });

    $('body').on('keyup', 'input[data-type="currency"]', function () {
        formatCurrency($(this));
    });

    $('body').on('blur', 'input[data-type="currency"]', function () {
        formatCurrency($(this), "blur");
    });

    $("#btnAddRowOptionService").click(function () {
        numRowsOptionServicios.push(numRowsOptionServicios.length + 1);
        addRowOptionsServicios(numRowsOptionServicios.length);
        AjaxloadOptionsServices({ tipo: "id", id: numRowsOptionServicios.length });
    });


    $("#btnGuardar").click(function () {

        if ($("#inpCategorias").val() == "N/A") {
            toastr.warning("Debe escojer una categoria");
            return false;
        }

        if ($("#inpDepartamentos").val() == "N/A") {
            toastr.warning("Debe escojer un departamento");
            return false;
        }

        if ($("#inpCiudades").val() == "N/A") {
            toastr.warning("Debe escojer una ciudad");
            return false;
        }

        if ($("#inpTitulo").val().length < 50) {
            toastr.warning("Ingrese un titulo entre 50 y 200 caracteres");
            return false;
        }

        if ($("#inpTitulo").val().length > 200) {
            toastr.warning("el titulo no puede superar los 200 caracteres");
            return false;
        }

        if ($("#inpDescripcion").val().length < 400) {
            toastr.warning("Ingrese una descripcion con minimo 400 caracteres");
            return false;
        }

        if (!$("#inpAceptTerms").is(':checked')) {
            toastr.info("Debe aceptar los terminos y condiciones");
            return false;
        }

        var okOptionsServicios = true;
        var selectRowsOptions = [];
        $.each(numRowsOptionServicios, function (index, i) {
            if ($("#inpPrecio" + i).val() == "" && $("#inpTiempo" + i).val() == "N/A" &&
                $("#inpRelaciones" + i).val() == "N/A" && numRowsOptionServicios.length == 1) {
                return false;
            }
            if ($("#inpPrecio" + i).val() == "" || $("#inpTiempo" + i).val() == "N/A" ||
                $("#inpRelaciones" + i).val() == "N/A") {
                toastr.warning("Debe digitar todos los datos en las condiciones");
                okOptionsServicios = false;
                return false;
            }
            selectRowsOptions.push({
                "precio": $("#inpPrecio" + i).val(),
                "tiempo": $("#inpTiempo" + i).val(),
                "relaciones": $("#inpRelaciones" + i).val()
            });
        });

        if (!okOptionsServicios) { return false; }

        var selectNumber = [];
        for (var i = 1; i <= numNumbers; i++) {
            var OptionW = 0;
            var OptionC = 0;
            var idNum;
            if ($('#inpWhat' + i).prop('checked')) {
                OptionW = 1;
                idNum = $('#inpWhat' + i).data("id");
            }
            if ($('#inpTel' + i).prop('checked')) {
                OptionC = 1;
                idNum = $('#inpTel' + i).data("id");
            }

            if (OptionW == 1 || OptionC == 1) {
                selectNumber.push({
                    "idNum": idNum,
                    "optionW": OptionW,
                    "optionC": OptionC
                });
            }
        }


        var stringData = JSON.stringify({
            titulo: $("#inpTitulo").val(),
            descripcion: $("#inpDescripcion").val(),
            idCategoria: $("#inpCategorias").val(),
            etiquetas: selectTags,
            idCiudad: $("#inpCiudades").val(),
            condiciones: selectRowsOptions,
            telefonos: selectNumber,
        });

        $.ajax({
            url: '../c_general/addAnuncio',
            type: 'POST',
            dataType: "json",
            data: { data: stringData },
            success: function (data) {
                if (data.resultado == true) {
                    if (loadMiGaleria) {
                        loadImagenesGaleria(data.id);
                    }
                    loadImagenes(data.id);
                    toastr.success(data.message);
                } else {
                    toastr.error(data.message);
                }
            }
        });

    });

    $('body').on('click', '.rowRemitentes', function () {
        AjaxGetMensajes($(this).data("correo"));
        $(".rowRemitentes button").remove(":contains('Enviar')");
        $(this).append('<button class="btn btn-light btnMarkItemAnuncio fontWeight400 btnResponderMail height100porciento fontFamilyRoboto paddingSuperiorInferior5px" data-correo="' + $(this).data("correo") + '"><span class="oi oi-share"></span> <br> Enviar mail</button>');
    });

    $('body').on('click', '.btnResponderMail', function () {
        event.preventDefault();
        var email = $(this).data("correo");
        var subject = 'Respuesta mensaje privado en doneróticos.com';
        window.open('mailto:' + email + '?subject=' + subject + '&body=', '_blank');
    });

    $('body').on('click', '.ui .item', function () {
        if ($(this).data("tab") == "tMensajes") {
            $("#tabMensajes").html('MENSAJES');
            AjaxSetUltimaVistaMensajes();
        }
    });

    $('#modalMiGaleria').on('show.bs.modal', function (e) {
        if (!loadMiGaleria) {
            AjaxGetMisFotos();
        }
    });

    $('body').on('click', '.cardMiFoto', function () {
        $(this).toggleClass("filterBlur1pxToimg");
        $(this).toggleClass("displayNoneToI");
        var index = selectMisFotos.indexOf($(this).data('id'));
        if (index > -1) {
            selectMisFotos.splice(index, 1);
        } else {
            selectMisFotos.push($(this).data('id'));
        }
    });

    $('#btnSelectMiGaleria').click(function () {
        loadMiGaleria = true;
        if (selectMisFotos.length == 0) {
            $("#btnMiGaleria").text('Mi Galeria');
        } else {
            $("#btnMiGaleria").html('Mi Galeria <span class="badge badge-pill fontFamilyRoboto backgroudWhite colorBlue">' + selectMisFotos.length + ' Fotos Selecc.</span>');
        }

    });

    sizePage();

    function sizePage() {
        /* $('#divTabs').jqxTabs({
             height: $(window).height()
         });*/
    }
});

function eliminarNumero(args) {
    $("#inpIdEliminar").val($(args).data("id"));
    $("#lblEliminarNumero").text("Desea eliminar el numero " + $("#lblNumero" + $(args).data("id")).text() + " ?");
}