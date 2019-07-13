$(function () {

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
            AjaxLoadCiudades($('#inpDepartamentos').val());
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

    $.ajax({
        url: '../c_general/getVistasAuditoriaByAnuncio',
        type: 'POST',
        dataType: "json",
        data: { id: idAnuncio },
        success: function (data) {
            if (data.resultado == true) {
                data = data.data;
                $("#lblVistasHoy").text(data[0].val);
                $("#lblVistasTotal").text(data[1].val);
            }
        }
    });

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
                            spanWhat = '<span class="input-group-text whatActive"><i class="fab fa-whatsapp"></i></span>';
                        } else {
                            spanWhat = '<span class="input-group-text optionsNumberInactive"><i class="fab fa-whatsapp"></i></span>';
                        }
                        if (value.opcion_2_call == 1) {
                            spanCall = '<span class="input-group-text phoneActive"><i class="fas fa-phone"></i></span>';
                        } else {
                            spanCall = '<span class="input-group-text optionsNumberInactive"><i class="fas fa-phone"></i></span>';
                        }
                        $("#divCelulares").append('<div class="input-group margin_top_medium"><input type="number" class="form-control text-center fontSize18px fontBold backgroudWhite inptsCelulares cursorPointer" title="Buscar anuncios con este numero" readonly value="' + value.celular + '"><div class="input-group-append">' + spanWhat + spanCall + '</div></div>');
                    });
                    // SET CONDICIONES
                    $.each(data["condiciones"], function (index, value) {
                        $("#divCondiciones").append('<div class="row margin_top_small "><div class="col-sm-5 centradoVerticalHorizontal" style="border: 1px solid gray;"><div><p class="margin0 text-center"><small>Precio</small></p><p>' + value.precio + '</p></div></div><div class="col-sm-7 text-center"><div class="row"><div class="col-sm-12 text-center borderBottomSolid1pxGray">' + value.tiempo + '</div><div class="col-sm-12 text-center">' + value.relaciones + '</div></div></div></div>');
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

    function redirectAnuncios(idCategoria, categoria, idEtiqueta, etiqueta, idDepartamento, idCiudad, text) {
        $(location).attr('href', urlProyect() + 'c_app/vstListaAnuncios?categ=' + categoria + '_' + idCategoria + '&etiq=' + etiqueta + '_' + idEtiqueta + '&state=' + idDepartamento + '&city=' + idCiudad + '&text=' + text);
    }

    loadDataAnuncio(idAnuncio);

});