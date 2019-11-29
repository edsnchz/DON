$(function () {

    // LOAD TABS DESDE EL LOGIN
    if(tabDefault != null){
        if(tabDefault == 0){
            $("#tabMisAnuncios").click();
        }else if(tabDefault == 1){
            $("#tabCrearAnuncio").click();
        }
    }
    
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
    var myChartV, myChartW, myChartC, myChartTiposVistas, myChartVistasHoras, 
        myChartInversionFecha, myChartInversionTotalByTipo;
    AjaxLoadMisAnuncios();
    AjaxLoadNumbers();
    AjaxloadOptionsServices({ tipo: "class" });
    AjaxGetUsersMensajes();
    AjaxAlarmMensajes();
    AjaxGetPreciosCreditos();
    AjaxGetMisCreditos();

    $("#inpFecha1Estadistica").val(SubDateNow(15));
    $("#inpFecha2Estadistica").val(dateNow());

    $("#inpFecha1Inversion").val(SubDateNow(15));
    $("#inpFecha2Inversion").val(dateNow());

    // CREO EL EDITOR DE TEXTO
    crearEditorCrear("inpDescripcion");
    crearEditorEditar("inpDescripcionEditar");

    $.ajax({
        url: '../c_general/getCategorias',
        type: 'POST',
        dataType: "json",
       // async: false,
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
       // async: false,
        success: function (data) {
            if (data.resultado == true) {
                $.each(data.data, function (key, value) {
                    $("#inpDepartamentos").append("<option value=" + value.id + ">" + value.nombre + "</option>");
                });
            }
        }
    });

    $.ajax({
        url: '../c_general/getConceptosSoportes',
        type: 'POST',
        dataType: "json",
        success: function (data) {
            if (data.resultado == true) {
                $.each(data.data, function (key, value) {
                    $("#inpTipoSoporte").append("<option value=" + value.id + ">" + value.nombre + "</option>");
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

    function AjaxGetNextInvoice() {
        let temp;
        $.ajax({
            url: '../c_general/getNextInvoice',
            type: 'POST',
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    temp = data.data;
                }
            },
            error: function (xr) {
                toastr.error("Error al obtener los datos");
            }
        });
        return temp;
    }

    function AjaxGetDataCreditos(id) {
        let temp;
        $.ajax({
            url: '../c_general/getDataCreditoByID',
            type: 'POST',
            dataType: "json",
            async: false,
            data: { id: id },
            success: function (data) {
                if (data.resultado == true) {
                    temp = data.data;
                }
            },
            error: function (xr) {
                toastr.error("Error al obtener los datos de los creditos");
            }
        });
        return temp;
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

    function AjaxChangePass(lastPass, newPass) {
        $.ajax({
            url: '../c_app/changePass',
            type: 'POST',
            dataType: "json",
            data: {lastpass: lastPass, newpass: newPass},
            success: function (data) {
                if (data.resultado == true) {
                    toastr.success(data.message);
                    $("#inpActualPass").val("")
                    $("#inpNewPass").val("")
                    $("#inpReNewPass").val("")
                }else{
                    toastr.error(data.message);
                }
            }
        });
    }

    function AjaxSendFeedBack(votacion, estrellas, mensaje) {
        $.ajax({
            url: '../c_general/saveFeedBack',
            type: 'POST',
            dataType: "json",
            data: {votacion: votacion, estrellas: estrellas, mensaje: mensaje},
            success: function (data) {
                if (data.resultado == true) {
                    toastr.success(data.message);
                    $(".iconRating").removeClass("colorPink");
                    $("#lblTextRating").html("");
                    $("#inpMsjRating").val("");
                }else{
                    toastr.error(data.message);
                }
            }
        });
    }

    function AjaxSendSupport(idConcepto, mensaje) {
        $.ajax({
            url: '../c_general/saveTicketSupport',
            type: 'POST',
            dataType: "json",
            data: {idConcepto: idConcepto, mensaje: mensaje},
            success: function (data) {
                if (data.resultado == true) {
                    toastr.success(data.message);
                    $("#inpTipoSoporte").val("N/A");
                    $("#inpMsjSoporte").val("");
                }else{
                    toastr.error(data.message);
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
                    $("#inpDescripcionEditar .ql-editor").html(data[0].descripcionFormat);
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
                        $("#divCondicionesEditar").append('<div id="rowOptionServiceEditar' + value.id + '" class="row margin_top_medium"><div class="col-6 col-sm-3 margin_top_small paddingRight5pxMovil"><input type="text" id="inpPrecioEditar' + value.id + '" class="form-control inputStyle inpPrecioEditar" placeholder="Valor" data-type="currency" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"></div><div class="col-6 col-sm-4 margin_top_small paddingLeft5pxMovil"><select id="inpTiempoEditar' + value.id + '" class="form-control inputStyle inpTiempoEditar"><option value="N/A">Tiempo</option></select></div><div class="col-6 col-sm-4 margin_top_small paddingRight5pxMovil"><select id="inpRelacionesEditar' + value.id + '" class="form-control inputStyle inpRelacionesEditar"><option value="N/A">Relaciones</option></select></div><div class="col-6 col-sm-1 centradoVertical margin_top_small paddingLeft5pxMovil"><button type="button" class="borderNone backgroudNone colorRed outlineNone btnEliminarRowCondicionEditar width100porciento displayFlexCenterMovil" data-id="' + value.id + '"><span class="d-block d-sm-none fontSize13px margin_right_small">Eliminar:</span><i class="far fa-minus-square fontSize25px"></i></button></div></div>');
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

    var requestValidPass;

    function AjaxValidCurrentPass() {
        var rtn;

        if(requestValidPass != null || typeof requestValidPass != "undefined"){
            requestValidPass.abort();
        }

        requestValidPass = $.ajax({
            url: '../c_app/getPassCurrent',
            type: 'POST',
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    let res = data.data;

                    if($("#inpActualPass").val() != res[0].pass){
                        $("#inpActualPass").addClass("alertErrorInput");
                        $("#lblValidCurrentPass").addClass("displayBlock");
                        $("#btnAceptarCambiarClave").prop("disabled", true);
                        rtn = false;
                    }else{
                        $("#inpActualPass").removeClass("alertErrorInput");
                        $("#lblValidCurrentPass").removeClass("displayBlock");
                        $("#btnAceptarCambiarClave").prop("disabled", false);
                        rtn = true;
                    }
                    
                } else {
                    toastr.error(data.message);
                }
            }
        });
        return rtn;
    }

    function AjaxLoadMisAnuncios() {
        $("#divMisAnuncios").html("");
        $.ajax({
            url: '../c_general/getAnunciosByUser',
            type: 'POST',
            dataType: "json",
            beforeSend: function(data){
                loading.show();
            },
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (index, value) {
                        var stringTop = '';
                        if (value.isTop == 1) {
                            var stringTop = '<button class="btn btn-success btnMarkItemAnuncio">TOP</button>';
                        }

                        var stringCategoria = '<div class="btnCategoriaItemAnuncioListR">' + value.categoria + '</div>';

                        var stringCityAnuncio = '<div class="btnCityAnuncioListR">' + value.ciudad + '</div>';

                        var stringUltEdicion = '<div class="btnUltEdicionMiAnuncio">Actualizado: ' + value.fechaUltEdicionFormat + '</div>';

                        var stringNumero = '<div class="btnNumeroMiAnuncio">ID: ' + value.id + '</div>';

                        $("#divMisAnuncios").append('<div class="col-sm-12 col-md-6"><div class="container backgroundGray sombra margin_top_medium"><div class="row"><div class="col-4 col-sm-3 padding0"><div class="backgroundGrayDos"><img src="../../uploads/anuncios/' + value.url + '" class="imgItemCarousel" style="height: 143px"></div>' + stringTop + stringNumero + '</div><div class="col-8 col-sm-6 paddingSuperior10px"><h5 class="colorGrisOscuro fontFamilyRoboto fontWeight900 margin_bottom_5px"><a href="' + urlProyect() + 'anuncio?id=' + value.id + '" class="hoverColorPink colorGrisOscuro fontFamilyRoboto textDecorationNone">' + ((value.titulo.length > 50) ? value.titulo.substring(0, 50) + "..." : value.titulo) + '</a></h5><p class="fontFamilyRoboto colorGrisMenosOscuro fontSize14px">' + ((value.descripcion.length > 50) ? value.descripcion.substring(0, 50).toLowerCase() + "..." : value.descripcion.toLowerCase()) + '</p>' + stringCategoria + stringCityAnuncio + stringUltEdicion + '</div><div class="col-12 col-sm-3" style="padding: 0px 5px"><div class="btn-group padding0 width100porciento margin_top_small" role="group"><button class="btn backgroundGrayDosbtn btnEditarAnuncio" data-id="' + value.id + '" title="Editar Anuncio"><i class="far fa-edit"></i></button><button class="btn backgroundGrayDosbtn btnEliminarAnuncio colorRed2" data-id="' + value.id + '" title="Eliminar Anuncio"><i class="far fa-trash-alt"></i></button></div><div class="btn-group padding0 width100porciento margin_top_small" role="group"><button class="btn backgroundGrayDosbtn btnEstadisticas" data-id="' + value.id + '" title="Estadísticas"><i class="far fa-chart-bar"></i></button><button class="btn backgroundGrayDosbtn btnRelojito colorPink" data-id="' + value.id + '" title="Subidas Individuales"><i class="fas fa-history"></i></button></div><button class="btnPromocionar btn fontFamilyRoboto backgroundPinkClaro hoverBackgroundPinkOscuro hoverColorWhite width100porciento margin_top_7px colorWhite fontSize13px borderRadius0px fontWeight600" data-id="' + value.id + '">Promocionar</button></div></div></div></div>');
                    });
                }

            },
            complete: function(data){
                loading.hide();
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
                    $(".spCreditos2").html('Tienes ' + data[0]["cantidad"] + ' créditos -- <i class="fas fa-donate"></i>');
                } else {
                    toastr.error("Error al cargar los créditos");
                }
            }
        });
    }

    function AjaxReturnMisCreditos() {
        let temp;
        $.ajax({
            url: '../c_general/getCreditosByUser',
            type: 'POST',
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    temp = data[0]["cantidad"];
                } else {
                    toastr.error("Error al cargar los créditos");
                }
            }
        });
        return temp;
    }

    function AjaxGetPromocionesByIdPaqueteAndDia(idPaquete, dia) {
        var rtn;
        $.ajax({
            url: '../c_general/getPromocionesByTipoAndDia',
            type: 'POST',
            dataType: "json",
            data: {idPaquete: idPaquete, dias: dia},
            async: false,
            success: function (data) {
                if (data.resultado == true) {
                    rtn = data.data;
                } else {
                    toastr.error("Error al cargar los paquetes");
                }
            }
        });
        return rtn;
    }

    function AjaxGetRelojitosActuales(idAnuncio) {
        $("#divPillsRelojitosActivos").html("");
        $.ajax({
            url: '../c_general/getPromocionesRelojitoActivas',
            type: 'POST',
            dataType: "json",
            data: {idAnuncio: idAnuncio},
            success: function (data) {
                if (data.resultado == true) {
                    let datos = data.data;
                    $.each(datos, function (key, value) {
                        $("#divPillsRelojitosActivos").append('<span class="badge badge-success fontFamilyRoboto colorWhite fontSize14px '+((key>0)?'margin_left_10px':'')+' margin_top_6px">'+value.hora_inicial+'</span>');
                    });
                    if(datos.length >= 5){
                        $("#btnAceptarRelojito").prop("disabled", true);
                        $("#inpHoraInicioRelojito").prop("disabled", true);
                        $("#divAlertMaximoRelojito").removeClass("displayNone");
                        $("#divAlertMaximoRelojito").addClass("displayBlock");                        
                    }else{
                        $("#btnAceptarRelojito").prop("disabled", false);
                        $("#inpHoraInicioRelojito").prop("disabled", false);
                        $("#divAlertMaximoRelojito").removeClass("displayBlock");
                        $("#divAlertMaximoRelojito").addClass("displayNone");
                    }
                } else {
                    toastr.error("Error al cargar subidas individuales programadas");
                }
            }
        });
    }

    function AjaxGetDiffPromocionesDestacar(idAnuncio, idOpcion) {
        $.ajax({
            url: '../c_general/getPromocionesDiffDiasByAnuncioAndOpcion',
            type: 'POST',
            dataType: "json",
            data: {idAnuncio: idAnuncio, idOpcion: idOpcion},
            success: function (data) {
                if (data.resultado == true) {
                    let datos = data.data;
                    let divPre = "countDiasPremiun";
                    let divPla = "countDiasPlatino";
                    if(datos.length > 0){
                        let string = '<i class="fas fa-clock"></i> PAQUETE ACTIVO: <b>('+datos[0]["diff"]+' Dias Restantes)</b>';
                        if(datos[0]["diff"] == 0){
                            string = "Ultimo Dia <b>Impulsa nuevamente tu anuncio</b>";
                        }
                        $("#"+((idOpcion==14)?divPre:divPla)).html(string);
                        $("#"+((idOpcion==14)?divPre:divPla)).removeClass("displayNone");
                        $("#"+((idOpcion==14)?divPre:divPla)).addClass("displayBlock");

                        $("#"+((idOpcion==14)?"tituloPremiun":"tituloPlatino")).addClass("margin_top_medium");
                    }else{
                        $("#"+((idOpcion==14)?divPre:divPla)).removeClass("displayNone");
                        $("#"+((idOpcion==14)?divPre:divPla)).removeClass("displayBlock");
                        $("#"+((idOpcion==14)?divPre:divPla)).addClass("displayNone");

                        $("#"+((idOpcion==14)?"tituloPremiun":"tituloPlatino")).removeClass("margin_top_medium");
                    }
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
                        $("#divPrecios").append('<div class="col-12 col-sm-4 col-md-2 margin_top_medium"><div class="card sombraPequeña"><div class="card-body centradoHorizontal" style="height: 80px"><h5 class="textCenter fontSize22px margin_bottom_0px">' + value.creditos + '</h5><h6 class="fontFamilyRoboto margin_bottom_0px colorGrisOscuro margin_top_8px">&nbsp;Créditos</h6><label class="textCenter positionAbsolute Top45px fontFamilyRoboto fontSize13px colorGrisMenosOscuro">' + value.beneficio + '</label></div><ul class="list-group list-group-flush"><li class="list-group-item textCenter fontSize18px fontFamilyRoboto paddingSuperiorInferior20px">' + formatCurrencyString(value.valor) + '</li></ul><div class="card-body backgroundPinkClaro textCenter cursorPointer hoverBackgroundPinkOscuro btnComprarCreditos" data-id="' + value.id + '"><h4 class="colorWhite fontSize14px textUppercase fontWeight600 margin_bottom_0px">Comprar</h4></div></div></div>');
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

    function AjaxInsertPromocionAnuncio(idAnuncio, idOpcion, fechaHoraI, fechaHoraF) {
        let rtn;
        $.ajax({
            url: '../c_general/insertPromocionAnuncio',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: idAnuncio, idOpcion: idOpcion, fechaHoraI: fechaHoraI, fechaHoraF: fechaHoraF },
            async: false,
            success: function (data) {
                rtn = data;
            }
        });
        return rtn;
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
        $("#inpDescripcion .ql-editor").html("");
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
                            $("#divRemitentes").append('<div class="rowRemitentes col-sm-12 borderBottomSolid1pxGrayClaro margin_superiores_1px paddingSuperiorInferior13px hoverLeftSolidPink cursorPointer fontFamilyRoboto fontSize12px backgroudWhite" data-correo="' + value.correo + '"><i class="fas fa-user fontSize22px paddingLeft15px colorGrisMasClaro"></i><label class="paddingLeft15px">' + value.correo + '</label><button class="btn btn-light btnStyleResponMensaje fontWeight600 colorGrisOscuro btnResponderMail height100porciento fontFamilyRoboto paddingSuperiorInferior5px" data-correo="' + value.correo + '"><span class="oi oi-share"></span> <br> Enviar mail</button></div>');
                        } else {
                            $("#divRemitentes").append("<div class='rowRemitentes col-sm-12 borderBottomSolid1pxGrayClaro margin_superiores_1px paddingSuperiorInferior13px hoverLeftSolidPink cursorPointer fontFamilyRoboto fontSize12px backgroudWhite' data-correo='" + value.correo + "'><i class='fas fa-user fontSize22px paddingLeft15px colorGrisMasClaro'></i><label class='paddingLeft15px'>" + value.correo + "</label></div>");
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
                        $("#divMensajes").append('<div class="burbujaChat shadow-sm fontFamilyRoboto colorGrisOscuro"><p>' + value.mensaje + '</p><div class="textRight fontFamilyRoboto fontWeight300 colorGrisClaro"><small>Recibido: ' + value.fecha + '</small></div></div>');
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
        $("#divTelefonos").append('<div class="col-sm-3 margin_top_small"><div class="card backgroundGhostWhite"><div class="card-body textCenter"><h6 id="lblNumero' + id + '" class="card-subtitle mb-2 text-muted textCenter fontWeight600 colorGrisOscuroTels fontSizeBig fontSize17pxMovil">' + number + '</h6><p class="card-text"><div class="row"><div class="col-6 col-sm-12"><div class="form-group pull-left centradoVertical"><input id="inpWhat' + i + '" type="checkbox" name="inpWhat' + i + '" class="checkStyle margin_left_small" data-id="' + id + '"><label for="inpWhat' + i + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">WhatsApp</label></div></div><div class="col-6 col-sm-12"><div class="form-group pull-left centradoVertical"><input id="inpTel' + i + '" type="checkbox" name="inpTel' + i + '" class="checkStyle margin_left_small margin0Movil"  data-id="' + id + '"><label for="inpTel' + i + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">Llamadas</label></div></div></p><br><br><a id="btnEliminar' + i + '" href="#" class="card-link margin0 colorRed hoverGrisClaro fontFamilyRoboto fontSize14px width100porciento" data-id="' + id + '" onclick="eliminarNumero(this)" data-toggle="modal" data-target="#modalEliminarNumero">Eliminar</a></div></div></div>');
    }

    function renderCelularesVacias() {
        $("#divTelefonos").append('<div class="col-sm-3 margin_top_small"><div class="card backgroundGrayDos colorWhite cursorPointer" style="height: 170px"><div class="card-body textCenter"><h6 class="card-subtitle mb-2 text-muted textCenter"></h6><p class="card-text"><div class="form-group"><img class="height80px" src="../../images/phone_plus.svg"></div></p><a href="#" class="card-link hoverGrisClaro fontFamilyRoboto fontSize14px" data-toggle="modal" data-target="#modalNumber">Agregar número</a></div></div></div>');
    }

    function renderCelularesEditar(id, number) {
        $("#divTelefonosEditar").append('<div class="col-sm-3 margin_top_small"><div class="card backgroundGhostWhite"><div class="card-body textCenter"><h6 id="lblNumero' + id + '" class="card-subtitle mb-2 text-muted textCenter fontWeight600 colorGrisOscuroTels fontSizeBig fontSize17pxMovil">' + number + '</h6><p class="card-text"><div class="row"><div class="col-6 col-sm-12"><div class="form-group pull-left centradoVertical"><input id="inpWhatEditar' + id + '" type="checkbox" name="inpWhat' + id + '" class="checkStyle margin_left_small" data-id="' + id + '"><label for="inpWhatEditar' + id + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">WhatsApp</label></div></div><div class="col-6 col-sm-12"><div class="form-group pull-left centradoVertical"><input id="inpTelEditar' + id + '" type="checkbox" name="inpTel' + id + '" class="checkStyle margin_left_small"  data-id="' + id + '"><label for="inpTelEditar' + id + '" class="fontFamilyPoppins fontWeight600 textUppercase fontSize12px colorGrisClaro margin_left_MasSmall height6px">Llamadas</label></div></div></p></div></div></div>');
    }

    function addRowOptionsServicios(num) {
        $("#divRowsOptionsServicios").append('<div id="rowOptionService' + num + '" class="row margin_top_small rowOptionService"><div class="col-6 col-sm-3 margin_top_small paddingRight5pxMovil"><input type="text" class="form-control inputStyle" id="inpPrecio' + num + '" name="inpPrecio' + num + '" placeholder="Valor" data-type="currency" pattern="^\\$\\d{1,3}(,\\d{3})"></div><div class="col-6 col-sm-4 margin_top_small paddingLeft5pxMovil"><select id="inpTiempo' + num + '" class="form-control inputStyle"><option value="N/A">Tiempo</option></select></div><div class="col-6 col-sm-4 margin_top_small paddingRight5pxMovil"><select id="inpRelaciones' + num + '" class="form-control inputStyle"><option value="N/A">Relaciones</option></select></div><div class="col-6 col-sm-1 centradoVertical margin_top_small paddingLeft5pxMovil"><button type="button" class="borderNone backgroudNone colorRed btnDeleteRowOptionService hoverGrisClaro outlineNone width100porciento displayFlexCenterMovil" data-id="' + num + '"><span class="d-block d-sm-none fontSize13px margin_right_small colorRed">Eliminar:</span><i class="far fa-minus-square fontSize25px"></i></button></div></div>');
    }

    function addRowOptionsServiciosEditar(num) {
        $("#divCondicionesEditar").append('<div id="rowOptionServiceEditar' + num + '" class="row margin_top_medium"><div class="col-6 col-sm-3 margin_top_small paddingRight5pxMovil"><input type="text" id="inpPrecioEditar' + num + '" class="form-control inputStyle inpPrecioEditar" placeholder="Valor" data-type="currency" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"></div><div class="col-6 col-sm-4 margin_top_small paddingLeft5pxMovil"><select id="inpTiempoEditar' + num + '" class="form-control inputStyle inpTiempoEditar"><option value="N/A">Tiempo</option></select></div><div class="col-6 col-sm-4 margin_top_small paddingRight5pxMovil"><select id="inpRelacionesEditar' + num + '" class="form-control inputStyle inpRelacionesEditar"><option value="N/A">Relaciones</option></select></div><div class="col-6 col-sm-1 centradoVertical margin_top_small paddingLeft5pxMovil"><button type="button" class="borderNone backgroudNone colorRed outlineNone btnEliminarRowCondicionEditar width100porciento displayFlexCenterMovil" data-id="' + num + '"><span class="d-block d-sm-none fontSize13px margin_right_small colorRed">Eliminar:</span><i class="far fa-minus-square fontSize25px"></i></button></div></div>');
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

    function getTextEditor(obj){
        let text = obj.getText(0, obj.getLength());
        let rtn = text.replace("\n", "");
        return rtn;
    }

    function getHTMLEditor(obj){
        let rtn = obj.root.innerHTML;
        return rtn;
    }

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

        if ((quillCrear.getLength()) < 200) {
            toastr.warning("Ingrese una descripción con mínimo 200 caracteres");
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
            descripcion: getTextEditor(quillCrear),
            descripcionFormat: getHTMLEditor(quillCrear),
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

        if ((quillEditar.getLength()) < 200) {
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
            descripcion: getTextEditor(quillEditar),
            descripcionFormat: getHTMLEditor(quillEditar),
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
        if(isMobileAndTablet()){
            $("#divColRemitentes").toggle("slide", function(){
                $("#divMensajes").toggleClass("displayNoneMovil");
            });
            $("#btnArrowMensajes").show("slide", { direction: "right" }, 400);    
        }

        AjaxGetMensajes($(this).data("correo"));
        $(".rowRemitentes button").remove(":contains('Enviar')");
        $(this).append('<button class="btn btn-light btnStyleResponMensaje fontWeight600 colorGrisOscuro btnResponderMail height100porciento fontFamilyRoboto paddingSuperiorInferior5px" data-correo="' + $(this).data("correo") + '"><span class="oi oi-share"></span> <br> Enviar mail</button>');
    });

    $('body').on('click', '.btnResponderMail', function () {
        console.log("fff")
        event.preventDefault();
        var email = $(this).data("correo");
        var subject = 'Respuesta mensaje privado en doneróticos.com';
        window.open('mailto:' + email + '?subject=' + subject + '&body=', '_blank');
    });

    $("#tabMensajes").click(function () {
        $(this).html('MENSAJES');
        AjaxSetUltimaVistaMensajes();
    });

    $('#btnArrowMensajes').click(function () {
        $("#divMensajes").toggleClass("displayNoneMovil");
        $("#divColRemitentes").toggle("slide");
        $(this).hide("slide", { direction: "right" }, 400);
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

    function setCreditosSpanFloat(){
        let creditos = AjaxReturnMisCreditos();
        if(typeof creditos === "undefined" || creditos == 0){
            $(".spCreditosModals").html('Click para adquirir créditos -- <i class="fas fa-donate"></i>');
            $("#btnAceptarRelojito").prop("disabled", true);
            $("#btnAceptarPromocion").prop("disabled", true);
        }else{
            $(".spCreditosModals").html('Tienes ' + creditos + ' créditos -- <i class="fas fa-donate"></i>');
            $("#btnAceptarRelojito").prop("disabled", false);
            $("#btnAceptarPromocion").prop("disabled", false);
        }
        AjaxGetMisCreditos();
    }

    $('body').on('click', '.spCreditosModals', function () {
        $('#tabMisCreditos').tab('show');
        $("#modalRelojito").modal("hide");
        $("#modalPromociones").modal("hide");
    });

    $('#modalRelojito').on('hidden.bs.modal', function (e) {
        $("#btnAceptarRelojito").prop("disabled", false);
    });

    $('#modalPromociones').on('hidden.bs.modal', function (e) {
        $(".navPromoREDias").data("load", false);
    });

    $('#modalHoraPromocion').on('hidden.bs.modal', function (e) {
        $("#modalPromociones").modal("show");
    });

    var isPremiunPack = false;
    var isPlatinoPack = false;

    $('body').on('click', '.btnRelojito', function () {
        isPremiunPack = false;
        setCreditosSpanFloat();
        AjaxGetRelojitosActuales($(this).data("id"));
        $("#inpIdAnuncioRelojito").val($(this).data("id"));
        $("#modalRelojito").modal("show");
    });

    $('body').on('click', '.btnPromocionar', function () {
        setCreditosSpanFloat();
        AjaxGetDiffPromocionesDestacar($(this).data("id"), "14");
        AjaxGetDiffPromocionesDestacar($(this).data("id"), "15");
        $("#inpIdAnuncioPromocion").val($(this).data("id"));
        $("#modalPromociones").modal("show");
        $("#nav7Dias").click();
    });

    $('body').on('click', '.btnOpcionPromocion', function () {
        isPlatinoPack = false;
        $("#inpIdOpcionPromocion").val($(this).data("id"));
        $("#inpDiasPromocion").val($(this).data("dias"));
        $("#inpHorasPromocion").val($(this).data("horas"));
        $("#modalHoraPromocion").modal("show");
        $("#modalPromociones").modal("hide");
    });

    function accionesBtnPremiun(){
        let creditos = AjaxReturnMisCreditos();
        if(creditos<150){
            toastr.error("No tienes suficientes creditos para realizar la compra");
            return false;
        }
        $("#modalPromociones").modal("hide");
        setCreditosSpanFloat();
        AjaxGetRelojitosActuales($("#inpIdAnuncioPromocion").val());
        $("#inpIdAnuncioRelojito").val($("#inpIdAnuncioPromocion").val());
        $("#modalRelojito").modal("show");
        isPremiunPack = true;
    }

    $('body').on('click', '#btnPackPremiun', function () {
        if($("#countDiasPlatino").hasClass("displayBlock")){
            $.confirm({
                title: 'Esta Seguro!',
                content: 'Al comprar este paquete perdera el paquete platino activo, Desea continuar?',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    confirm: {
                        btnClass: 'btn-red', 
                        action: function () {
                            accionesBtnPremiun();
                        }
                    },
                    cancel: function () {
                    }
                }
            });
        }else{
            accionesBtnPremiun();
        }
    });

    function accionesBtnPlatino(){
        let creditos = AjaxReturnMisCreditos();
        if(creditos<1300){
            toastr.error("No tienes suficientes creditos para realizar la compra");
            return false;
        }
        $("#modalPromociones").modal("hide");
        $("#inpIdOpcionPromocion").val("2");
        $("#inpDiasPromocion").val("7");
        $("#inpHorasPromocion").val("8");
        $("#modalHoraPromocion").modal("show");
        isPlatinoPack = true;
    }

    $('body').on('click', '#btnPackPlatino', function () {
        if($("#countDiasPremiun").hasClass("displayBlock")){
            $.confirm({
                title: 'Esta Seguro!',
                content: 'Al comprar este paquete perdera el paquete premiun activo, Desea continuar?',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    confirm: {
                        btnClass: 'btn-red', 
                        action: function () {
                            accionesBtnPlatino();
                        }
                    },
                    cancel: function () {
                    }
                }
            });
        }else{
            accionesBtnPlatino();
        }
    });

    function createObjectMoment(array){
        let time;
        time = moment();
        time.hour(arrayHora[0]);
        time.minute(arrayHora[1]);
        time.second(arrayHora[2]);
        return time;
    }

    $("#inpHoraInicioRelojito").change(function () {
        var hora = $(this).val();
        arrayHora = hora.split(":");
        arrayHora.push("00");

        let time;
        time = createObjectMoment(arrayHora);

        var currentTime = moment();
        var timeGuia = moment('12:00 AM', "HH:mm A");
        timeGuia.add(1, "days");
        currentTime.toString();
        timeGuia.toString();

        if(time.isBetween(currentTime, timeGuia)){
            $("#lblTipoDiaRelojito").text("Inicia Hoy");
        }else{
            $("#lblTipoDiaRelojito").text("Inicia Mañana");
        }

        time.add(20, 'minutes');

        $("#inpHoraFinRelojito").val(time.format("HH:mm:ss"));
    });

    $("#btnAceptarRelojito").click(function () {

        if($("#inpHoraInicioRelojito").val() == ""){
            toastr.error("Debe digitar una hora");
            return false;
        }

        var hora = $("#inpHoraInicioRelojito").val();
        arrayHora = hora.split(":");
        arrayHora.push("00");

        let timeI;
        timeI = createObjectMoment(arrayHora);

        let timeF;
        timeF = createObjectMoment(arrayHora);
        
        var currentTime = moment();
        var timeGuia = moment('12:00 AM', "HH:mm A");
        var timeGuia2 = moment('11:40 PM', "HH:mm A");
        timeGuia.add(1, "days");
        currentTime.toString();
        timeGuia.toString();
        timeGuia2.toString();

        if(timeI.isBetween(currentTime, timeGuia)){
            timeF.add(20, 'minutes');
        }else{
            if(!timeI.isBetween(timeGuia2, timeGuia)){
                timeI.add(1, "days");
            }
            timeF.add(1, "days");
            timeF.add(20, 'minutes');
        }

        if(typeof $("#inpIdAnuncioRelojito").val() === "undefined" || $("#inpIdAnuncioRelojito").val() == ""){
            toastr.error("Debe seleccionar un anuncio");
            return false;
        }

        var result = AjaxInsertPromocionAnuncio($("#inpIdAnuncioRelojito").val(), 1, timeI.format("YYYY-MM-DD HH:mm:ss"), timeF.format("YYYY-MM-DD HH:mm:ss"));
        if(result.resultado){
            if(isPremiunPack){
                let timeP1 = moment();
                let timeP2 = moment();
                timeP2.add(30, "days");
                var resultDes = AjaxInsertPromocionAnuncio($("#inpIdAnuncioRelojito").val(), 14, timeP1.format("YYYY-MM-DD HH:mm:ss"), timeP2.format("YYYY-MM-DD HH:mm:ss"));
                if(!resultDes.resultado){
                    toastr.error(resultDes.message);        
                }
            }
            setCreditosSpanFloat();
            AjaxGetRelojitosActuales($("#inpIdAnuncioRelojito").val());
            toastr.success(result.message);
            isPremiunPack = false;
        }else{
            toastr.error(result.message);
        }

    });

    $("#inpHoraInicioPromocion").change(function () {

        if($("#inpDiasPromocion").val() == ""){
            toastr.error("Parametros no definidos");
            return false;
        }

        if($("#inpHorasPromocion").val() == ""){
            toastr.error("Parametros no definidos");
            return false;
        }

        var hora = $(this).val();
        arrayHora = hora.split(":");
        arrayHora.push("00");

        let timeI;
        timeI = createObjectMoment(arrayHora);

        let timeF;
        timeF = createObjectMoment(arrayHora);
        
        var currentTime = moment();
        var timeGuia = moment('12:00 AM', "HH:mm A");
        var timeGuia2 = moment().hours(24).minutes(1).seconds(0);
        timeGuia2.subtract($("#inpHorasPromocion").val(), 'hours');
        timeGuia.add(1, "days");
        currentTime.toString();
        timeGuia.toString();
        timeGuia2.toString();

        var horaGuia = moment().hours(arrayHora[0]).minutes(arrayHora[1]);
        horaGuia.add($("#inpHorasPromocion").val(), 'hours');

        if(timeI.isBetween(currentTime, timeGuia)){
            timeF.add($("#inpDiasPromocion").val(), 'days');
            timeF.hour(horaGuia.hour());
        }else{
           /* console.log(timeGuia2)
            if(timeI.isBetween(timeGuia2, timeGuia)){*/
                timeI.add(1, "days");
           // }
            timeF.add($("#inpDiasPromocion").val(), 'days');
            timeF.hour(horaGuia.hour());
            timeF.add(1, "days");
        }
        
        $("#lblFechasPromocion").text(timeI.format("DD/MM/YYYY") + " - " + timeF.format("DD/MM/YYYY"));
        $("#lblHorasPromocion").text(timeI.format("hh:mm A") + " - " + timeF.format("hh:mm A"));

        $("#inpFecha1Promocion").val(timeI.format("YYYY-MM-DD HH:mm:ss"));
        $("#inpFecha2Promocion").val(timeF.format("YYYY-MM-DD HH:mm:ss"));
    });

     $("#btnAceptarPromocion").click(function () {

        if($("#inpHoraInicioPromocion").val() == ""){
            toastr.error("Debe digitar una hora");
            return false;
        }

        if($("#inpFecha1Promocion").val() == ""){
            toastr.error("Fechas no calculadas");
            return false;
        }

        if($("#inpFecha2Promocion").val() == ""){
            toastr.error("Fechas no calculadas");
            return false;
        }

        if(typeof $("#inpIdOpcionPromocion").val() === "undefined" || $("#inpIdOpcionPromocion").val() == ""){
            toastr.error("Debe seleccionar un paquete");
            return false;
        }

        if(typeof $("#inpIdAnuncioPromocion").val() === "undefined" || $("#inpIdAnuncioPromocion").val() == ""){
            toastr.error("Debe seleccionar un anuncio");
            return false;
        }

        var result = AjaxInsertPromocionAnuncio($("#inpIdAnuncioPromocion").val(), $("#inpIdOpcionPromocion").val(), $("#inpFecha1Promocion").val(), $("#inpFecha2Promocion").val());
        if(result.resultado){
            if(isPlatinoPack){
                let timeP1 = moment();
                let timeP2 = moment();
                timeP2.add(30, "days");
                var resultDes = AjaxInsertPromocionAnuncio($("#inpIdAnuncioPromocion").val(), 15, timeP1.format("YYYY-MM-DD HH:mm:ss"), timeP2.format("YYYY-MM-DD HH:mm:ss"));
                if(!resultDes.resultado){
                    toastr.error(resultDes.message);        
                }
            }
            setCreditosSpanFloat();
            AjaxGetDiffPromocionesDestacar($("#inpIdAnuncioPromocion").val(), "14");
            AjaxGetDiffPromocionesDestacar($("#inpIdAnuncioPromocion").val(), "15");
            $("#modalHoraPromocion").modal("hide");
            $("#inpIdOpcionPromocion").val("");
            $("#inpFecha1Promocion").val("");
            $("#inpFecha2Promocion").val("");
            $("#inpHoraInicioPromocion").val("");
            $("#lblFechasPromocion").text("-");
            $("#lblHorasPromocion").text("-");
            toastr.success(result.message);
            isPlatinoPack = false;
        }else{
            toastr.error(result.message);
        }

    });

    $('body').on('click', '.navPromoREDias', function () {
        if($(this).data("load") == false){
            let data = AjaxGetPromocionesByIdPaqueteAndDia(2, $(this).data("dias"));    

            let container = "divContainerPaquetes"+$(this).data("dias")+"Dias";

            $("#"+container).html("");
            $.each(data, function( index, value ) {
                $("#"+container).append('<hr class="margin_top_small margin_bottom_10px"><div class="row"><div class="col-8"><label class="textCenter fontFamilyRoboto fontSize14px width100porciento margin0">'+value.horas+' Horas al día</label><p class="textCenter margin0 fontFamilyRoboto fontSize13px colorGrisClaro">'+value.descripcion+'</p></div><div class="col-4 centradoVertical"><button class="btnOpcionPromocion btn borderRadius0px backgroundPinkClaro hoverBackgroundPinkOscuro colorWhite width100porciento fontFamilyRoboto fontSize14px fontWeight600 hoverColorWhite" data-id="'+value.id+'" data-horas="'+value.horas+'" data-dias="'+value.dias+'">'+value.valor+' Créditos</button></div></div>');
            });

            $(this).data("load", true);
        }
    });

    $('body').on('click', '.btnEstadisticas', function () {
        $("#inpIdAnuncioEstadisticas").val($(this).data("id"));
        $("#ldlTitleEstadisticas").text("Estadisticas del anuncio ID " + $(this).data("id"));
        // ----------------
        AjaxDatosGraficosGenerales($(this).data("id"), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
        AjaxDatosGraficosTiposVistas($(this).data("id"), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
        AjaxDatosGeneralesEstadistica($(this).data("id"));
        AjaxDatosGraficosVistasPorHora($(this).data("id"));
        // ----------------
        AjaxDatosGraficosInversionByFecha($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Inversion").val(), $("#inpFecha2Inversion").val());
        AjaxDatosGraficosInversionTotalByTipo($("#inpIdAnuncioEstadisticas").val());
        AjaxDatosTablaHistoricoCompras($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Inversion").val(), $("#inpFecha2Inversion").val());
        // ----------------
        AjaxDatosFechasByAnuncio($(this).data("id"));
        AjaxDatosConsolidadoPromocionesByAnuncio($(this).data("id"));
        $("#modalEstadisticas").modal("show");
    });

    $("#inpCargarEstadistica").click(function () {
        AjaxDatosGraficosGenerales($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
        AjaxDatosGraficosTiposVistas($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Estadistica").val(), $("#inpFecha2Estadistica").val());
    });

    $("#inpCargarInversion").click(function () {
        AjaxDatosGraficosInversionByFecha($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Inversion").val(), $("#inpFecha2Inversion").val());
        AjaxDatosGraficosInversionTotalByTipo($("#inpIdAnuncioEstadisticas").val());
        AjaxDatosTablaHistoricoCompras($("#inpIdAnuncioEstadisticas").val(), $("#inpFecha1Inversion").val(), $("#inpFecha2Inversion").val());
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
        $("#lblEstadisticaCreacion").text("Fecha de creación: - ");
        $("#lblEstadisticaUltimaEdicion").text("Última edición: - ");
        $.ajax({
            url: '../c_general/getFechasAnuncioById',
            type: 'POST',
            dataType: "json",
            data: { idAnuncio: id },
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data[0];
                    $("#lblEstadisticaCreacion").html("Fecha de creación: <b>" + data.fechaCreacionFormat + "</b>");
                    $("#lblEstadisticaUltimaEdicion").html("Última edición: <b>" + data.fechaUltEdicionFormat + "</b>");
                }
            }
        });
    }

    function AjaxDatosConsolidadoPromocionesByAnuncio(id) {
        $.ajax({
            url: '../c_general/getConsolidadoPromocionesByAnuncio',
            type: 'POST',
            dataType: "json",
            data: { id: id },
            success: function (data) {
                if (data.resultado == true) {
                    $.each(data.data, function (key, value) {
                        if(value.tipo == "TOP"){
                            $("#lblNumTop").html("<b>" + value.total + "</b>");        
                        }else if(value.tipo == "PREMIUM"){
                            $("#lblNumPremium").html("<b>" + value.total + "</b>");        
                        }else if(value.tipo == "PLATINO"){
                            $("#lblNumPlatino").html("<b>" + value.total + "</b>");        
                        }
                    });
                }
            }
        });
    }

    function AjaxDatosGeneralesEstadistica(id) {
        $("#lblVistasHoy").text("0");
        $("#lblWhatsAppHoy").text("0");
        $("#lblCallsHoy").text("0");
        $("#lblVistasTotal").text("0");
        $("#lblWhatsAppTotal").text("0");
        $("#lblCallsTotal").text("0");
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

    function AjaxDatosGraficosVistasPorHora(idAnuncio) {
        if (typeof myChartVistasHoras !== "undefined") {
            myChartVistasHoras.destroy();
        }
        $.ajax({
            url: '../c_general/getGraficaVistasPorHoras',
            type: 'POST',
            dataType: "json",
            data: {idAnuncio: idAnuncio},
            success: function (data) {
                if (data.resultado == true) {
                    let horas = [];
                    let vistas = [];
                    $.each(data.data, function( index, value ) {
                        horas.push(value.rango);
                        vistas.push(parseInt(value.vistas));
                    });
                    createChartVistasHoras(horas, vistas);
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

    function AjaxDatosGraficosTiposVistas(id, fecha1, fecha2) {
        if (typeof myChartTiposVistas !== "undefined") {
            myChartTiposVistas.destroy();
        }
        $.ajax({
            url: '../c_general/getAuditoriaGraficoTipoVistaByAnuncioAndFecha',
            type: 'POST',
            dataType: "json",
            data: { id: id, fecha1: fecha1, fecha2: fecha2 },
            success: function (data) {
                if (data.resultado == true) {
                    data = data.data;
                    var dias = [];
                    var objVistasPC = [];
                    var objVistasMovil = [];
                    $.each(data, function (key, value) {
                        dias.push(value.dia);
                        objVistasPC.push(value.vistas_pc);
                        objVistasMovil.push(value.vistas_movil);
                    });

                    var objsVPC = createObjChart("Vistas PC", { "border": '#ff9800', "background": '#ffa726' }, objVistasPC);

                    var objsVMV = createObjChart("Vistas Movil", { "border": '#039be5', "background": '#03a9f4' }, objVistasMovil);

                    createChartTiposVistas(dias, objsVPC, objsVMV);
                }
            }
        });
    }

    function AjaxDatosGraficosInversionByFecha(id, fecha1, fecha2) {
        if (typeof myChartInversionFecha !== "undefined") {
            myChartInversionFecha.destroy();
        }
        $.ajax({
            url: '../c_general/getGraficoInversionByAnuncioAndFecha',
            type: 'POST',
            dataType: "json",
            data: { id: id, fecha1: fecha1, fecha2: fecha2 },
            success: function (data) {
                if (data.resultado == true) {
                    let dias = [];
                    let valor = [];
                    $.each(data.data, function( index, value ) {
                        dias.push(value.fecha);
                        valor.push(parseInt(value.valor));
                    });

                    var objsVal = [createObjChart("Creditos", { "border": '#039be5', "background": '#03a9f4' }, valor)];

                    createChartInversionTotalByFecha(dias, objsVal);
                }
            }
        });
    }

    function AjaxDatosGraficosInversionTotalByTipo(id) {
        if (typeof myChartInversionTotalByTipo !== "undefined") {
            myChartInversionTotalByTipo.destroy();
        }
        $.ajax({
            url: '../c_general/getGraficoInversionTotalTipoByAnuncioAndFecha',
            type: 'POST',
            dataType: "json",
            data: { id: id },
            success: function (data) {
                if (data.resultado == true) {
                    let tipo = [];
                    let valor = [];
                    $.each(data.data, function( index, value ) {
                        tipo.push(value.tipo);
                        valor.push(parseInt(value.valor));
                    });

                    createChartInversionTotalByTipo(tipo, valor);
                }
            }
        });
    }

    function AjaxDatosTablaHistoricoCompras(id, fecha1, fecha2) {
        $.ajax({
            url: '../c_general/getHistoricoComprasByAnuncioAndFecha',
            type: 'POST',
            dataType: "json",
            data: { id: id, fecha1: fecha1, fecha2: fecha2},
            success: function (data) {
                if (data.resultado == true) {
                    createCabezeraTablaHistorico();
                    $.each(data.data, function( index, value ) {
                        createRegistroTablaHistorico(value.tipo, value.inicio, value.fin, value.estado, value.fecha_compra, value.valor);
                    });
                }
            }
        });
    }

    function createChartTiposVistas(dias, dataPC, dataMOVIL) {
        var ctx = document.getElementById("myChartTiposVistas").getContext('2d');
        myChartTiposVistas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dias,
                datasets: [dataPC, dataMOVIL]
            },
            options: {
                plugins: {
                    labels: {
                        render: function (args) {
                            return (args.value>0)?args.value:"";
                        }
                    }
                },
                responsive: true,
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Visitas por plataforma',
                    fontSize: 13,
                },
                tooltips: {
                    mode: "index",
                    intersect: true,
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return 'Dia: ' + tooltipItems[0].xLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        }
                    }]
                }
            }
        });
    }

    function createChartV(dias, data) {
        var ctx = document.getElementById("myChartVistas").getContext('2d');
        myChartV = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                plugins: {
                    labels: {
                        render: function (args) {
                            return (args.value>0)?args.value:"";
                        }
                    }
                },
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Total vistas al anuncio',
                    fontSize: 13,
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return 'Dia: ' + tooltipItems[0].xLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        }
                    }]
                }
            }
        });
    }

    function createChartW(dias, data) {
        var ctx = document.getElementById("myChartWhat").getContext('2d');
        myChartW = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                plugins: {
                    labels: {
                        render: function (args) {
                            return (args.value>0)?args.value:"";
                        }
                    }
                },
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'WhatsApp enviados',
                    fontSize: 13,
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return 'Dia: ' + tooltipItems[0].xLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        }
                    }]
                }
            }
        });
    }

    function createChartC(dias, data) {
        var ctx = document.getElementById("myChartCall").getContext('2d');
        myChartC = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                plugins: {
                    labels: {
                        render: function (args) {
                            return (args.value>0)?args.value:"";
                        }
                    }
                },
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Llamadas realizadas',
                    fontSize: 13,
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return 'Dia: ' + tooltipItems[0].xLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        }
                    }]
                }
            }
        });
    }

    function createChartInversionTotalByFecha(dias, data) {
        var ctx = document.getElementById("myChartInversionFecha").getContext('2d');
        myChartInversionFecha = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dias,
                datasets: data
            },
            options: {
                plugins: {
                    labels: {
                        render: function (args) {
                            return (args.value>0)?args.value:"";
                        }
                    }
                },
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Inversion por fecha',
                    fontSize: 13,
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return 'Dia: ' + tooltipItems[0].xLabel;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        }
                    }]
                }
            }
        });
    }

    function createChartVistasHoras(horas, data){
        var barChartData = {
            labels: horas,
            datasets: [{
                label: 'Visitas',
                backgroundColor: "#FF9DB2",
                borderColor: "#FF7391",
                borderWidth: 1,
                data: data
            }]
        };

        var ctx = document.getElementById('myChartVistasPorHoras').getContext('2d');
        myChartVistasHoras = new Chart(ctx, {
            type: 'horizontalBar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Visitas al anuncio por horas',
                    fontSize: 15,
                }
            }
        });
    }

    function createChartInversionTotalByTipo(tipos, data){
        var ctx = document.getElementById('myChartInversionTotalByTipo').getContext('2d');
        myChartInversionTotalByTipo = new Chart(ctx,  {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: [
                        "#4BC0C0", "#FFCC52", "#FF6384"
                    ],
                    label: 'Tipos Paquetes'
                }],
                labels: tipos
            },
            options: {
                plugins: {
                    labels: {
                        render: 'percentage',
                        fontStyle: 'bold',
                        fontColor: 'white',
                    }
                },
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Total inversion por tipo'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    function createRegistroTablaHistorico(tipo, inicio, fin, estado, compra, valor){
        $("#divTablaHistorico").append('<div class="row textCenter borderSupAndInfGray fontSize12px marginTop5Movil"><div class="col-12 col-sm-4 col-md-1"><label class="margin0 marginTop2Movil d-block d-md-none"><small>Tipo:</small></label><label class="margin0 paddingSuperiorInferior7px paddingSubAndInf2pxMovil">'+tipo+'</label></div><div class="col-6 col-sm-4 col-md-3"><label class="margin0 d-block d-md-none"><small>Inicio:</small></label><label class="margin0 paddingSuperiorInferior7px paddingTop2pxMovil">'+inicio+'</label></div><div class="col-6 col-sm-4 col-md-3"><label class="margin0 d-block d-md-none"><small>Final:</small></label><label class="margin0 paddingSuperiorInferior7px paddingTop2pxMovil">'+fin+'</label></div><div class="col-3 col-sm-4 col-md-1"><label class="margin0 d-block d-md-none"><small>Estado:</small></label><label class="margin0 paddingSuperiorInferior7px paddingTop2pxMovil">'+estado+'</label></div><div class="col-6 col-sm-4 col-md-3"><label class="margin0 d-block d-md-none"><small>Compra:</small></label><label class="margin0 paddingSuperiorInferior7px paddingTop2pxMovil">'+compra+'</label></div><div class="col-3 col-sm-4 col-md-1"><label class="margin0 d-block d-md-none"><small>Valor:</small></label><label class="margin0 paddingSuperiorInferior7px paddingTop2pxMovil">'+valor+'</label></div></div>');
    }

    function createCabezeraTablaHistorico(){
        $("#divTablaHistorico").html('<div class="row textCenter displayNoneMovil fontSize13px fontWeight600 shadow-sm"><div class="col-sm-1"><label class="margin0 paddingSuperiorInferior7px">TIPO</label></div><div class="col-sm-3"><label class="margin0 paddingSuperiorInferior7px">INICIO</label></div><div class="col-sm-3"><label class="margin0 paddingSuperiorInferior7px">FINAL</label></div><div class="col-sm-1"><label class="margin0 paddingSuperiorInferior7px">ESTADO</label></div><div class="col-sm-3"><label class="margin0 paddingSuperiorInferior7px">COMPRA</label></div><div class="col-sm-1"><label class="margin0 paddingSuperiorInferior7px">VALOR</label></div></div>');
    }


    $('.navActivePink').click(function () {
        $(".navActivePink").removeAttr("style");
        $(this).attr("style", "color: white !important");
    });


    function validNewsPass(){
        if($("#inpNewPass").val() != $('#inpReNewPass').val()){
            $('#inpReNewPass').addClass("alertErrorInput");
            $("#lblValidReNewPass").addClass("displayBlock");
            $("#btnAceptarCambiarClave").prop("disabled", true);    
            return false;
        }else{
            $('#inpReNewPass').removeClass("alertErrorInput");
            $("#lblValidReNewPass").removeClass("displayBlock");
            $("#btnAceptarCambiarClave").prop("disabled", false);    
            return true;
        }
    }

    $('#inpActualPass').keyup(function () {
        AjaxValidCurrentPass();
    });

    $('#inpReNewPass').keyup(function () {
        validNewsPass();
    });

    $("#btnAceptarCambiarClave").click(function(){
        if(!AjaxValidCurrentPass()){
            return false;
        }
        if(!validNewsPass()){
            return false;
        }

        AjaxChangePass($("#inpActualPass").val(), $("#inpNewPass").val());
    });


    $(".iconRating").click(function(){
        $(".iconRating").removeClass("colorPink");
        $(this).addClass("colorPink");
        $("#lblTextRating").html($(this).data("text") + " - " + $(this).data("val") + " <i class='fas fa-star'></i>");
    });

    $("#btnAceptarFeedBack").click(function(){
        let text = $(".iconRating.colorPink").data("text");
        let stars = $(".iconRating.colorPink").data("val"); 
        if(typeof text === "undefined" || typeof stars === "undefined"){
            toastr.info("Debe escoger una puntuacion");
            return false;
        }

        AjaxSendFeedBack(text, stars, $("#inpMsjRating").val());
    });

    $("#btnAceptarSoporte").click(function(){
        if($("#inpTipoSoporte").val() == "N/A"){
            toastr.info("Debe escojer un tipo de soporte");
            return false;
        }
        if($("#inpMsjSoporte").val() == ""){
            toastr.info("Debe escribir una descripcion de su problema.");
            return false;
        }

        AjaxSendSupport($("#inpTipoSoporte").val(), $("#inpMsjSoporte").val());
    });



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
        proccessPayment($(this).data("id"));
    });

    function proccessPayment(idCredito) {
        var dataCreditos = AjaxGetDataCreditos(idCredito);
        var nextInvoice = AjaxGetNextInvoice();
        var data = {
            name: "Compra por " + dataCreditos[0]["creditos"] + " Creditos",
            description: "Compra de créditos",
            invoice: nextInvoice,
            currency: "cop",
            amount: dataCreditos[0]["valor"],
            tax_base: "0",
            tax: "0",
            country: "co",
            lang: "es",
            external: "false",
            extra1: dataCreditos[0]["id"],
            extra2: usuXt,
            response: "http://192.190.42.155/c_general/responsePayment"
        }
        executePayment(data);
    }

    function executePayment(data) {
        var handler = ePayco.checkout.configure({
            key: apiKey,
            test: true
        });
        handler.open(data);
    }

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
