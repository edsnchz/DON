$(function () {

    AjaxGetConceptosDenuncias();

    if (isMobileAndTablet()) {
        AjaxInsertAud(idAnuncio, "VISTA_MOVIL");
    } else {
        AjaxInsertAud(idAnuncio, "VISTA_PC");
    }

    var owl = $('.carousel-tops');
    owl.owlCarousel({
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
    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
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
        },
        error: function (data) {
            toastr.error("Error al consultar los departamentos, porfavor intente nuevamente");
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
        },
        error: function (data) {
            toastr.error("Error al consultar las categorias, porfavor intente nuevamente");
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
                        $("#divMotivosDenuncia").append('<div class="input-group paddingSuperiorInferior5px"><div class="input-group-prepend outlineNone"><div class="input-group-text"><input type="radio" name="inpRConceptoDenuncia" data-id="' + value.id + '"></div></div><input type="text" class="form-control outlineNone fontFamilyRoboto fontSize14px" readonly value="' + value.nombre + '"></div>');
                    });
                }
            },
            error: function (data) {
                toastr.error("Error al consultar los conceptos de denuncias, porfavor intente nuevamente");
            }
        });
    }

    function AjaxCreateDatosCarousel(idCategoria, idDepartamento) {
        for (var i = 0; i < $('.item').length; i++) {
            owl.trigger('remove.owl.carousel', i);
        }
        owl.trigger('refresh.owl.carousel');

        $.ajax({
            url: '../c_general/getAnunciosCarousel',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: idCategoria, idDepartamento: idDepartamento },
            success: function (data) {
                if (data.resultado == true) {
                    let datos = data.data;
                    if (datos.length == 0) {
                        owl.trigger('add.owl.carousel', [createItemCarouselVacioPlatino(), 0]).trigger('refresh.owl.carousel');
                    } else {
                        let count = 0;
                        $.each(datos, function (key, value) {
                            let div = (value.url == null || value.url == "") ? createItemCarouselVacioPlatino() : createItemCarouselPlatino(value.id, value.url);
                            owl.trigger('add.owl.carousel', [div, count]).trigger('refresh.owl.carousel');
                            count++;
                        });
                    }
                }
            },
            error: function (data) {
                toastr.error("Error al cargar el carousel, porfavor intente nuevamente");
            }
        });
    }

    function createItemCarouselPlatino(id, url) {
        return '<div class="item itemCarousel backgroundGrayDos sombraPequeña cursorPointer" data-id="' + id + '"><img src="../../uploads/anuncios/' + url + '" class="imgItemCarousel sombraPequeña"></div>';
    }

    function createItemCarouselVacioPlatino() {
        return '<div class="item itemCarousel backgroundGrayDos sombraPequeña padding18px"><img src="../../images/camera.svg" class="imgItemCarouselDefault"></div>';
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
            },
            error: function (data) {
                toastr.error("Error al agregar denuncia, porfavor intente nuevamente");
            }
        });
    }

    function AjaxGetTopFreeActuales(id) {
        $.ajax({
            url: '../c_general/getPromocionTopFreeActiva',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: id },
            success: function (data) {
                if (data.resultado == true) {
                    let datos = data.data;
                    if (datos.length >= 1) {
                        $("#btnAceptarTopFree").prop("disabled", true);
                        $("#divAlertMaximoTopFree").removeClass("displayNone");
                        $("#divAlertMaximoTopFree").addClass("displayBlock");
                    } else {
                        $("#btnAceptarTopFree").prop("disabled", false);
                        $("#divAlertMaximoTopFree").removeClass("displayBlock");
                        $("#divAlertMaximoTopFree").addClass("displayNone");
                    }
                } else {
                    toastr.error("Error al cargar subidas individuales programadas");
                }
            },
            error: function (data) {
                toastr.error("Error al consultar, porfavor intente nuevamente");
            }
        });
    }

    function AjaxInsertPromocionAnuncioNOW(id, idOpcion) {
        let rtn;
        $.ajax({
            url: '../c_general/insertPromocionAnuncioNow',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: id, idOpcion: idOpcion },
            async: false,
            success: function (data) {
                rtn = data;
            }
        });
        return rtn;
    }

    function AjaxValidIdAnuncioByUser(id) {
        let rtn;
        $.ajax({
            url: '../c_general/validIdAnuncioByUser',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: id },
            async: false,
            success: function (data) {
                rtn = data;
            }
        });
        return rtn;
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
            },
            error: function (data) {
                toastr.error("Error al enviar el mensaje, porfavor intente nuevamente");
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
        },
        error: function (data) {
            toastr.error("Error al cargar la auditoria, porfavor intente nuevamente");
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
        },
        error: function (data) {
            toastr.error("Error al consultar, porfavor intente nuevamente");
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
                    $("#labelDescripcion").html(data[0].descripcionFormat);
                    $("#lblFechaCreacion").text("Fecha creación: " + data[0].fechaCreacionFormat);
                    $("#lblUltimaEdicion").text("Última Edición: " + data[0].fechaUltEdicionFormat);
                    $("#inpCategorias").val(data[0].id_categoria);
                    $('#inpDepartamentos').val(data[0].id_departamento);
                    AjaxLoadCiudades($('#inpDepartamentos').val());
                    $('#inpCiudades').val(data[0].id_ciudad);
                    $("#eMapCiudad").text($("#inpCiudades option:selected").text());
                    $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
                    $("#eMapCategoria").text(data[0].categoria);

                    document.title = (data[0].titulo.substring(0, 60)) + "...";

                    AjaxCreateDatosCarousel(data[0].id_categoria, data[0].id_departamento);

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
                            spanWhat = '<span class="borderRadius0px btnWhats input-group-text whatActive cursorPointer" title="Enviar WhatsApp" data-celular=' + value.celular + '><i class="fab fa-whatsapp"></i></span>';
                        } else {
                            spanWhat = '<span class="borderRadius0px btnWhats input-group-text optionsNumberInactive"><i class="fab fa-whatsapp"></i></span>';
                        }
                        if (value.opcion_2_call == 1) {
                            spanCall = '<span class="borderRadius0px btnCalls input-group-text phoneActive cursorPointer" title="Llamar" data-celular=' + value.celular + '><i class="fas fa-phone"></i></span>';
                        } else {
                            spanCall = '<span class="borderRadius0px btnCalls input-group-text optionsNumberInactive"><i class="fas fa-phone"></i></span>';
                        }
                        $("#divCelulares").append('<div class="input-group margin_top_medium"><input type="number" class="borderRadius0px btn-link colorGrisOscuro form-control text-center fontSize17px fontWeight600 backgroudWhite inptsCelulares cursorPointer" title="Buscar anuncios con este numero" readonly value="' + value.celular + '"><div class="input-group-append">' + spanWhat + spanCall + '</div></div>');
                    });
                    // SET CONDICIONES
                    $.each(data["condiciones"], function (index, value) {
                        $("#divCondiciones").append('<div class="row margin_top_medium backgroundGrayDos margin_laterales_0px"><div class="col-5 centradoVerticalHorizontal" style="border: 1px solid gray;"><div class="margin0 text-center fontFamilyRoboto fontWeight600 fontSize14px colorGrisOscuro">' + value.precio + '</div></div><div class="col-7 text-center"><div class="row"><div class="col-12 text-center fontSize12px fontFamilyRoboto colorGrisOscuro borderBottomSolid1pxGray">' + value.tiempo + '</div><div class="col-12 text-center fontSize12px fontFamilyRoboto colorGrisOscuro">' + value.relaciones + '</div></div></div></div>');
                    });

                }
            },
            error: function (data) {
                toastr.error("Error al consultar el anuncio, porfavor intente nuevamente");
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
            $(".divCTACarousel").addClass("moveOut");
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

    $('body').on('click', '.itemCarousel', function () {
        // ENVIAR PARAMETROS
        var id = $(this).data("id");
        $(location).attr('href', urlProyect() + 'anuncio?id=' + id);
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
        let params = createParamsUrl_V1(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text);
        $(location).attr('href', urlProyect() + 'anuncios' + params);
    }

    $('body').on('click', '.btnWhats', function () {
        if (typeof $(this).data("celular") !== "undefined") {
            AjaxInsertAud(idAnuncio, "CLICK_WHAT");
            window.open("https://wa.me/57" + $(this).data("celular") + "?text=Hola! vi tu anuncio en doneroticos.com");
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
        if (typeof $("input[name='inpRConceptoDenuncia']:checked").data("id") == "undefined") {
            toastr.warning("Debe escojer un motivo");
            return false;
        }
        if ($("#inpTextDenunciar").val().length < 10) {
            toastr.warning("Ingrese minimo 10 caracteres");
            return false;
        }
        AjaxAddDenuncia(idAnuncio, $("input[name='inpRConceptoDenuncia']:checked").data("id"), $("#inpTextDenunciar").val());
    });


    $("#btnTopFree").click(function () {
        if (localStorage.getItem("userLogin") === "false") {
            $(location).attr('href', urlProyect() + 'login');
            localStorage.setItem('urlBeforeLogin', "usuario?tab=1");
        } else {
            let res = AjaxValidIdAnuncioByUser(idAnuncio);
            if (res.data == true) {
                AjaxGetTopFreeActuales(idAnuncio);
                $("#modalTopFree").modal("show");
            } else {
                toastr.warning("Este anuncio no pertenece a tu cuenta");
            }
        }
    });

    $("#btnAceptarTopFree").click(function () {
        var result = AjaxInsertPromocionAnuncioNOW(idAnuncio, 16);
        if (result.resultado) {
            AjaxGetTopFreeActuales(idAnuncio);
            toastr.success(result.message);
        } else {
            toastr.error(result.message);
        }
    });

    $("#eMapInicio").click(function () {
        $(location).attr('href', urlProyectShort());
    });

    loadDataAnuncio(idAnuncio);

});