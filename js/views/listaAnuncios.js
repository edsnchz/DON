$(function () {

    $("#eMapCategoria").text(categorias[0]);
    $("#eMapEtiqueta").text(etiquetas[0]);

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
            $("#eMapDepartamento").text(location.state);
            $("#eMapCiudad").text(location.city);

            AjaxLoadAnunciosCuadricula(categorias[1], $("#inpCiudades").val(), etiquetas[1]);
        },
        error: function (ex) {
            toastr.warning("Error al obtener tu ubicación actual");
        }
    });

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
            $("#inpCategorias").val(categorias[1]);
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

    function AjaxLoadCiudades(id) {
        $("#inpCiudades").html("");
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

    function AjaxLoadAnunciosCuadricula(idCategoria, idCiudad, idEtiqueta) {
        $.ajax({
            url: '../c_general/getAnunciosVistaCuadricula',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: idCategoria, idCiudad: idCiudad, idEtiqueta: idEtiqueta },
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (index, value) {

                        var stringEtiquetas = '<div class="pull-left">';
                        countEtiquetas = 0
                        $.each(value[0], function (indexE, etiqueta) {
                            var nombreEti = (etiqueta.nombre.length > 10) ? etiqueta.nombre.substring(0, 9) + "..." : etiqueta.nombre;
                            stringEtiquetas += '<span class="badge badge-pill etiquetasAnunciosPequeñas fontFamilyRoboto">' + nombreEti + '</span>';
                            countEtiquetas++;
                            if (countEtiquetas == 3) {
                                return false;
                            }
                        });
                        stringEtiquetas += '<span class="badge badge-pill etiquetasMas"> + ' + ((value[0].length) - 3) + '</span>';
                        stringEtiquetas += "</div>";

                        var stringTop = '';
                        if (value.id_tipo != 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        $(".card-columns").append('<div class="card sombra"><div style="height: 150px"><img src="../../uploads/anuncios/' + value.imagen + '" class="imgItemCarousel">' + stringTop + '</div><div class="card-block"><h4 class="card-title padding10px margin0 paddinginferior0">' + value.titulo + '</h4><div class="card-text padding10px">' + ((value.descripcion.length > 80) ? value.descripcion.substring(0, 80) + "..." : value.descripcion) + '</div>' + stringEtiquetas + '<br><br></div></div>');
                    });
                }
            }
        });
    }



});