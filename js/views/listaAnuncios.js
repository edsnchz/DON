$(function () {

    var lastParams;
    var tipoGridView = "table";

    $("#eMapCategoria").text(categorias[0]);
    AjaxCreateTags(categorias[1]);

    if (etiquetas[0] == "NaN") {
        $("#eMapEtiqueta").addClass("displayNone");
    } else {
        $("#eMapEtiqueta").text(etiquetas[0]);
    }

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

    function createCarouselAnunciosAll(i, stringImagenes) {
        return string = '<div id="CarouselAnunciosAll' + i + '" class="carousel slide" data-ride="carousel"><div class="carousel-inner">' + stringImagenes + '</div><a class="carousel-control-prev" href="#CarouselAnunciosAll' + i + '" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#CarouselAnunciosAll' + i + '" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
    }

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
            $('#inpDepartamentos').val(state);
            AjaxLoadCiudades($('#inpDepartamentos').val());
            $('#inpCiudades').val(city);
            $("#eMapCiudad").text($("#inpCiudades option:selected").text());
            $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
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
                    $("#enlacesCategorias").append('<li class="liEnlacesCategorias" data-state="' + $('#inpDepartamentos').val() + '" data-categoria="' + value.id + '">' + value.nombre + ' en ' + $("#inpDepartamentos option:selected").text() + '</li>');
                });
            }
            $("#inpCategorias").val(categorias[1]);
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
                        $("#tagCloud").append('<span class="badge badge-pill etiquetasNube cursorPointer itemTag fontFamilyRoboto" data-id="' + value.id + '">' + value.nombre + '</span>');
                    });
                }
            }
        });
    }

    function AjaxLoadAnunciosCuadricula(idCategoria, idDepartamento, idCiudad, idEtiqueta, text) {
        $("#divCardColumns").html("");
        $.ajax({
            url: '../c_general/getAnuncios',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: idCategoria, idDepartamento: idDepartamento, idCiudad: idCiudad, idEtiqueta: idEtiqueta, text: text },
            success: function (data) {
                if (data.resultado == true) {
                    $("#divCuadricula").html('<div class="card-columns" id="divCardColumns"></div>');

                    $.each(data.data, function (index, value) {

                        var stringEtiquetas = '<div class="pull-left paddingLeft7px">';
                        countEtiquetas = 0
                        $.each(value.etiquetas, function (indexE, etiqueta) {
                            var nombreEti = (etiqueta.nombre.length > 10) ? etiqueta.nombre.substring(0, 9) + "..." : etiqueta.nombre;
                            stringEtiquetas += '<span class="badge badge-pill etiquetasAnunciosPequeñas fontFamilyRoboto">' + nombreEti + '</span>';
                            countEtiquetas++;
                            if (countEtiquetas == 3) {
                                return false;
                            }
                        });
                        if (((value.etiquetas.length) - 3) > 0) {
                            stringEtiquetas += '<span class="badge badge-pill etiquetasMas"> + ' + ((value.etiquetas.length) - 3) + '</span>';
                        }
                        stringEtiquetas += "</div>";

                        var stringImagenesTemp = '';
                        $.each(value.imagenes, function (indexI, imagen) {
                            if (indexI == 0) {
                                stringImagenesTemp += '<div style= "height: 150px" class="carousel-item active backgroundGrayDos"><img src="../../uploads/anuncios/' + imagen.url + '" class="imgItemCarousel" style= "height: 150px"></div>';
                            } else {
                                stringImagenesTemp += '<div style= "height: 150px" class="carousel-item backgroundGrayDos"><img src="../../uploads/anuncios/' + imagen.url + '" class="imgItemCarousel" style= "height: 150px"></div>';
                            }
                        });
                        stringImagenes = createCarouselAnunciosAll(value.id, stringImagenesTemp);

                        var stringTop = '';
                        if (value.id_tipo != 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        var stringCategoria = '';
                        if ($("#inpCategorias").val() == "NaN") {
                            var stringCategoria = '<div class="btnCategoriaItemAnuncio">' + value.categoria + '</div>';
                        }

                        var stringCountImgs = '<div class="btnCountImagesAnuncio">' + value.countImagenes + ' Fotos</div>';

                        var stringCityAnuncio = '<div class="btnCityAnuncio">' + value.ciudad + '</div>';

                        $(".card-columns").append('<div class="card sombra cardAnuncio"><div style= "height: 150px" >' + stringImagenes + stringCategoria + stringTop + stringCountImgs + stringCityAnuncio + '</div> <div class="card-block"><h4 class="card-title cursorPointer padding10px margin0 paddinginferior0 selectAnuncio hoverColorPink colorGrisOscuro" data-id=' + value.id + '>' + value.titulo + '</h4><div class="card-text padding10px fontFamilyRoboto colorGrisMenosOscuro">' + ((value.descripcion.length > 80) ? value.descripcion.substring(0, 80) + "..." : value.descripcion) + '</div>' + stringEtiquetas + '<br><br></div></div>');

                    });
                }

            }
        });
    }

    function AjaxLoadAnunciosList(idCategoria, idDepartamento, idCiudad, idEtiqueta, text) {
        $("#divCuadricula").html("");
        $.ajax({
            url: '../c_general/getAnuncios',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: idCategoria, idDepartamento: idDepartamento, idCiudad: idCiudad, idEtiqueta: idEtiqueta, text: text },
            success: function (data) {
                if (data.resultado == true) {

                    $.each(data.data, function (index, value) {

                        var stringEtiquetas = '<div class="padding7px">';
                        countEtiquetas = 0
                        $.each(value.etiquetas, function (indexE, etiqueta) {
                            var nombreEti = (etiqueta.nombre.length > 10) ? etiqueta.nombre.substring(0, 9) + "..." : etiqueta.nombre;
                            stringEtiquetas += '<span class="badge badge-pill etiquetasAnunciosPequeñas fontFamilyRoboto">' + nombreEti + '</span>';
                            countEtiquetas++;
                            if (countEtiquetas == 3) {
                                return false;
                            }
                        });
                        if (((value.etiquetas.length) - 3) > 0) {
                            stringEtiquetas += '<span class="badge badge-pill etiquetasMas"> + ' + ((value.etiquetas.length) - 3) + '</span>';
                        }
                        stringEtiquetas += "</div>";

                        var stringImagenesTemp = '';
                        $.each(value.imagenes, function (indexI, imagen) {
                            if (indexI == 0) {
                                stringImagenesTemp += '<div style= "height: 130px" class="carousel-item active backgroundGrayDos"><img src="../../uploads/anuncios/' + imagen.url + '" class="imgItemCarousel" style= "height: 150px"></div>';
                            } else {
                                stringImagenesTemp += '<div style= "height: 130px" class="carousel-item backgroundGrayDos"><img src="../../uploads/anuncios/' + imagen.url + '" class="imgItemCarousel" style= "height: 150px"></div>';
                            }
                        });
                        stringImagenes = createCarouselAnunciosAll(value.id, stringImagenesTemp);

                        var stringTop = '';
                        if (value.id_tipo != 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        var stringCategoria = '';
                        if ($("#inpCategorias").val() == "NaN") {
                            var stringCategoria = '<div class="btnCategoriaItemAnuncio">' + value.categoria + '</div>';
                        }

                        var stringCountImgs = '<div class="btnCountImagesAnuncioList">' + value.countImagenes + ' Fotos</div>';

                        var stringCityAnuncio = '<div class="btnCityAnuncioList">' + value.ciudad + '</div>';

                        $("#divCuadricula").append('<div class="row backgroundGray sombra margin_top_medium"><div class="col-sm-12"><div class="row cardAnuncio"><div class="col-4 col-sm-3 padding0" style="height: 130px">' + stringImagenes + stringCategoria + stringTop + stringCountImgs + '</div><div class="col-8 col-sm-7 paddingSuperior15px paddingLaterales20px"><h5 class="cursorPointer selectAnuncio hoverColorPink colorGrisOscuro" data-id=' + value.id + '>' + ((value.titulo.length > 110) ? value.titulo.substring(0, 110) + "..." : value.titulo) + '</h5><p class="fontFamilyRoboto colorGrisMenosOscuro">' + ((value.descripcion.length > 110) ? value.descripcion.substring(0, 110) + "..." : value.descripcion) + stringCityAnuncio + '</p></div><div class="col-sm-2 d-none d-sm-block" style="padding: 0px 5px">' + stringEtiquetas + '</div></div> </div></div>');

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
        createAnuncios($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN", ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val(), tipoGridView);
        setUrl($("#inpCategorias option:selected").text() + "_" + $("#inpCategorias").val(),
            "NaN_NaN", $("#inpDepartamentos").val(), $("#inpCiudades").val(), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val());
        AjaxCreateTags($("#inpCategorias").val());
        $("#eMapCategoria").text($("#inpCategorias option:selected").text());
        $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
        $("#eMapCiudad").text($("#inpCiudades option:selected").text());
        $("#eMapEtiqueta").addClass("displayNone");

        $('.liEnlacesCategorias').each(function (i, obj) {
            var text = $(obj).text();
            var inicio = (text.indexOf("en") + 2);
            text = text.substring(0, inicio);
            $(obj).text(text + " " + $("#inpDepartamentos option:selected").text());
            $(obj).data("state", $("#inpDepartamentos").val());
        });

    });

    $("#eMapInicio").click(function () {
        $(location).attr('href', urlProyectShort());
    });

    $("#eMapCategoria").click(function () {
        createAnuncios($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN", ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val(), tipoGridView);
        setUrl($("#inpCategorias option:selected").text() + "_" + $("#inpCategorias").val(),
            "NaN_NaN", $("#inpDepartamentos").val(), $("#inpCiudades").val(), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val());
        AjaxCreateTags($("#inpCategorias").val());
        $("#eMapCategoria").text($("#inpCategorias option:selected").text());
        $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
        $("#eMapCiudad").text($("#inpCiudades option:selected").text());
        $("#eMapEtiqueta").addClass("displayNone");
    });

    $('body').on('click', '.itemTag', function () {
        createAnuncios($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), $(this).data("id"), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val(), tipoGridView);
        setUrl($("#inpCategorias option:selected").text() + "_" + $("#inpCategorias").val(),
            $(this).text() + "_" + $(this).data("id"), $("#inpDepartamentos").val(), $("#inpCiudades").val(), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val());
        $("#eMapEtiqueta").removeClass("displayNone");
        $("#eMapEtiqueta").text($(this).text());
    });

    $('body').on('click', '.liEnlacesCategorias', function () {
        $("#inpCategorias").val($(this).data("categoria"));
        $("#inpDepartamentos").val($(this).data("state"));
        createAnuncios($(this).data("categoria"), $(this).data("state"), "NaN", "NaN", ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val(), tipoGridView);
        setUrl($("#inpCategorias option:selected").text() + "_" + $("#inpCategorias").val(),
            "NaN_NaN", $("#inpDepartamentos").val(), $("#inpCiudades").val(), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val());
        AjaxCreateTags($(this).data("categoria"));
        $("#eMapCategoria").text($("#inpCategorias option:selected").text());
        $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
        $("#eMapCiudad").text("TODAS LAS CIUDADES");
        $("#eMapEtiqueta").addClass("displayNone");
    });

    $('body').on('click', '.selectAnuncio', function () {
        // ENVIAR PARAMETROS
        var id = $(this).data("id");
        $(location).attr('href', urlProyect() + 'c_app/vstDetalleAnuncio?idAnuncio=' + id);
    });

    function createAnuncios(categorias, departamento, ciudad, etiqueta, text, tipoGrid) {
        // SETEAMOS LOS ULTIMOS PARAMETROS CON LOS CUALES HEMOS CONSULTADO
        lastParams = { categorias: categorias, departamento: departamento, ciudad: ciudad, etiqueta: etiqueta, text: text };

        if (tipoGrid == "table") {
            AjaxLoadAnunciosCuadricula(categorias, departamento, ciudad, etiqueta, text);
        } else {
            AjaxLoadAnunciosList(categorias, departamento, ciudad, etiqueta, text);
        }

        setTimeout(function () { $('.carousel').carousel('pause'); }, 1000);

    }

    $('body').on('slid.bs.carousel', '.carousel', function () {
        $('.carousel').carousel('pause');
    });

    function setUrl(categ, etiq, state, city, text) {
        let url = new URL(window.location.href);
        url.searchParams.set("categ", categ);
        url.searchParams.set("etiq", etiq);
        url.searchParams.set("state", state);
        url.searchParams.set("city", city);
        url.searchParams.set("text", text);
        window.history.pushState({}, 'DON - ANUNCIOS', url);

        // VERSION NAVEGADORES IE AND EDGE
        if (getBrowserCurrent() == "edge" || getBrowserCurrent() == "ie") {
            var urlIE = "vstListaAnuncios?categ=" + categ + "&etiq=" + etiq + "&state=" + state + "&city=" + city + "&text=" + text;
            window.history.replaceState({}, 'DON - ANUNCIOS', urlIE);
        }

    }

    $("#btnViewTable").click(function () {
        tipoGridView = "table";
        $(this).removeClass("inactivo");
        $("#btnViewList").addClass("inactivo");
        createAnuncios(lastParams.categorias, lastParams.departamento, lastParams.ciudad, lastParams.etiqueta, lastParams.text, tipoGridView);
    });

    $("#btnViewList").click(function () {
        tipoGridView = "list";
        $(this).removeClass("inactivo");
        $("#btnViewTable").addClass("inactivo");
        createAnuncios(lastParams.categorias, lastParams.departamento, lastParams.ciudad, lastParams.etiqueta, lastParams.text, tipoGridView);
    });

    createAnuncios(categorias[1], $("#inpDepartamentos").val(), $("#inpCiudades").val(), etiquetas[1], text, tipoGridView);

});