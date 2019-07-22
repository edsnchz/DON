$(function () {

    AjaxGetConceptosDenuncias();

    $('.carousel-tops').owlCarousel({
        items: 15,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        center: true,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
                autoplayTimeout: 3000,
            },
            800: {
                items: 6,
            },
            1024: {
                items: 12,
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

    function AjaxLoadCiudades(id) {
        $("#inpCiudades").html("<option value='NaN'>Todas las ciudades</option>");
        $.ajax({
            url: '../c_general/getCiudadesByDepartamento',
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

    function AjaxGetConceptosDenuncias() {
        $.ajax({
            url: '../c_general/getConceptosDenuncias',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#divMotivosDenuncia").append('<div class="input-group paddingSuperiorInferior5px"><div class="input-group-prepend outlineNone"><div class="input-group-text"><input type="radio" name="inpRConceptoDenuncia" data-id="' + value.id + '"></div></div><input type="text" class="form-control outlineNone" readonly value="' + value.nombre + '"></div>');
                    });
                }
            }
        });
    }

    function AjaxAddDenuncia(idAnuncio, concepto, texto) {
        $.ajax({
            url: '../c_general/addDenuncia',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: idAnuncio, concepto: concepto, texto: texto },
            success: function (data) {
                if (data.resultado == true) {
                    toastr.success(data.message);
                    $("#inpTextDenunciar").val("")
                } else {
                    toastr.error(data.message);
                }
            }
        });
    }

    function AjaxSendMessage(correo, mensaje) {
        $.ajax({
            url: '../c_general/sendPrivateMessage',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: idAnuncio, correo: correo, mensaje: mensaje },
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    toastr.success(data.message);
                    $("#inpCorreoMensajePrivado").val("")
                    $("#inpTextMensajePrivado").val("")
                } else {
                    toastr.error(data.message);
                }
            }
        });
    }

    $.ajax({
        url: '../c_general/getAuditoriaByAnuncio',
        type: 'POST',
        dataType: "json",
        data: { id: idAnuncio },
        success: function (data) {
            if (data.resultado == true) {
                data = data.data;
                $.each(data, function (key, value) {
                    switch (value.clase) {
                        case "HOY":
                            switch (value.tipo) {
                                case "VISTA":
                                    $("#lblVistasHoy").text(value.valor);
                                    break;
                                case "CLICK_WHAT":
                                    $("#lblWhatsAppHoy").text(value.valor);
                                    break;
                                case "CLICK_CALL":
                                    $("#lblCallsHoy").text(value.valor);
                                    break;
                            }
                            break;
                        case "TOTAL":
                            switch (value.tipo) {
                                case "VISTA":
                                    $("#lblVistasTotal").text(value.valor);
                                    break;
                                case "CLICK_WHAT":
                                    $("#lblWhatsAppTotal").text(value.valor);
                                    break;
                                case "CLICK_CALL":
                                    $("#lblCallsTotal").text(value.valor);
                                    break;
                            }
                            break;
                    }
                });
            }
        }
    });


    function createObjChart(title, colors, data) {
        var obj = {
            label: title,
            data: data,
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 1
        };
        return obj;
    }

    $.ajax({
        url: '../c_general/getAuditoriaGraficoByAnuncio',
        type: 'POST',
        dataType: "json",
        data: { id: idAnuncio },
        success: function (data) {
            if (data.resultado == true) {
                data = data.data;
                var dias = [];
                var objVistas = [];
                var objWhat = [];
                var objCall = [];
                $.each(data, function (key, value) {
                    dias.push(value.dia);
                    objVistas.push(value.vistas);
                    objWhat.push(value.cwhat);
                    objCall.push(value.ccall);
                });

                var objs = [createObjChart("Visitas", { "border": 'rgba(197, 1, 254, 1)', "background": 'rgba(197, 1, 254, 0.2)' }, objVistas),
                createObjChart("WhatsApp", { "border": 'rgba(0, 219, 109, 1)', "background": 'rgba(0, 219, 109, 0.4)' }, objWhat),
                createObjChart("Llamadas", { "border": 'rgba(3, 169, 244, 1)', "background": 'rgba(3, 169, 244, 0.4)' }, objCall)];

                createChart(dias, objs);
            }
        }
    });

    function createChart(dias, data) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 10,
                        boxWidth: 20
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    function loadDataAnuncio(id) {
        $.ajax({
            url: '../c_general/getAnuncioById',
            type: 'POST',
            dataType: "json",
            data: { id: id },
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    // SET DATOS GENERALES
                    $("#labelTitulo").text(data[0].titulo);
                    $("#labelDescripcion").text(data[0].descripcion);
                    $("#lblFechaCreacion").text("F. Creacion: " + data[0].fechaCreacionFormat);
                    $("#lblUltimaEdicion").text("Ult. Edicion: " + data[0].fechaUltEdicionFormat);
                    $("#inpCategorias").val(data[0].id_categoria);
                    $('#inpDepartamentos').val(data[0].id_departamento);
                    AjaxLoadCiudades($('#inpDepartamentos').val());
                    $('#inpCiudades').val(data[0].id_ciudad);
                    $("#eMapCiudad").text($("#inpCiudades option:selected").text());
                    $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
                    $("#eMapCategoria").text(data[0].categoria);

                    // SET ETIQUETAS
                    $.each(data["etiquetas"], function (index, value) {
                        $("#divEtiquetas").append('<span class="badge badge-pill etiquetasAnunciosPequeñas fontFamilyRoboto fontSize12px">' + value.nombre + '</span>');
                    });
                    // SET IMAGENES
                    $.each(data["imagenes"], function (index, value) {
                        $("#divImagenes").append('<div class="card"><img src="../../uploads/anuncios/' + value.url + '" class="card-img-top"></div>');
                    });
                    // SET NUMEROS
                    $.each(data["celulares"], function (index, value) {
                        var spanWhat;
                        var spanCall;
                        if (value.opcion_1_wp == 1) {
                            spanWhat = '<span class="btnWhats input-group-text whatActive cursorPointer" title="Enviar WhatsApp" data-celular=' + value.celular + '><i class="fab fa-whatsapp"></i></span>';
                        } else {
                            spanWhat = '<span class="btnWhats input-group-text optionsNumberInactive"><i class="fab fa-whatsapp"></i></span>';
                        }
                        if (value.opcion_2_call == 1) {
                            spanCall = '<span class="btnCalls input-group-text phoneActive cursorPointer" title="Llamar" data-celular=' + value.celular + '><i class="fas fa-phone"></i></span>';
                        } else {
                            spanCall = '<span class="btnCalls input-group-text optionsNumberInactive"><i class="fas fa-phone"></i></span>';
                        }
                        $("#divCelulares").append('<div class="input-group margin_top_medium"><input type="number" class="btn-link colorGrisOscuro form-control text-center fontSize18px fontBold backgroudWhite inptsCelulares cursorPointer" title="Buscar anuncios con este numero" readonly value="' + value.celular + '"><div class="input-group-append">' + spanWhat + spanCall + '</div></div>');
                    });
                    // SET CONDICIONES
                    $.each(data["condiciones"], function (index, value) {
                        $("#divCondiciones").append('<div class="row margin_top_small backgroundGrayDos margin_laterales_0px"><div class="col-sm-5 centradoVerticalHorizontal" style="border: 1px solid gray;"><div class="margin0 text-center fontFamilyRoboto colorGrisOscuro">' + value.precio + '</div></div><div class="col-sm-7 text-center"><div class="row"><div class="col-sm-12 text-center fontSize12px fontFamilyRoboto colorGrisOscuro borderBottomSolid1pxGray">' + value.tiempo + '</div><div class="col-sm-12 text-center fontSize12px fontFamilyRoboto colorGrisOscuro">' + value.relaciones + '</div></div></div></div>');
                    });

                }
            }
        });
    }

    $("#inpDepartamentos").change(function () {
        AjaxLoadCiudades($(this).val());
    });

    if (localStorage.getItem("userLogin") === "true") {
        setTimeout(function () {
            $(".divCTACarousel").addClass("move");
            $("#divCarouselPadre").addClass("pulse");
        }, 5000);

        setTimeout(function () {
            $(".divCTACarousel").addClass("displayNone");
            $("#divCarouselPadre").removeClass("pulse");
        }, 15000);
    }

    $("#btnBuscar").click(function () {
        // ENVIAR PARAMETROS
        idCategoria = $("#inpCategorias").val();
        categoria = $("#inpCategorias option:selected").text();
        idEtiqueta = "NaN";
        etiqueta = "NaN";
        idDepartamento = $("#inpDepartamentos").val();
        idCiudad = $("#inpCiudades").val();
        text = ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val();
        redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text);
    });

    $('body').on('click', '.inptsCelulares', function () {
        // ENVIAR PARAMETROS
        redirectAnuncios("NaN", "Todas las categorías", "NaN", "NaN", "NaN", "NaN", $(this).val());
    });

    $("#eMapCategoria").click(function () {
        // ENVIAR PARAMETROS
        idCategoria = $("#inpCategorias").val();
        categoria = $("#inpCategorias option:selected").text();
        idEtiqueta = "NaN";
        etiqueta = "NaN";
        idDepartamento = $("#inpDepartamentos").val();
        idCiudad = $("#inpCiudades").val();
        text = "NaN";
        redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text);
    });

    function redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text) {
        $(location).attr('href', urlProyect() + 'c_app/vstListaAnuncios?categ=' + categoria + '_' + idCategoria + '&etiq=' + etiqueta + '_' + idEtiqueta + '&state=' + idDepartamento + '&city=' + idCiudad + '&text=' + text);
    }

    $('body').on('click', '.btnWhats', function () {
        if (typeof $(this).data("celular") !== "undefined") {
            AjaxInsertAud(idAnuncio, "CLICK_WHAT");
            window.open("https://wa.me/57" + $(this).data("celular") + "?text=Hola! vi tu anuncio en doneróticos.com");
        }
    });

    $('body').on('click', '.btnCalls', function () {
        if (typeof $(this).data("celular") !== "undefined") {
            AjaxInsertAud(idAnuncio, "CLICK_CALL");
            //window.open($(this).data("celular"));
            //<a href="tel:3012952361"></a>
            window.location.assign("tel:" + $(this).data('celular'));
        }
    });

    $("#btnAceptarMensaje").click(function () {
        if (!validEmail($("#inpCorreoMensajePrivado").val())) {
            toastr.warning("Debe digitar un correo valido");
            return false;
        }
        if ($("#inpTextMensajePrivado").val().length < 10) {
            toastr.warning("Ingrese minimo 10 caracteres");
            return false;
        }
        AjaxSendMessage($("#inpCorreoMensajePrivado").val(), $("#inpTextMensajePrivado").val());
    });

    $("#btnAceptarDenuncia").click(function () {
        AjaxAddDenuncia(idAnuncio, $("input[name='inpRConceptoDenuncia']:checked").data("id"), $("#inpTextDenunciar").val());
    });

    $("#eMapInicio").click(function () {
        $(location).attr('href', urlProyectShort());
    });

    loadDataAnuncio(idAnuncio);

});