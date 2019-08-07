$(function () {

    var selectTags = [];
    var selectTagsEditar = [];
    var numRowsOptionServicios = [1];
    var numRowsOptionServiciosEditar = [];
    var numNumerosEditar = [];
    var numNumbers = 0;
    var loadMiGaleria = false;
    var selectMisFotos = [];
    var dataFormFotos = new FormData();
    var keyFotosForm = [];
    var loadMiGaleriaEditar = false;
    var selectMisFotosEditar = [];
    var dataFormFotosEditar = new FormData();
    var keyFotosFormEditar = [];
    var myChartV, myChartW, myChartC, myChartPie;
    AjaxLoadNumbers();
    AjaxloadOptionsServices({ tipo: "class" });
    AjaxGetUsersMensajes();
    AjaxAlarmMensajes();
    AjaxGetPreciosCreditos();
    AjaxGetMisCreditos();
    AjaxLoadMisAnuncios();

    $("#inpFecha1Estadistica").val(SubDateNow(15));
    $("#inpFecha2Estadistica").val(dateNow());

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

    function AjaxCreateTagsEditar(id) {
        $("#tagCloudEditar").html("");
        $.ajax({
            url: '../c_general/getEtiquetasByCategoria',
            type: 'POST',
            dataType: "json",
            data: { idCategoria: id },
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (index, value) {
                        $("#tagCloudEditar").append('<span class="badge badge-pill etiquetas cursorPointer itemTagEditar fontFamilyRoboto" data-id="' + value.id + '">' + value.nombre + '</span>');
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

        if (obj.accion == "editar") {
            selector.tiempo = "#inpTiempoEditar" + obj.id;
            selector.relaciones = "#inpRelacionesEditar" + obj.id;
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

    function loadDataAnuncio(id) {
        $.ajax({
            url: '../c_general/getAnuncioById',
            type: 'POST',
            dataType: "json",
            data: { id: id },
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    $("#inpIdAnuncioEditar").val(data[0].id);
                    $("#inpTituloEditar").val(data[0].titulo);
                    $("#inpDescripcionEditar").text(data[0].descripcion);
                    selectTagsEditar = [];
                    AjaxCreateTagsEditar(data[0].id_categoria);
                    $.each(data.etiquetas, function (index, value) {
                        var element = $("#tagCloudEditar").find(".itemTagEditar[data-id='" + value.id + "']");
                        $(element).css('background-color', "#C501FE");
                        $(element).data('select', 1);
                        selectTagsEditar.push($(element).data('id'));
                    });
                    numRowsOptionServiciosEditar = [];
                    $("#divCondicionesEditar").html("");
                    $.each(data.condiciones, function (index, value) {
                        numRowsOptionServiciosEditar.push(value.id);
                        $("#divCondicionesEditar").append('<div id="rowOptionServiceEditar' + value.id + '" class="row margin_top_medium"><div class="col-sm-3"><input type="text" id="inpPrecioEditar' + value.id + '" class="form-control inputStyle inpPrecioEditar" placeholder="Valor" data-type="currency" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"></div><div class="col-sm-4"><select id="inpTiempoEditar' + value.id + '" class="form-control inputStyle inpTiempoEditar"><option value="N/A">Tiempo</option></select></div><div class="col-sm-4"><select id="inpRelacionesEditar' + value.id + '" class="form-control inputStyle inpRelacionesEditar"><option value="N/A">Relaciones</option></select></div><div class="col-sm-1 centradoVertical"><button type="button" class="borderNone backgroudNone colorRed outlineNone btnEliminarRowCondicionEditar" data-id="' + value.id + '"><i class="far fa-minus-square fontSize25px"></i></button></div></div>');
                        AjaxloadOptionsServices({ tipo: "id", id: value.id, accion: "editar" });

                        $("#inpPrecioEditar" + value.id).val(value.precio);
                        $("#inpTiempoEditar" + value.id).val(value.id_tiempo);
                        $("#inpRelacionesEditar" + value.id).val(value.id_relaciones);
                    });

                    numNumerosEditar = [];
                    $("#divTelefonosEditar").html("");
                    $.each(data.celulares, function (index, value) {
                        numNumerosEditar.push(value.id);

                        renderCelularesEditar(value.id, value.celular);

                        if (value.opcion_1_wp == "1") {
                            $("#inpWhatEditar" + value.id).prop('checked', true);
                        }
                        if (value.opcion_2_call == "1") {
                            $("#inpTelEditar" + value.id).prop('checked', true);
                        }

                    });

                    $(".preview-images-zone-editar").html("");
                    $.each(data.imagenes, function (index, value) {
                        var output = $(".preview-images-zone-editar");
                        var html = '<div class="preview-image-editar preview-img-actual preview-show-' + value.id + '" data-id="' + value.id + '">' +
                            '<div class="image-eliminar" data-num="' + value.id + '"><i class="fas fa-times"></i></div>' +
                            '<div class="image-zone displayNoneToI"><img src="../../uploads/anuncios/' + value.url + '"><i class="fas fa-times-circle iconDeleteMisFotos"></i></div>' +
                            '</div>';
                        output.append(html);
                    });

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

    function AjaxLoadMisAnuncios() {
        $("#divMisAnuncios").html("");
        $.ajax({
            url: '../c_general/getAnunciosByUser',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (index, value) {
                        var stringTop = '';
                        if (value.id_tipo != 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        var stringCategoria = '<div class="btnCategoriaItemAnuncioListR">' + value.categoria + '</div>';

                        var stringCityAnuncio = '<div class="btnCityAnuncioListR">' + value.ciudad + '</div>';

                        var stringUltEdicion = '<div class="btnUltEdicionMiAnuncio">Actualizado: ' + value.fechaUltEdicionFormat + '</div>';

                        var stringNumero = '<div class="btnNumeroMiAnuncio">ID: ' + value.id + '</div>';

                        $("#divMisAnuncios").append('<div class="col-sm-12 col-md-6"><div class="container backgroundGray sombra margin_top_medium"><div class="row"><div class="col-4 col-sm-3 padding0"><div class="backgroundGrayDos"><img src="../../uploads/anuncios/' + value.url + '" class="imgItemCarousel" style="height: 143px"></div>' + stringTop + stringNumero + '</div><div class="col-8 col-sm-6 paddingSuperior10px"><h5 class="colorGrisOscuro fontFamilyRoboto fontWeight900 margin_bottom_5px">' + ((value.titulo.length > 50) ? value.titulo.substring(0, 50) + "..." : value.titulo) + '</h5><p class="fontFamilyRoboto colorGrisMenosOscuro fontSize14px">' + ((value.descripcion.length > 50) ? value.descripcion.substring(0, 50) + "..." : value.descripcion) + '</p>' + stringCategoria + stringCityAnuncio + stringUltEdicion + '</div><div class="col-12 col-sm-3" style="padding: 0px 5px"><div class="btn-group padding0 width100porciento margin_top_small" role="group"><button class="btn backgroundGrayDosbtn btnEditarAnuncio" data-id="' + value.id + '" title="Editar Anuncio"><i class="far fa-edit"></i></button><button class="btn backgroundGrayDosbtn btnEliminarAnuncio" data-id="' + value.id + '" title="Eliminar Anuncio"><i class="far fa-trash-alt"></i></button></div><div class="btn-group padding0 width100porciento margin_top_small" role="group"><button class="btn backgroundGrayDosbtn btnEstadisticas" data-id="' + value.id + '" title="Estadísticas"><i class="far fa-chart-bar"></i></button><button class="btn backgroundGrayDosbtn" data-id="' + value.id + '" title="Programar Subidas"><i class="far fa-clock"></i></button></div><button class="btn fontFamilyRoboto backgroundPinkClaro hoverBackgroundPinkOscuro hoverColorWhite width100porciento margin_top_7px colorWhite fontSize13px borderRadius0px fontWeight600" data-id="' + value.id + '">Promocionar</button></div></div></div></div>');
                    });
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
                        $("#divPrecios").append('<div class="col-12 col-sm-4 col-md-2"><div class="card"><div class="card-body centradoHorizontal" style="height: 80px"><h5 class="textCenter fontSize22px margin_bottom_0px">' + value.creditos + '</h5><h6 class="fontFamilyRoboto margin_bottom_0px colorGrisOscuro margin_top_8px">&nbsp;Créditos</h6><label class="textCenter positionAbsolute Top45px fontFamilyRoboto fontSize13px colorGrisMenosOscuro">' + value.beneficio + '</label></div><ul class="list-group list-group-flush"><li class="list-group-item textCenter fontSize18px fontFamilyRoboto paddingSuperiorInferior20px">' + formatCurrencyString(value.valor) + '</li></ul><div class="card-body backgroundPinkClaro textCenter cursorPointer hoverBackgroundPinkOscuro"><h4 class="colorWhite fontSize14px textUppercase fontWeight600 margin_bottom_0px btnComprarCreditos" data-id="' + value.id + '">Comprar</h4></div></div></div>');
                    });
                } else {
                    toastr.error("Error al cargar los precios");
                }
            }
        });
    }

    function AjaxEliminarAnuncio(id) {
        $.ajax({
            url: '../c_general/deleteAnuncio',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: id },
            success: function (data) {
                if (data.resultado == true) {
                    toastr.success(data.message);
                    $("#inpIdEliminarAnuncio").val("");
                    $("#modalEliminarAnuncio").modal("hide");
                    AjaxLoadMisAnuncios();
                } else {
                    toastr.error("Error al eliminar el anuncio");
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

    function AjaxGetMisFotosEditar() {
        $("#divMisFotosEditar").html("");
        $.ajax({
            url: '../c_general/getFotosByUser',
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        $("#divMisFotosEditar").append('<div class="card cursorPointer cardMiFotoEditar displayNoneToI" data-id="' + value.id + '"><img src="../../uploads/anuncios/' + value.url + '" class="card-img-top"><i class="fas fa-check-circle iconSelectMisFotos"></i></div>');
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
        dataFormFotos = new FormData();
        numImagenesInput = 0;
        keyFotosForm = [];
        loadMiGaleriaEditar = false;
        selectMisFotosEditar = [];
        dataFormFotosEditar = new FormData();
        numImagenesInputEditar = 0;
        keyFotosFormEditar = [];
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
        $("#pro-imageEditar").val("");
        $(".preview-images-zone").html("");
        $(".preview-images-zone-editar").html("");
        $("#btnMiGaleria").text('Mi Galeria');
        $("#btnMiGaleriaEditar").text('Mi Galeria');
        AjaxLoadMisAnuncios();
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
                        $("#divMensajes").append('<div class="burbujaChat fontFamilyRoboto colorGrisOscuro"><p>' + value.mensaje + '</p><div class="textRight fontFamilyRoboto fontWeight300 colorGrisClaro"><small>Recibido: ' + value.fecha + '</small></div></div>');
                    });
                } else {
                    toastr.error("Error al cargar los mensajes");
                }
            }
        });
    }

    function loadImagenes(id, tipo) {

        let key = (tipo == "editar") ? keyFotosFormEditar : keyFotosForm;
        let data = (tipo == "editar") ? dataFormFotosEditar : dataFormFotos;

        data.append('numFiles', JSON.stringify(key));
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

    function loadImagenesGaleria(id, tipo) {

        let data = (tipo == "editar") ? selectMisFotosEditar : selectMisFotos;

        var stringData = JSON.stringify({
            imagenes: data
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
        $("#divTelefonos").append('<div class="col-sm-3"><div class="card"><div class="card-body textCenter"><h6 id="lblNumero' + id + '" class="card-subtitle mb-2 text-muted textCenter fontWeight600 colorGrisOscuroTels">' + number + '</h6><p class="card-text"><div class="form-group pull-left centradoVertical"><input id="inpWhat' + i + '" type="checkbox" name="inpWhat' + i + '" class="checkStyle margin_left_small" data-id="' + id + '"><label for="inpWhat' + i + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">WhatsApp</label></div><br><div class="form-group pull-left centradoVertical margin_top_small"><input id="inpTel' + i + '" type="checkbox" name="inpTel' + i + '" class="checkStyle margin_left_small"  data-id="' + id + '"><label for="inpTel' + i + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">Llamadas</label></div></p><br><br><a id="btnEliminar' + i + '" href="#" class="card-link margin0 colorRed hoverGrisClaro fontFamilyRoboto fontSize14px" data-id="' + id + '" onclick="eliminarNumero(this)" data-toggle="modal" data-target="#modalEliminarNumero">Eliminar</a></div></div></div>');
    }

    function renderCelularesVacias() {
        $("#divTelefonos").append('<div class="col-sm-3"><div class="card backgroundGrayDos colorWhite cursorPointer" style="height: 180px"><div class="card-body textCenter"><h6 class="card-subtitle mb-2 text-muted textCenter"></h6><p class="card-text"><div class="form-group"><img class="height80px" src="../../images/phone_plus.svg"></div></p><a href="#" class="card-link hoverGrisClaro fontFamilyRoboto fontSize14px" data-toggle="modal" data-target="#modalNumber">Agregar número</a></div></div></div>');
    }

    function renderCelularesEditar(id, number) {
        $("#divTelefonosEditar").append('<div class="col-sm-3"><div class="card"><div class="card-body textCenter"><h6 id="lblNumero' + id + '" class="card-subtitle mb-2 text-muted textCenter fontWeight600 colorGrisOscuroTels">' + number + '</h6><p class="card-text"><div class="form-group pull-left centradoVertical"><input id="inpWhatEditar' + id + '" type="checkbox" name="inpWhat' + id + '" class="checkStyle margin_left_small" data-id="' + id + '"><label for="inpWhatEditar' + id + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">WhatsApp</label></div><br><div class="form-group pull-left centradoVertical margin_top_small"><input id="inpTelEditar' + id + '" type="checkbox" name="inpTel' + id + '" class="checkStyle margin_left_small"  data-id="' + id + '"><label for="inpTelEditar' + id + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">Llamadas</label></div></p></div></div></div>');
    }

    function addRowOptionsServicios(num) {
        $("#divRowsOptionsServicios").append('<div id="rowOptionService' + num + '" class="row margin_top_small rowOptionService"><div class="col-sm-3"><input type="text" class="form-control inputStyle" id="inpPrecio' + num + '" name="inpPrecio' + num + '" placeholder="Valor" data-type="currency" pattern="^\\$\\d{1,3}(,\\d{3})"></div><div class="col-sm-4"><select id="inpTiempo' + num + '" class="form-control inputStyle"><option value="N/A">Tiempo</option></select></div><div class="col-sm-4"><select id="inpRelaciones' + num + '" class="form-control inputStyle"><option value="N/A">Relaciones</option></select></div><div class="col-sm-1 centradoVertical"><button type="button" class="borderNone backgroudNone colorRed btnDeleteRowOptionService hoverGrisClaro outlineNone" data-id="' + num + '"><i class="far fa-minus-square fontSize25px"></i></button></div></div>');
    }

    function addRowOptionsServiciosEditar(num) {
        $("#divCondicionesEditar").append('<div id="rowOptionServiceEditar' + num + '" class="row margin_top_medium"><div class="col-sm-3"><input type="text" id="inpPrecioEditar' + num + '" class="form-control inputStyle inpPrecioEditar" placeholder="Valor" data-type="currency" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"></div><div class="col-sm-4"><select id="inpTiempoEditar' + num + '" class="form-control inputStyle inpTiempoEditar"><option value="N/A">Tiempo</option></select></div><div class="col-sm-4"><select id="inpRelacionesEditar' + num + '" class="form-control inputStyle inpRelacionesEditar"><option value="N/A">Relaciones</option></select></div><div class="col-sm-1 centradoVertical"><button type="button" class="borderNone backgroudNone colorRed outlineNone btnEliminarRowCondicionEditar" data-id="' + num + '"><i class="far fa-minus-square fontSize25px"></i></button></div></div>');
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

    $('body').on('click', '.itemTagEditar', function () {
        if ($(this).data('select') == 1) {
            $(this).css('background-color', "#999");
            $(this).data('select', 0);
            var index = selectTagsEditar.indexOf($(this).data('id'));
            if (index > -1) {
                selectTagsEditar.splice(index, 1);
            }
        } else {
            if (selectTagsEditar.length >= 6) {
                toastr.info("Solo puede seleccionar 6 etiquetas");
                return false;
            }
            $(this).css('background-color', "#C501FE");
            $(this).data('select', 1);
            selectTagsEditar.push($(this).data('id'));
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

    $('body').on('click', '.btnEliminarRowCondicionEditar', function () {
        $("#rowOptionServiceEditar" + $(this).data("id")).remove();
        var index = numRowsOptionServiciosEditar.indexOf($(this).data("id"));
        if (index > -1) {
            numRowsOptionServiciosEditar.splice(index, 1);
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
        AjaxloadOptionsServices({ tipo: "id", id: numRowsOptionServicios.length, accion: "crear" });
    });

    $("#btnAddRowOptionServiceEditar").click(function () {
        numRowsOptionServiciosEditar.push(numRowsOptionServiciosEditar.length + 1);
        addRowOptionsServiciosEditar(numRowsOptionServiciosEditar.length);
        AjaxloadOptionsServices({ tipo: "id", id: numRowsOptionServiciosEditar.length, accion: "editar" });
    });


    $("#btnGuardar").click(function () {

        if ($("#inpCategorias").val() == "N/A") {
            toastr.warning("Debe escoger una categoría");
            return false;
        }

        if ($("#inpDepartamentos").val() == "N/A") {
            toastr.warning("Debe escoger un departamento");
            return false;
        }

        if ($("#inpCiudades").val() == "N/A") {
            toastr.warning("Debe escoger una ciudad");
            return false;
        }

        if ($("#inpTitulo").val().length < 40) {
            toastr.warning("Ingrese un titulo entre 40 y 200 caracteres");
            return false;
        }

        if ($("#inpTitulo").val().length > 200) {
            toastr.warning("el titulo no puede superar los 200 caracteres");
            return false;
        }

        if ($("#inpDescripcion").val().length < 200) {
            toastr.warning("Ingrese una descripcion con mínimo 200 caracteres");
            return false;
        }

        if (!$("#inpAceptTerms").is(':checked')) {
            toastr.info("Debe aceptar los términos y condiciones");
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
                        loadImagenesGaleria(data.id, "guardar");
                        console.log("CARGO GALERIA")
                    }
                    if (keyFotosForm.length > 0) {
                        loadImagenes(data.id, "guardar");
                    } else {
                        limpiar();
                    }
                    toastr.success(data.message);
                    $("#tabMisAnuncios").click();
                } else {
                    toastr.error(data.message);
                }
            }
        });

    });

    $("#btnAceptarEdicion").click(function () {

        if ($("#inpTituloEditar").val().length < 40) {
            toastr.warning("Ingrese un titulo entre 40 y 200 caracteres");
            return false;
        }

        if ($("#inpTituloEditar").val().length > 200) {
            toastr.warning("el titulo no puede superar los 200 caracteres");
            return false;
        }

        if ($("#inpDescripcionEditar").val().length < 200) {
            toastr.warning("Ingrese una descripcion con mínimo 200 caracteres");
            return false;
        }

        let okOptionsServicios = true;
        let selectRowsOptions = [];
        $.each(numRowsOptionServiciosEditar, function (index, i) {
            if ($("#inpPrecioEditar" + i).val() == "" || $("#inpTiempoEditar" + i).val() == "N/A" ||
                $("#inpRelacionesEditar" + i).val() == "N/A") {
                toastr.warning("Debe digitar todos los datos en las condiciones");
                okOptionsServicios = false;
                return false;
            }
            selectRowsOptions.push({
                "precio": $("#inpPrecioEditar" + i).val(),
                "tiempo": $("#inpTiempoEditar" + i).val(),
                "relaciones": $("#inpRelacionesEditar" + i).val()
            });
        });

        if (!okOptionsServicios) { return false; }

        let selectNumber = [];
        $.each(numNumerosEditar, function (index, i) {
            var OptionW = 0;
            var OptionC = 0;
            var idNum;
            if ($('#inpWhatEditar' + i).prop('checked')) {
                OptionW = 1;
            }
            if ($('#inpTelEditar' + i).prop('checked')) {
                OptionC = 1;
            }

            if (OptionW == 1 || OptionC == 1) {
                selectNumber.push({
                    "idNum": i,
                    "optionW": OptionW,
                    "optionC": OptionC
                });
            }
        });

        selectImagenesEliminar = [];
        var elements = $(".preview-images-zone-editar div.filterBlur1pxToimg2");

        $.each(elements, function (index, value) {
            selectImagenesEliminar.push($(value).data('id'));
        });

        var stringData = JSON.stringify({
            titulo: $("#inpTituloEditar").val(),
            descripcion: $("#inpDescripcionEditar").val(),
            etiquetas: selectTagsEditar,
            condiciones: selectRowsOptions,
            telefonos: selectNumber,
            imgEliminar: selectImagenesEliminar,
            id: $("#inpIdAnuncioEditar").val()
        });

        $.ajax({
            url: '../c_general/editAnuncio',
            type: 'POST',
            dataType: "json",
            data: { data: stringData },
            success: function (data) {
                if (data.resultado == true) {
                    if (loadMiGaleriaEditar) {
                        loadImagenesGaleria($("#inpIdAnuncioEditar").val(), "editar");
                    }
                    if (keyFotosFormEditar.length > 0) {
                        loadImagenes($("#inpIdAnuncioEditar").val(), "editar");
                    } else {
                        limpiar();
                    }
                    toastr.success(data.message);
                    $("#modalEditarAnuncio").modal("hide");
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

    $("#tabMensajes").click(function () {
        $(this).html('MENSAJES');
        AjaxSetUltimaVistaMensajes();
    });

    $('#modalMiGaleria').on('show.bs.modal', function (e) {
        if (!loadMiGaleria) {
            AjaxGetMisFotos();
        } else {
            if (selectMisFotos.length > 0) {
                $(".cardMiFoto").removeClass("filterBlur1pxToimg");
                $(".cardMiFoto").addClass("displayNoneToI");
                $.each(selectMisFotos, function (index, value) {
                    $("#divMisFotos").find(".cardMiFoto[data-id='" + value + "']").addClass("filterBlur1pxToimg");
                    $("#divMisFotos").find(".cardMiFoto[data-id='" + value + "']").removeClass("displayNoneToI");
                });
            }
        }
    });

    $('body').on('click', '.cardMiFoto', function () {
        $(this).toggleClass("filterBlur1pxToimg");
        $(this).toggleClass("displayNoneToI");
    });

    $('body').on('click', '.btnEditarAnuncio', function () {
        loadDataAnuncio($(this).data("id"));
        $("#modalEditarAnuncio").modal("show");
    });

    $('#btnSelectMiGaleria').click(function () {
        loadMiGaleria = true;

        selectMisFotos = [];
        var elements = $("#divMisFotos div.filterBlur1pxToimg");

        $.each(elements, function (index, value) {
            selectMisFotos.push($(value).data('id'));
        });

        if (selectMisFotos.length == 0) {
            $("#btnMiGaleria").text('Mi Galeria');
        } else {
            $("#btnMiGaleria").html('Mi Galeria <span class="badge badge-pill fontFamilyRoboto backgroudWhite colorBlue">' + selectMisFotos.length + ' Fotos Selecc.</span>');
        }

    });

    /* -------------------------------- */

    $('body').on('click', '.cardMiFotoEditar', function () {
        $(this).toggleClass("filterBlur1pxToimg");
        $(this).toggleClass("displayNoneToI");
    });

    $('#btnSelectMiGaleriaEditar').click(function () {
        loadMiGaleriaEditar = true;

        selectMisFotosEditar = [];
        var elements = $("#divMisFotosEditar div.filterBlur1pxToimg");

        $.each(elements, function (index, value) {
            selectMisFotosEditar.push($(value).data('id'));
        });

        if (selectMisFotosEditar.length == 0) {
            $("#btnMiGaleriaEditar").text('Mi Galeria');
        } else {
            $("#btnMiGaleriaEditar").html('Mi Galeria <span class="badge badge-pill fontFamilyRoboto backgroudWhite colorBlue">' + selectMisFotosEditar.length + ' Fotos Selecc.</span>');
        }

        $("#modalMiGaleriaEditar").modal("hide");
        $("#modalEditarAnuncio").modal("show");
    });

    $('#btnMiGaleriaEditar').click(function () {
        if (!loadMiGaleriaEditar) {
            AjaxGetMisFotosEditar();
        } else {
            if (selectMisFotosEditar.length > 0) {
                $(".cardMiFotoEditar").removeClass("filterBlur1pxToimg");
                $(".cardMiFotoEditar").addClass("displayNoneToI");
                $.each(selectMisFotosEditar, function (index, value) {
                    $("#divMisFotosEditar").find(".cardMiFotoEditar[data-id='" + value + "']").addClass("filterBlur1pxToimg");
                    $("#divMisFotosEditar").find(".cardMiFotoEditar[data-id='" + value + "']").removeClass("displayNoneToI");
                });
            }
        }
        $("#modalEditarAnuncio").modal("hide");
        $("#modalMiGaleriaEditar").modal("show");
    });


    $('body').on('click', '.btnEliminarAnuncio', function () {
        $("#inpIdEliminarAnuncio").val($(this).data("id"));
        $("#modalEliminarAnuncio").modal("show");
    });

    $("#btnAceptarEliminarAnuncio").click(function () {
        AjaxEliminarAnuncio($("#inpIdEliminarAnuncio").val());
    });

    $('body').on('click', '.btnEstadisticas', function () {
        $("#inpIdAnuncioEstadisticas").val($(this).data("id"));
        $("#ldlTitleEstadisticas").text("Estadisticas del anuncio " + $(this).data("id"));
        AjaxDatosGraficosGenerales($(this).data("id"), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
        AjaxDatosGraficosPie($(this).data("id"), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
        AjaxDatosGeneralesEstadistica($(this).data("id"));
        AjaxDatosFechasByAnuncio($(this).data("id"));
        $("#modalEstadisticas").modal("show");
    });

    $("#inpCargarEstadistica").click(function () {
        AjaxDatosGraficosGenerales($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
        AjaxDatosGraficosPie($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
        AjaxDatosGeneralesEstadistica($("#inpIdAnuncioEstadisticas").val());
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

    function AjaxDatosFechasByAnuncio(id) {
        $("#lblEstadisticaCreacion").text("Creacion: - ");
        $("#lblEstadisticaUltimaEdicion").text("Ultima edicion: - ");
        $.ajax({
            url: '../c_general/getFechasAnuncioById',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: id },
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data[0];
                    $("#lblEstadisticaCreacion").html("Creacion: <b>" + data.fechaCreacionFormat + "</b>");
                    $("#lblEstadisticaUltimaEdicion").html("Ultima edicion: <b>" + data.fechaUltEdicionFormat + "</b>");
                }
            }
        });
    }

    function AjaxDatosGeneralesEstadistica(id) {
        $.ajax({
            url: '../c_general/getAuditoriaByAnuncio',
            type: 'POST',
            dataType: "json",
            data: { id: id },
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
    }

    function AjaxDatosGraficosGenerales(id, fecha1, fecha2) {
        if (typeof myChartV !== "undefined") {
            myChartV.destroy();
            myChartW.destroy();
            myChartC.destroy();
        }
        $.ajax({
            url: '../c_general/getAuditoriaGraficoByAnuncioAndFecha',
            type: 'POST',
            dataType: "json",
            data: { id: id, fecha1: fecha1, fecha2: fecha2 },
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

                    var objsV = [createObjChart("Visitas", { "border": 'rgba(197, 1, 254, 1)', "background": 'rgba(197, 1, 254, 0.2)' }, objVistas)];

                    var objsW = [createObjChart("WhatsApp", { "border": 'rgba(0, 219, 109, 1)', "background": 'rgba(0, 219, 109, 0.4)' }, objWhat)];

                    var objsC = [createObjChart("Llamadas", { "border": 'rgba(3, 169, 244, 1)', "background": 'rgba(3, 169, 244, 0.4)' }, objCall)];

                    createChartV(dias, objsV);
                    createChartW(dias, objsW);
                    createChartC(dias, objsC);
                }
            }
        });
    }

    function AjaxDatosGraficosPie(id, fecha1, fecha2) {
        if (typeof myChartPie !== "undefined") {
            myChartPie.destroy();
        }
        $.ajax({
            url: '../c_general/getAuditoriaGraficoTipoVistaByAnuncioAndFecha',
            type: 'POST',
            dataType: "json",
            data: { id: id, fecha1: fecha1, fecha2: fecha2 },
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    createChartPie([data[0].valor, data[1].valor]);
                }
            }
        });
    }

    function createChartPie(data) {
        var ctx = document.getElementById('myChartPieDiv').getContext('2d');
        myChartPie = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgb(255, 159, 64)',
                        'rgb(54, 162, 235)',
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'Vistas PC',
                    'Vistas Movil',
                ]
            },
            options: {
                responsive: true
            }
        });
    }

    function createChartV(dias, data) {
        var ctx = document.getElementById("myChartVistas").getContext('2d');
        myChartV = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 15,
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

    function createChartW(dias, data) {
        var ctx = document.getElementById("myChartWhat").getContext('2d');
        myChartW = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 15,
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

    function createChartC(dias, data) {
        var ctx = document.getElementById("myChartCall").getContext('2d');
        myChartC = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 15,
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





    // PROCESO UPLOADS IMAGENES 

    $('body').on('click', '.image-cancel', function () {
        let num = $(this).data('num');
        $(".preview-image.preview-show-" + num).remove();
        dataFormFotos.delete('file-' + num);
        let index = keyFotosForm.indexOf(num);
        if (index > -1) {
            keyFotosForm.splice(index, 1);
        }
    });

    document.getElementById('pro-image').addEventListener('change', readImage, false);
    $(".preview-images-zone").sortable();

    var numImagenesInput = 0;
    function readImage() {
        // $(".preview-images-zone").html("");
        if (window.File && window.FileList && window.FileReader) {
            var files = event.target.files;
            output = $(".preview-images-zone");

            for (let i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.type.match('image')) continue;

                dataFormFotos.append('file-' + numImagenesInput, file);
                keyFotosForm.push(numImagenesInput);

                var output = $(".preview-images-zone");
                var html = '<div class="preview-image preview-show-' + numImagenesInput + '">' +
                    '<div class="image-cancel" data-num="' + numImagenesInput + '"><i class="fas fa-times"></i></div>' +
                    '<div class="image-zone"><img id="pro-img-' + numImagenesInput + '" src="' + URL.createObjectURL(file) + '"></div>' +
                    '</div>';
                output.append(html);

                numImagenesInput++;
            }
            //  $("#pro-image").val('');
        } else {
            console.log('Browser not support');
        }

    }



    // PROCESO UPLOADS IMAGENES EDITAR

    $('body').on('click', '.image-eliminar', function () {
        let num = $(this).data('num');
        $(".preview-image-editar.preview-img-actual.preview-show-" + num).toggleClass("filterBlur1pxToimg2");
        $(".preview-image-editar.preview-img-actual.preview-show-" + num + " .image-zone").toggleClass("displayNoneToI");
    });

    $('body').on('click', '.image-cancel-editar', function () {
        let num = $(this).data('num');
        $(".preview-image-editar.preview-show-" + num).remove();
        dataFormFotosEditar.delete('file-' + num);
        let index = keyFotosFormEditar.indexOf(num);
        if (index > -1) {
            keyFotosFormEditar.splice(index, 1);
        }
    });

    document.getElementById('pro-imageEditar').addEventListener('change', readImageEditar, false);
    $(".preview-images-zone-editar").sortable();

    var numImagenesInputEditar = 0;
    function readImageEditar() {
        // $(".preview-images-zone").html("");
        if (window.File && window.FileList && window.FileReader) {
            var files = event.target.files;
            output = $(".preview-images-zone-editar");

            for (let i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.type.match('image')) continue;

                dataFormFotosEditar.append('file-' + numImagenesInputEditar, file);
                keyFotosFormEditar.push(numImagenesInputEditar);

                var output = $(".preview-images-zone-editar");
                var html = '<div class="preview-image-editar preview-show-' + numImagenesInputEditar + '">' +
                    '<div class="image-cancel-editar" data-num="' + numImagenesInputEditar + '"><i class="fas fa-times"></i></div>' +
                    '<div class="image-zone"><img id="pro-imgEditar-' + numImagenesInputEditar + '" src="' + URL.createObjectURL(file) + '"></div>' +
                    '</div>';
                output.append(html);

                numImagenesInputEditar++;
            }
            //  $("#pro-image").val('');
        } else {
            console.log('Browser not support');
        }

    }


    /* *** ************** */

    $('body').on('click', '.btnComprarCreditos', function () {
        event.preventDefault();
        //let id = $(this).data("id");
        $("#btnAceptarPago").click();
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
