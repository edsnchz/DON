$(function () {

    var lastParams;

    var tipoGridView;
    if(localStorage.getItem("tipoGridView") == null){
        tipoGridView = "table";
    }else{
        tipoGridView = localStorage.getItem("tipoGridView");
        if(tipoGridView == "list"){
            $(".btnViewList").removeClass("inactivo");
            $(".btnViewTable").addClass("inactivo");
        }
    }
    

    $("#eMapCategoria").text(categorias[0]);
    AjaxCreateTags(categorias[1]);

    if (etiquetas[0] == "NaN") {
        $("#eMapEtiqueta").addClass("displayNone");
    } else {
        $("#eMapEtiqueta").text(etiquetas[0]);
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
        if (e.deltaY>0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });

    function createCarouselAnunciosCuadricula(i, stringImagenes) {
        return string = '<div id="CarouselAnunciosAll' + i + '" class="carousel slide height100porciento" data-ride="carousel"><div class="carousel-inner height100porciento">' + stringImagenes + '</div><a class="carousel-control-prev" href="#CarouselAnunciosAll' + i + '" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#CarouselAnunciosAll' + i + '" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
    }

    function createCarouselAnunciosLista(i, stringImagenes) {
        return string = '<div id="CarouselAnunciosAll' + i + '" class="carousel slide height100porciento height130pxDesktop" data-ride="carousel"><div class="carousel-inner height100porciento">' + stringImagenes + '</div><a class="carousel-control-prev" href="#CarouselAnunciosAll' + i + '" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#CarouselAnunciosAll' + i + '" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
    }

    $.ajax({
        url: '../c_general/getDepartamentos',
        type: 'POST',
        dataType: "json",
       // async: false,
        success: function (data) {
            if (data.resultado == true) {
                $.each(data.data, function (key, value) {
                    $("#inpDepartamentos").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                });
            }
            $('#inpDepartamentos').val(state);
            AjaxLoadCiudades($('#inpDepartamentos').val());
            $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
            AjaxLoadCategorias();
        }
    });

    function AjaxLoadCategorias() {    
        $.ajax({
            url: '../c_general/getCategorias',
            type: 'POST',
            dataType: "json",
           // async: false,
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#inpCategorias").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                        $(".enlacesCategorias").append('<li class="liEnlacesCategorias" data-state="' + $('#inpDepartamentos').val() + '" data-categoria="' + value.id + '">' + value.nombre + ' en ' + $("#inpDepartamentos option:selected").text() + '</li>');
                    });
                }
                $("#inpCategorias").val(categorias[1]);
            }
        });
    }


    function AjaxLoadCiudades(id) {
        $("#inpCiudades").html("<option value='NaN'>Todas las ciudades</option>");
        $.ajax({
            url: '../c_general/getCiudadesByDepartamento',
            type: 'POST',
            dataType: "json",
            data: { idDepartamento: id },
          //  async: false,
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#inpCiudades").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                    });
                    if(id == state){
                        $('#inpCiudades').val(city);    
                    }
                    $("#eMapCiudad").text($("#inpCiudades option:selected").text());
                    setTitle(categorias[0], $("#inpCiudades option:selected").text());
                }
            }
        });
    }

    function AjaxCreateDatosCarousel(idCategoria, idDepartamento){
        for (var i=0; i<$('.item').length; i++) {
           owl.trigger('remove.owl.carousel', [i]).trigger('refresh.owl.carousel');
        }
       
        $.ajax({
            url: '../c_general/getAnunciosCarousel',
            type: 'POST',
            dataType: "json",
            data: {idCategoria: idCategoria, idDepartamento: idDepartamento},
            success: function (data) {
                if (data.resultado == true) {
                    let datos = data.data;
                    if(datos.length == 0){
                        owl.trigger('add.owl.carousel', [createItemCarouselVacioPlatino(), 0]).trigger('refresh.owl.carousel');
                    }else{
                        let count = 0;
                        $.each(datos, function (key, value) {
                            let div = (value.url==null||value.url=="")?createItemCarouselVacioPlatino():createItemCarouselPlatino(value.id, value.url);
                            owl.trigger('add.owl.carousel', [div, count]).trigger('refresh.owl.carousel');
                            count ++;
                        });    
                    }
                }
            }
        });
    }

    function createItemCarouselPlatino(id, url){
        return '<div class="item itemCarousel backgroundGrayDos sombraPequeña cursorPointer" data-id="'+id+'"><img src="../../uploads/anuncios/'+url+'" class="imgItemCarousel sombraPequeña"></div>';
    }

    function createItemCarouselVacioPlatino(){
        return '<div class="item itemCarousel backgroundGrayDos sombraPequeña padding18px"><img src="../../images/camera.svg" class="imgItemCarouselDefault"></div>';
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
        $("#divCuadricula").html("");
        $.ajax({
            url: '../c_general/getAnuncios',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: idCategoria, idDepartamento: idDepartamento, idCiudad: idCiudad, idEtiqueta: idEtiqueta, text: text },
            beforeSend: function(data){
                loading.show();
            },
            success: function (data) {
                if (data.resultado == true) {
                    $("#divCuadricula").html('<div class="bricklayer" id="myBricklayer"></div>');

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
                        stringImagenes = createCarouselAnunciosCuadricula(value.id, stringImagenesTemp);

                        var stringTop = '';
                        if (value.isTop == 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        var stringCategoria = '';
                        if ($("#inpCategorias").val() == "NaN") {
                            var stringCategoria = '<div class="btnCategoriaItemAnuncio">' + value.categoria + '</div>';
                        }

                        var stringCountImgs = '<div class="btnCountImagesAnuncio">' + value.countImagenes + ' Fotos</div>';

                        var stringCityAnuncio = '<div class="btnCityAnuncio">' + value.ciudad + '</div>';

                        var classPackDestacado = "";
                        if(value.tipoDestacado == "14"){
                            classPackDestacado = "backgroundYellowAnuncios"
                        }else if(value.tipoDestacado == "15"){
                            classPackDestacado = "backgroundPinkAnuncios"
                        }

                        $("#myBricklayer").append('<div class="card sombra margin5px marginSuperior13px cardAnuncio '+classPackDestacado+'"><div style= "height: 150px" >' + stringImagenes + stringCategoria + stringTop + stringCountImgs + stringCityAnuncio + '</div> <div class="card-block"><h4 class="card-title cursorPointer padding10px margin0 paddinginferior0 selectAnuncio fontWeight900" data-id=' + value.id + '><a href="' + urlProyect() + 'c_app/vstDetalleAnuncio?idAnuncio=' + value.id + '" class="hoverColorPink colorGrisOscuro fontFamilyRoboto textDecorationNone">' + value.titulo + '</a></h4><div class="card-text padding10px fontFamilyRoboto colorGrisMenosOscuro fontSize14px">' + ((value.descripcion.length > 80) ? value.descripcion.substring(0, 80) + "..." : value.descripcion) + '</div>' + ((countEtiquetas>0)?stringEtiquetas + "<br><br>":"") + '</div></div>');

                    });

                   /* bricklayer.destroy();*/
                    var bricklayer = new Bricklayer(document.getElementById('myBricklayer'));
                }

            },
            complete: function(data){
                loading.hide();
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
            beforeSend: function(data){
                loading.show();
            },
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
                                stringImagenesTemp += '<div class="carousel-item active backgroundGrayDos height100porciento"><img src="../../uploads/anuncios/' + imagen.url + '" class="imgItemCarousel height100porciento"></div>';
                            } else {
                                stringImagenesTemp += '<div class="carousel-item backgroundGrayDos height100porciento"><img src="../../uploads/anuncios/' + imagen.url + '" class="imgItemCarousel height100porciento"></div>';
                            }
                        });
                        stringImagenes = createCarouselAnunciosLista(value.id, stringImagenesTemp);

                        var stringTop = '';
                        if (value.isTop == 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        var stringCategoria = '';
                        if ($("#inpCategorias").val() == "NaN") {
                            var stringCategoria = '<div class="btnCategoriaItemAnuncio">' + value.categoria + '</div>';
                        }

                        var stringCountImgs = '<div class="btnCountImagesAnuncioList">' + value.countImagenes + ' Fotos</div>';

                        var stringCityAnuncio = '<div class="btnCityAnuncioList">' + value.ciudad + '</div>';

                        var divStringEtiquetas =  ((countEtiquetas>0)?('<div class="col-sm-2 d-none d-sm-block" style="padding: 0px 5px">' + stringEtiquetas + '</div>'):"");

                        var classPackDestacado = "";
                        if(value.tipoDestacado == "14"){
                            classPackDestacado = "backgroundYellowAnuncios"
                        }else if(value.tipoDestacado == "15"){
                            classPackDestacado = "backgroundPinkAnuncios"
                        }

                        $("#divCuadricula").append('<div class="row backgroundGray margin_top_medium"><div class="col-sm-12"><div class="container-fluid '+classPackDestacado+'"><div class="row row-eq-height sombra cardAnuncio"><div class="col-4 col-sm-3 padding0">' + stringImagenes + stringCategoria + stringTop + stringCountImgs + '</div><div class="'+((countEtiquetas>0)?('col-8 col-sm-7'):('col-8 col-sm-9'))+' paddingSuperior15px paddingLaterales20px"><h5 class="cursorPointer selectAnuncio fontWeight900" data-id=' + value.id + '><a href="' + urlProyect() + 'c_app/vstDetalleAnuncio?idAnuncio=' + value.id + '" class="hoverColorPink colorGrisOscuro fontFamilyRoboto textDecorationNone">' + ((value.titulo.length > 100) ? value.titulo.substring(0, 100) + "..." : value.titulo) + '</a></h5><p class="fontFamilyRoboto colorGrisMenosOscuro fontSize14px marginBottom22pxMovil margin_bottom_30px">' + ((value.descripcion.length > 90) ? value.descripcion.substring(0, ((countEtiquetas>0)?90:200)) + "..." : value.descripcion) + stringCityAnuncio + '</p></div>'+divStringEtiquetas+'</div></div></div></div>');

                    });
                }

            },
            complete: function(data){
                loading.hide();
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
        createAnuncios($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), "NaN", ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val(), tipoGridView);
        setUrl($("#inpCategorias option:selected").text() + "_" + $("#inpCategorias").val(),
            "NaN_NaN", $("#inpDepartamentos").val(), $("#inpCiudades").val(), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val());
        AjaxCreateTags($("#inpCategorias").val());
        $("#eMapCategoria").text($("#inpCategorias option:selected").text());
        $("#eMapDepartamento").text($("#inpDepartamentos option:selected").text());
        $("#eMapCiudad").text($("#inpCiudades option:selected").text());
        $("#eMapEtiqueta").addClass("displayNone");

        $(".liEnlacesCategorias").removeClass("liEnlacesCategoriasActivo");
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
        $(".etiquetasNube").removeClass("etiquetasNubeActivo");
        $(this).addClass("etiquetasNubeActivo");
        createAnuncios($("#inpCategorias").val(), $("#inpDepartamentos").val(), $("#inpCiudades").val(), $(this).data("id"), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val(), tipoGridView);
        setUrl($("#inpCategorias option:selected").text() + "_" + $("#inpCategorias").val(),
            $(this).text() + "_" + $(this).data("id"), $("#inpDepartamentos").val(), $("#inpCiudades").val(), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val());
        $("#eMapEtiqueta").removeClass("displayNone");
        $("#eMapEtiqueta").text($(this).text());
    });

    $('body').on('mousedown', '.itemTag', function (e) {
        e.preventDefault();
        if(e.which == 2){
            openUrl($("#inpCategorias option:selected").text() + "_" + $("#inpCategorias").val(),
            $(this).text() + "_" + $(this).data("id"), $("#inpDepartamentos").val(), $("#inpCiudades").val(), ($("#inpTextBuscar").val() == "") ? "NaN" : $("#inpTextBuscar").val());
            return false;
        }
    });

    $('body').on('click', '.liEnlacesCategorias', function () {
        $(".liEnlacesCategorias").removeClass("liEnlacesCategoriasActivo");
        $(this).addClass("liEnlacesCategoriasActivo");
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

   /*  
    $('body').on('click', '.selectAnuncio', function () {
        // ENVIAR PARAMETROS
       var id = $(this).data("id");
        $(location).attr('href', urlProyect() + 'c_app/vstDetalleAnuncio?idAnuncio=' + id);
    });
   */

    $('body').on('click', '.itemCarousel', function () {
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

        AjaxCreateDatosCarousel(categorias, departamento);

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
        window.history.pushState({}, 'Anuncios eróticos en Colombia', url);

        setTitle($("#inpCategorias option:selected").text(), $("#inpCiudades option:selected").text());

        // VERSION NAVEGADORES IE AND EDGE
        if (getBrowserCurrent() == "edge" || getBrowserCurrent() == "ie") {
            var urlIE = "vstListaAnuncios?categ=" + categ + "&etiq=" + etiq + "&state=" + state + "&city=" + city + "&text=" + text;
            window.history.replaceState({}, 'Anuncios eróticos en Colombia', urlIE);
        }

    }

    function openUrl(categ, etiq, state, city, text) {       
       let url = "vstListaAnuncios?categ=" + categ + "&etiq=" + etiq + "&state=" + state + "&city=" + city + "&text=" + text;
       window.open(url, '_blank');
    }

    function setTitle(categoria, ciudad) {
        if(categoria == "Todas las categorías"){
            categoria = "eroticos";
        }else{
            categoria = "de " + categoria;
        }
        if(ciudad == "Todas las ciudades"){
            ciudad = "Colombia";
        }
        document.title = "Anuncios " + categoria + " en " + ciudad;
    }

    $(".btnViewTable").click(function () {
        setFavTypeGrid("table");
        tipoGridView = "table";
        $(this).removeClass("inactivo");
        $(".btnViewList").addClass("inactivo");
        createAnuncios(lastParams.categorias, lastParams.departamento, lastParams.ciudad, lastParams.etiqueta, lastParams.text, tipoGridView);
    });

    $(".btnViewList").click(function () {
        setFavTypeGrid("list");
        tipoGridView = "list";
        $(this).removeClass("inactivo");
        $(".btnViewTable").addClass("inactivo");
        createAnuncios(lastParams.categorias, lastParams.departamento, lastParams.ciudad, lastParams.etiqueta, lastParams.text, tipoGridView);
    });

    createAnuncios(categorias[1], $("#inpDepartamentos").val(), $("#inpCiudades").val(), etiquetas[1], text, tipoGridView);

    function setFavTypeGrid(tipo){
        localStorage.setItem("tipoGridView", tipo);
    }



});