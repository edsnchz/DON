$(function () {

    $("#eMapCategoria").text(categorias[0]);
    AjaxCreateTags(categorias[1]);

    if (etiquetas[0] == "NaN") {
        $("#eMapEtiqueta").addClass("displayNone");
    } else {
        $("#eMapEtiqueta").text(etiquetas[0]);
    }


    var owl = $('.owl-carousel');
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
                    $("#enlacesCategorias").append('<li class="liEnlacesCategorias" data-state="'+$('#inpDepartamentos').val()+'" data-categoria="'+value.id+'">'+value.nombre+' en '+$("#inpDepartamentos option:selected").text()+'</li>');
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

    function AjaxLoadAnunciosCuadricula(idCategoria, idDepartamento, idCiudad, idEtiqueta) {
        $("#divCardColumns").html("");
        $.ajax({
            url: '../c_general/getAnunciosVistaCuadricula',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: idCategoria, idDepartamento: idDepartamento, idCiudad: idCiudad, idEtiqueta: idEtiqueta },
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (index, value) {

                        var stringEtiquetas = '<div class="pull-left paddingLeft7px">';
                        countEtiquetas = 0
                        $.each(value[0], function (indexE, etiqueta) {
                            var nombreEti = (etiqueta.nombre.length > 10) ? etiqueta.nombre.substring(0, 9) + "..." : etiqueta.nombre;
                            stringEtiquetas += '<span class="badge badge-pill etiquetasAnunciosPequeñas fontFamilyRoboto">' + nombreEti + '</span>';
                            countEtiquetas++;
                            if (countEtiquetas == 3) {
                                return false;
                            }
                        });
                        if (((value[0].length) - 3) != 0) {
                            stringEtiquetas += '<span class="badge badge-pill etiquetasMas"> + ' + ((value[0].length) - 3) + '</span>';
                        }
                        stringEtiquetas += "</div>";

                        var stringTop = '';
                        if (value.id_tipo != 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        $(".card-columns").append('<div class="card sombra cardAnuncio"><div style="height: 150px"><img src="../../uploads/anuncios/' + value.imagen + '" class="imgItemCarousel">' + stringTop + '</div><div class="card-block"><h4 class="card-title padding10px margin0 paddinginferior0">' + value.titulo + '</h4><div class="card-text padding10px">' + ((value.descripcion.length > 80) ? value.descripcion.substring(0, 80) + "..." : value.descripcion) + '</div>' + stringEtiquetas + '<br><br></div></div>');
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
        AjaxLoadAnunciosCuadricula($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN");
        setUrl($("#inpCategorias option:selected").text()+"_"+$("#inpCategorias").val(),
                "NaN_NaN", $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN");
        AjaxCreateTags($("#inpCategorias").val());
        $("#eMapCategoria").text($("#inpCategorias option:selected").text());
        $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
        $("#eMapCiudad").text($("#inpCiudades option:selected").text());
        $("#eMapEtiqueta").addClass("displayNone");
        
        $('.liEnlacesCategorias').each(function(i, obj) {
            var text = $(obj).text();
            var inicio = (text.indexOf("en")+2);
            text = text.substring(0, inicio);
            $(obj).text(text + " " + $("#inpDepartamentos option:selected").text());
            $(obj).data("state", $("#inpDepartamentos").val());
        });

    });

    $("#eMapInicio").click(function () {
        $(location).attr('href', urlProyectShort());
    });

    $("#eMapCategoria").click(function () {
        AjaxLoadAnunciosCuadricula($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN");
        setUrl($("#inpCategorias option:selected").text()+"_"+$("#inpCategorias").val(),
                "NaN_NaN", $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN");
        AjaxCreateTags($("#inpCategorias").val());
        $("#eMapCategoria").text($("#inpCategorias option:selected").text());
        $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
        $("#eMapCiudad").text($("#inpCiudades option:selected").text());
        $("#eMapEtiqueta").addClass("displayNone");
    });

    $('body').on('click', '.itemTag', function () {
        AjaxLoadAnunciosCuadricula($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), $(this).data("id"));
        setUrl($("#inpCategorias option:selected").text()+"_"+$("#inpCategorias").val(),
                $(this).text()+"_"+$(this).data("id"), $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN");
        $("#eMapEtiqueta").removeClass("displayNone");
        $("#eMapEtiqueta").text($(this).text());
    });

    $('body').on('click', '.liEnlacesCategorias', function () {
        $("#inpCategorias").val($(this).data("categoria"));
        $("#inpDepartamentos").val($(this).data("state"));
        AjaxLoadAnunciosCuadricula($(this).data("categoria"), $(this).data("state"), "NaN", "NaN");
        setUrl($("#inpCategorias option:selected").text()+"_"+$("#inpCategorias").val(),
                "NaN_NaN", $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN");
        AjaxCreateTags($(this).data("categoria"));
        $("#eMapCategoria").text($("#inpCategorias option:selected").text());
        $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
        $("#eMapCiudad").text("TODAS LAS CIUDADES");
        $("#eMapEtiqueta").addClass("displayNone");
    });

    function setUrl(categ, etiq, state, city, text){
        let url = new URL(window.location.href);
        url.searchParams.set("categ", categ);
        url.searchParams.set("etiq", etiq);
        url.searchParams.set("state", state);
        url.searchParams.set("city", city);
        url.searchParams.set("text", text);
        window.history.pushState({}, 'DON - ANUNCIOS', url);
    }
    


    AjaxLoadAnunciosCuadricula(categorias[1], $("#inpDepartamentos").val(), $("#inpCiudades").val(), etiquetas[1]);

});