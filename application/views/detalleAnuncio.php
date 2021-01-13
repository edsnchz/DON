<script type="text/javascript">
var idAnuncio = "<?php echo $id ?>";
</script>

<div class="pageComplete">

    <div class="container-fluid margin_top_small">
        <div class="row">
            <div class="col-md-3 col-sm-6 col-12 mx-auto margin_top_small">
                <input type="text" class="form-control searchStyle" id="inpTextBuscar"
                    placeholder="Palabra clave">
            </div>
            <div class="col-md-3 col-sm-6 col-12 mx-auto margin_top_small">
                <select class="form-control searchStyle" id="inpCategorias">
                    <option value="NaN">Todas las categorías</option>
                </select>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-6 mx-auto margin_top_small">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fa fa-map-marker colorPink fontSize20px"></i></div>
                    </div>
                    <select class="form-control searchStyle" id="inpDepartamentos">
                        <option value="NaN">Todos los departamentos</option>
                    </select>
                </div>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-6 mx-auto margin_top_small">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fa fa-map-marker colorPink fontSize20px"></i></div>
                    </div>
                    <select class="form-control searchStyle" id="inpCiudades">
                        <option value='NaN'>Todas las ciudades</option>
                    </select>
                </div>
            </div>
            <div class="col-md-2 col-sm-12 col-xs-12 margin_top_small">
                <button id="btnBuscar"
                    class="btn btn-secondary borderRadius0px height35px fontSize12px textUppercase fontWeight600 width100porciento"
                    type="button">Buscar / Ir</button>
            </div>
        </div>
    </div>

    <!-- CAROUSEL -->
    <div id="divCarouselPadre" class="owl-carousel owl-theme carousel-tops margin_top_medium">
    </div>

    <!-- CALL TO ACTION CAROUSEL -->
    <div class="alert alert-success divCTACarousel colorWhite pulse borderRadius0px" role="alert">
        <h4 class="alert-heading margin_bottom_5px text-center fontSize16px fontWeight500">SÚBETE AL CARRUSEL</h4>
        <p class="margin0 fontFamilyRoboto fontSize14px fontWeight300">Promociona tu anuncio y se lo primero que vean!
            <br><a href="#" class="btnPanel colorWhite hoverColorWhite fontWeight500"><u>Ir al panel de usuario</u></a>
        </p>
    </div>

    <!-- MAPIADO -->
    <div class="container-fluid">
        <nav aria-label="breadcrumb" style="margin-top: 10pt;">
            <ol class="breadcrumb fontSize12px textUppercase fontWeight600 backgroudNone margin0Movil">
                <li class="breadcrumb-item"><a href="#" id="eMapInicio">Inicio</a></li>
                <li class="breadcrumb-item colorGrisClaro"><a id="eMapDepartamento">Departamento</a></li>
                <li class="breadcrumb-item colorGrisClaro"><a id="eMapCiudad">Ciudad</a></li>
                <li class="breadcrumb-item"><a href="#" id="eMapCategoria">Categoría</a></li>
            </ol>
        </nav>
    </div>

    <!-- DETALLE DEL ANUNCIO -->
    <div class="container margin_top_small">

        <div class="row">
            <div class="col-sm-9">
                <h3 id="labelTitulo"
                    class="text-center margin_top_medium colorGrisOscuro fontSize20px fontFamilyRoboto"></h3>

                <div id="divEtiquetas" class="margin_top_small text-center"></div>

                <hr>

                <h5 id="labelDescripcion"
                    class=" text-justify fontSize15px fontWeight400 margin_top_small fontFamilyRoboto colorGrisOscuro">
                </h5>

                <hr class="margin_top_30px">

                <div>
                    <div class="card-columns cardColumsNum2 margin_top_30px" id="divImagenes">
                    </div>

                    <hr>
                </div>
            </div>
            <div class="col-sm-3">

                <label id="lblFechaCreacion"
                    class="margin0 fontWeight100 fontSize12px fontFamilyRoboto colorGrisMenosOscuro">Fecha
                    creación: </label>

                <label id="lblUltimaEdicion"
                    class="margin0 fontWeight100 margin_top_small fontSize12px fontFamilyRoboto colorGrisMenosOscuro">Última
                    edición:
                </label>

                <div id="divCelulares"></div>

                <!-- <hr class="styleHR margin_top_30px"> -->

                <div id="divCondiciones"></div>

                <div>
                    <button id="btnMensajePrivado" type="button"
                        class="btn btn-outline-success width75porciento margin_top_medium margin_right_small borderRadius0px fontSize14px fontFamilyRoboto"
                        data-toggle="modal" data-target="#modalMensaje"><i class="fas fa-paper-plane"></i> Mensaje
                        Privado</button>

                    <button id="btnDenunciar" type="button" title="Reportar Anuncio"
                        class="btn btn-danger width20porciento margin_top_medium borderRadius0px pull-right fontSize14px"
                        data-toggle="modal" data-target="#modalDenunciar"><i
                            class="fas fa-exclamation-triangle"></i></button>

                    <div
                        class="BackgrounGreenTOP colorWhite text-center margin_top_medium paddingLaterales20px paddingSuperiorInferior20px">
                        <label class="fontSize16px fontFamilyRoboto">Sube tu anuncio<br>a primera
                            posición</label>
                        <button
                            class="width100porciento btn btn-success borderSolid1pxWhite borderRadius0px margin_top_small fontWeight600"
                            id="btnTopFree">TOP GRATIS</button>
                    </div>

                    <!-- <hr class="styleHR margin_top_30px"> -->
                    <div class="borderSolid1pxGray margin_top_30px padding5px borderRadius10pt">
                        <div class="row  borderBottomSolid1pxGray margin_laterales_0px">
                            <div class="col-5 text-center padding0">
                                <h4 class="margin0 colorGrisOscuro textUppercase fontSize12px"> Estadísticas </h4>
                            </div>
                            <div class="col-3 textRight fontFamilyRoboto colorGrisMenosOscuro fontSize14px">
                                <small class="margin0"> Hoy </small>
                            </div>
                            <div class="col-4 textLeft fontFamilyRoboto colorGrisMenosOscuro fontSize14px">
                                <small class="margin0"> Total </small>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <div class="row margin_top_small">
                                <div
                                    class="col-5 centradoVertical fontFamilyRoboto fontSize12px colorGrisMenosOscuro padding0">
                                    <label class="margin_bottom_0px width100porciento text-center">Visitas al
                                        anuncio</label>
                                </div>
                                <div class="col-3 borderRightSolid3pxPink fontSize12px"
                                    title="Visitas de este anuncio el dia de hoy">
                                    <label id="lblVistasHoy"
                                        class="fontBold margin_bottom_0px centradoVertical pull-right">-</label>
                                </div>
                                <div class="col-4 textLeft fontSize12px paddingRight0px"
                                    title="Visitas totales de este anuncio">
                                    <label id="lblVistasTotal"
                                        class="fontBold margin_bottom_0px centradoVertical">-</label>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <div class="row margin_top_masSmall">
                                <div
                                    class="col-5 centradoVertical fontFamilyRoboto fontSize12px colorGrisMenosOscuro padding0">
                                    <label class="margin_bottom_0px width100porciento text-center">Clics
                                        WhatsApp</label>
                                </div>
                                <div class="col-3 borderRightSolid3pxGreen fontSize12px"
                                    title="Clicks en los whatsApp de este anuncio el dia de hoy">
                                    <label id="lblWhatsAppHoy"
                                        class="fontBold margin_bottom_0px centradoVertical pull-right">-</label>
                                </div>
                                <div class="col-4 textLeft fontSize12px paddingRight0px"
                                    title="Clicks totales en los whatsApp de este anuncio">
                                    <label id="lblWhatsAppTotal"
                                        class="fontBold margin_bottom_0px centradoVertical">-</label>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <div class="row margin_top_masSmall">
                                <div
                                    class="col-5 centradoVertical fontFamilyRoboto fontSize12px colorGrisMenosOscuro padding0">
                                    <label class="margin_bottom_0px width100porciento text-center">Clics en
                                        Llamar</label>
                                </div>
                                <div class="col-3 borderRightSolid3pxBlue fontSize12px"
                                    title="Clicks en los teléfonos de este anuncio el dia de hoy">
                                    <label id="lblCallsHoy"
                                        class="fontBold margin_bottom_0px centradoVertical pull-right">-</label>
                                </div>
                                <div class="col-4 textLeft fontSize12px paddingRight0px"
                                    title="Clicks totales en los teléfonos de este anuncio">
                                    <label id="lblCallsTotal"
                                        class="fontBold margin_bottom_0px centradoVertical">-</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>

                <p class="text-center fontSize12px margin0 fontFamilyRoboto colorGrisMenosOscuro">Últimos 7 dias</p>

                <canvas id="myChart" width="400" height="300"></canvas>

                <label class="text-center margin_top_small fontFamilyRoboto fontSize12px colorGrisMenosOscuro">Puedes
                    ver las estadísticas completas de tus anuncios en el panel de usuario.</label>
            </div>
        </div>
    </div>

    <br><br><br>

    <!-- ********************************* -->

    <div class="modal fade" id="modalMensaje" tabindex="-1" role="dialog" aria-labelledby="modalMensaje"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Enviar mensaje</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group fontFamilyRoboto fontSize14px colorGrisOscuro">
                        <label for="inpCorreoMensajePrivado">Tu correo:</label>
                        <input type="email" class="form-control inputStyle" id="inpCorreoMensajePrivado">
                    </div>
                    <div class="form-group fontFamilyRoboto fontSize14px colorGrisOscuro">
                        <label for="inpTextMensajePrivado">Mensaje:</label>
                        <textarea class="form-control inputStyle" id="inpTextMensajePrivado" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnAceptarMensaje" type="button"
                        class="btn btn-success borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Enviar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal fade" id="modalDenunciar" tabindex="-1" role="dialog" aria-labelledby="modalDenunciar"
        aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Reportar anuncio</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group fontFamilyRoboto fontSize14px colorGrisOscuro">
                        <label>Motivo:</label>
                        <div id="divMotivosDenuncia">
                        </div>
                    </div>
                    <div class="form-group fontFamilyRoboto fontSize14px colorGrisOscuro">
                        <label for="inpTextDenunciar">Mensaje:</label>
                        <textarea class="form-control inputStyle" id="inpTextDenunciar" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnAceptarDenuncia" type="button"
                        class="btn btn-danger borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Reportar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal" id="modalTopFree" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Sube tu anuncio gratis</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <h4 id="divAlertMaximoTopFree"
                        class="text-center fontFamilyRoboto padding10px width100porciento btn-success colorWhite margin_bottom_10px displayNone margin_top_small">
                        TOP GRATIS Activo.
                    </h4>

                    <p class="textCenter fontFamilyRoboto fontSize14px colorGrisClaro">Sube tu anuncio a las primeras
                        posiciónes totalmente gratis. Tu anuncio rotará durante
                        15 minutos en los primeros lugares.
                    </p>

                </div>
                <div class="modal-footer centradoHorizontal">
                    <div>
                        <button id="btnAceptarTopFree" type="button"
                            class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo fontSizeBig paddingLaterales35px">Aceptar</button>
                        <button type="button"
                            class="btn btn-default borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo fontSizeBig"
                            data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>