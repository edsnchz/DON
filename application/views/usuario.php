<script type="text/javascript">
var tabDefault = "<?php echo $tab ?>";
var apiKey = "<?php echo $apiKey ?>";
var usuXt = "<?php echo $usuXt ?>";


//CERTIFICADO SSL 
var tlJsHost = ((window.location.protocol == "https:") ? "https://secure.trust-provider.com/" :
    "http://www.trustlogo.com/");
document.write(unescape("%3Cscript src='" + tlJsHost +
    "trustlogo/javascript/trustlogo.js' type='text/javascript'%3E%3C/script%3E"));
//]]>
</script>

<div class="pageComplete2">

    <div class="container-fluid margin_top_small">
        <ul class="nav nav-tabs fontSize12px fontFamilyPoppins letterSpacingMinimo" role="tablist">
            <li class="nav-item">
                <a class="nav-link colorGrisClaro fontWeight600 active" id="tabMisAnuncios" data-toggle="tab"
                    href="#tMisAnuncios" role="tab" aria-controls="tMisAnuncios" aria-selected="true">MIS ANUNCIOS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link colorGrisClaro fontWeight600" data-toggle="tab" id="tabCrearAnuncio"
                    href="#tCrearAnuncio" role="tab" aria-controls="tCrearAnuncio" aria-selected="false">CREAR
                    ANUNCIO</a>
            </li>
            <li class="nav-item">
                <a class="nav-link colorGrisClaro fontWeight600" id="tabMisCreditos" data-toggle="tab" href="#tPremium"
                    role="tab" aria-controls="tPremium" aria-selected="false">COMPRAS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link colorGrisClaro fontWeight600" id="tabMensajes" data-toggle="tab" href="#tMensajes"
                    role="tab" aria-controls="tMensajes" aria-selected="false">MENSAJES</a>
            </li>
            <li class="nav-item">
                <a class="nav-link colorGrisClaro fontWeight600" data-toggle="tab" href="#tOpciones" role="tab"
                    aria-controls="tOpciones" aria-selected="false">OPCIONES</a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="tMisAnuncios" role="tabpanel">
                <div class="container">

                    <div id="divMsjFirstAdd"
                        class="text-center margin_top_40pt marginTop20ptMovil paddingLaterales15porcNoMovil animated zoomIn slowAnimation displayNone">
                        <i class="fas fa-hand-holding-usd margin_bottom_20px colorGold fontSize80px"></i>
                        <h4 class="fontFamilyRoboto fontSize25px margin_bottom_10px fontSize18pxMovil colorGrisOscuro">
                            Reclama tus primeros<span class="colorPink"> $10.000 </span> gratis</h4>
                        <p class="margin_bottom_10px fontSize16px fontSize12pxMovil fontFamilyRoboto colorGrisClaro">
                            Publica ya! tu
                            primer anuncio y doneróticos te obsequia $10.000 en saldo para que lo promociones y subas al
                            primer lugar. Tu saldo nunca se vence y lo puedes usar cuando quieras.</p>

                        <button id="btnCallToActionCrearAnuncio" type="button"
                            class="btn colorWhite hoverColorWhite borderNone borderRadius0px outlineNone margin_top_small backgroundPink hoverBackgroundPinkOscuro textUppercase fontSize12px fontWeight600 paddingLaterales20px paddingSuperiorInferior10px">Crear
                            Anuncio</button>
                    </div>

                    <div class="row" id="divMisAnuncios">
                    </div>

                    <br><br>
                </div>
            </div>
            <div class="tab-pane fade" id="tCrearAnuncio" role="tabpanel">

                <div class="centerMargin backgroundGray sombra margin_top_medium width100porcientoMovil"
                    style="width: 800px; padding: 20px">
                    <div class="fontFamilyRoboto">
                        <p class="letterSpacingMinimo  
                        colorGrisOscuro fontSize14px margin_bottom_5px">1. Rellena los datos de tu anuncio</p>
                        <p class="colorGrisClaro fontSize14px">Según la categoría tendrás la opción de elegir hasta 6
                            etiquetas</p>

                    </div>
                    <div class="row margin_top_medium">
                        <div class="col-sm-4 margin_top_small">
                            <select class="form-control inputStyle" id="inpCategorias">
                                <option value="N/A">Categoría</option>
                            </select>
                        </div>
                        <div class="col-sm-4 margin_top_small">
                            <select class="form-control inputStyle" id="inpDepartamentos">
                                <option value="N/A">Departamento</option>
                            </select>
                        </div>
                        <div class="col-sm-4 margin_top_small">
                            <select class="form-control inputStyle" id="inpCiudades">
                                <option value="N/A">Ciudad</option>
                            </select>
                        </div>
                    </div>
                    <!-- **** -->

                    <div class="row margin_top_small">
                        <div class="col-sm-12">
                            <input type="text" class="form-control inputStyle" name="inpTitulo" id="inpTitulo"
                                placeholder="Titulo">
                        </div>
                    </div>
                    <div class="row margin_top_small">
                        <div class="col-sm-12 height100porciento">
                            <div id="inpDescripcion" class="backgroudWhite" style="min-height: 120px; cursor: text;">
                            </div>
                            <div id="counterCrear" class="fontFamilyRoboto counterEditorTexto"></div>
                        </div>
                    </div>
                    <!-- **** -->
                    <div class="margin_top_small" id="tagCloud">
                    </div>
                    <!-- **** -->
                    <div id="divRowsOptionsServicios">
                        <div class="row margin_top_small">
                            <div class="col-sm-11">
                                <div class="fontFamilyRoboto">
                                    <br>
                                    <p class="letterSpacingMinimo colorGrisOscuro fontSize14px margin_bottom_5px">
                                        2. Define las tarifas y condiciones del servicio</p>
                                    <p class="colorGrisClaro margin_bottom_0px fontSize14px">Puedes agregar las
                                        combinaciones que creas necesarias</p>

                                </div>
                            </div>
                            <div class="col-sm-1 centradoVertical">
                                <button type="button" id="btnAddRowOptionService"
                                    class="borderNone backgroudNone colorBlue hoverGrisClaro outlineNone"><i
                                        class="far fa-plus-square fontSize25px"></i></button>
                            </div>
                        </div>
                        <!-- ***** -->
                        <div class="row margin_top_medium rowOptionService">
                            <div class="col-6 col-sm-3 margin_top_small paddingRight5pxMovil">
                                <input type="text" id="inpPrecio1" class="form-control inputStyle inpPrecio"
                                    name="inpPrecio" placeholder="Valor" data-type="currency"
                                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$">
                            </div>
                            <div class="col-6 col-sm-4 margin_top_small paddingLeft5pxMovil">
                                <select id="inpTiempo1" class="form-control inputStyle inpTiempo">
                                    <option value="N/A">Tiempo</option>
                                </select>
                            </div>
                            <div class="col-6 col-sm-4 margin_top_small paddingRight5pxMovil">
                                <select id="inpRelaciones1" class="form-control inputStyle inpRelaciones">
                                    <option value="N/A">Relaciones</option>
                                </select>
                            </div>
                            <div class="col-6 col-sm-1 centradoVertical margin_top_small paddingLeft5pxMovil">
                                <button type="button"
                                    class="borderNone backgroudNone colorGrisMasClaro btnDeleteRowOptionService outlineNone width100porciento displayFlexCenterMovil"
                                    disabled><span
                                        class="d-block d-sm-none fontSize13px margin_right_small fontFamilyRoboto fontBold">Eliminar:</span><i
                                        class="far fa-minus-square fontSize25px"></i></button>
                            </div>
                        </div>
                    </div>
                    <!-- **** -->
                    <div class="fontFamilyRoboto margin_top_30px">
                        <p class="letterSpacingMinimo
                        colorGrisOscuro fontSize14px margin_bottom_5px">3. Escoge número y forma de contacto para este
                            anuncio</p>
                        <p class="colorGrisClaro fontSize14px">También recibirás mensajes privados en tu bandeja de
                            entrada</p>
                    </div>
                    <div id="divTelefonos" class="row margin_top_medium">
                        <!-- CARDS -->
                    </div>
                    <br><br>
                    <div class="fontFamilyRoboto">
                        <p class="letterSpacingMinimo  
                        colorGrisOscuro fontSize14px margin_bottom_5px">4. Agrega tus fotos <i>(Maximo 20 fotos por
                                anuncio)</i></p>
                        <p class="colorGrisClaro fontSize14px">En "Mi Galería" encontrarás todas las fotos que hayas
                            subido antes.</p>

                    </div>
                    <div class="row margin_top_medium">
                        <div class="col-sm-12">

                            <div class="containerUpload">
                                <input type="file" id="pro-image" name="pro-image[]" style="display: none;"
                                    class="form-control" multiple>

                                <div class="row">
                                    <div class="col-sm-8 paddingRight0px paddingLaterales15pxMovil">
                                        <button
                                            class="btn btn-primary floatRight fontFamilyRoboto fontSize14px borderRadius0px width100porciento height100porciento"
                                            onclick="$('#pro-image').click()">Seleccionar Imagenes</button>
                                    </div>
                                    <div class="col-sm-4 paddingLeft0px paddingLaterales15pxMovil">
                                        <button
                                            class="btn btn-primary floatRight fontFamilyRoboto fontSize14px borderRadius0px width100porciento colorBlue backgroudWhite borderSolid2pxBlue"
                                            id="btnMiGaleria" data-toggle="modal" data-target="#modalMiGaleria">Mi
                                            Galeria</button>
                                    </div>
                                </div>

                                <div class="preview-images-zone">
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="centradoVertical margin_top_small ">
                        <label class="text-justify">
                            <input id="inpAceptTerms" type="checkbox" name="inpAceptTerms" class="checkboxSimple"> <span
                                class="label-text fontFamilyRoboto fontSize13px colorGrisClaro">
                                Soy mayor de edad. Acepto la política de privacidad y condiciones de uso de
                                <strong>doneroticos.com</strong>.
                        </label>
                    </div>
                    <!-- <div class="form-group centradoVertical margin_top_small">
                    <input id="inpAceptTerms" type="checkbox" name="inpAceptTerms" class=" margin_left_small">
                    <label for="inpAceptTerms" class="fontFamilyRoboto fontSize12px colorGrisClaro margin_left_10px text-justify">
                   
                    </label>
                </div> -->

                    <button id="btnGuardar" type="button"
                        class="btn colorWhite hoverColorWhite borderNone borderRadius0px outlineNone margin_top_small backgroundPink hoverBackgroundPinkOscuro textUppercase fontSize12px fontWeight600 paddingLaterales20px paddingSuperiorInferior10px">Publicar
                        anuncio</button>
                </div>

                <br><br>

            </div>
            <div class="tab-pane fade" id="tPremium" role="tabpanel">

                <span
                    class="spCreditos2 d-none d-sm-block badge badge-pill borderRadius0px badge-warning fontSize14px fontWeight500 padding7px fontFamilyRoboto"
                    title="Tu saldo actual" style="position: absolute; right: 50px"></span>

                <h4
                    class="spCreditos2 d-block d-sm-none textCenter margin_top_medium badge-warning width100porciento padding7px fontSize14px fontWeight500 fontFamilyRoboto">
                    Tu Saldo: -</h4>

                <p class="fontSize18px colorGrisOscuro textCenter margin_top_medium fontFamilyRoboto">Recarga tu cuenta
                </p>
                <p class="textCenter fontFamilyRoboto colorGrisClaro fontSize14px">
                    Valores netos a pagar. Ningún método de pago genera comisiones adicionales.
                    <br>
                    Tu saldo estará disponible una vez aprobada y verificada la transacción por el sistema.
                </p>
                <div class="row margin_top_small paddingLaterales15pxMovil width100porcientoMovil width75porciento marginauto"
                    id="divPrecios">
                </div>
                <div class="col-xl-12 mx-auto padding0 textCenter margin_top_30px">
                    <img class="img-responsive width100porcientoMovil" src="<?= load_img_url('images/pagos.png'); ?>"
                        style="width: 40%; height: auto" alt="LOGO PASARELA PAGOS">
                    <br>

                    <div class="width100porciento centradoVerticalHorizontal">
                        <div>
                            <script language="JavaScript" type="text/javascript">
                            TrustLogo("https://doneroticos.com/images/positivessl_trust_seal_md_167x42.png", "CL1",
                                "none");
                            </script>
                            <a href="https://www.instantssl.com/" id="comodoTL">Essential SSL</a>
                        </div>
                    </div>

                    <br><br>
                </div>

            </div>
            <div class="tab-pane fade" id="tMensajes" role="tabpanel">

                <div style="height: 69vh;">

                    <span id="btnArrowMensajes" class="arrowSlideMessages sombraPequeña displayNone">
                        <i class="fas fa-arrow-left"></i>
                    </span>

                    <div class="row height100porciento backgroundGray">
                        <div id="divColRemitentes" class="col-sm-4 backgroundGray scrollVisible height100porciento">
                            <div class="row" id="divRemitentes">
                            </div>
                        </div>
                        <div id="divMensajes"
                            class="col-sm-8 backgroundGrayFondo scrollVisible height100porciento displayNoneMovil paddingSuperiorInferior10px">
                        </div>
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="tOpciones" role="tabpanel">

                <div class="height69vhNoMovil padding10px">

                    <div class="row height100porciento">
                        <div class="col-12 col-sm-4 col-md-3 height100porciento">
                            <div class="nav flex-column nav-pills height100porciento borderRightSolid1pxGrayClaro borderLeftandBottomSolid1pxGrisClaroMovil"
                                role="tablist" aria-orientation="vertical">

                                <a class="text-left textDecorationNone colorGrisOscuro navActiveGray active"
                                    style="color: white !important" id="opcUsuarioCambioPass-tab" data-toggle="pill"
                                    href="#opcUsuarioCambioPass" role="tab" aria-selected="true"><span
                                        class="fontSize13px textUppercase fontWeight600 colorGrisOscuro">Cambiar
                                        contraseña</span><span class="float-right fontSize16px"><i
                                            class="fas fa-key colorGrisOscuro"></i></span></a>

                                <a class="text-left textDecorationNone colorGrisOscuro navActiveGray"
                                    id="opcUsuarioFeedBack-tab" data-toggle="pill" href="#opcUsuarioFeedBack" role="tab"
                                    aria-selected="false">
                                    <span class="textUppercase fontWeight600 fontSize13px colorGrisOscuro">Danos tu
                                        opinión</span><span class="float-right fontSize16px"><i
                                            class="fas fa-star colorGrisOscuro"></i></span></a>

                                <a class="text-left textDecorationNone colorGrisOscuro navActiveGray"
                                    id="opcUsuarioSoporte-tab" data-toggle="pill" href="#opcUsuarioSoporte" role="tab"
                                    aria-selected="false"><span
                                        class="fontSize13px textUppercase fontWeight600 colorGrisOscuro">Soporte
                                        / Ayuda</span><span class="float-right fontSize16px"><i
                                            class="far fa-life-ring colorGrisOscuro"></i></span></a>

                            </div>
                        </div>
                        <div class="col-12 col-sm-8 col-md-9 height100porciento">
                            <div class="tab-content">

                                <div class="tab-pane fade show active" id="opcUsuarioCambioPass" role="tabpanel">

                                    <div class="row">

                                        <div class="col-md-6 offset-md-3 padding30px">

                                            <div class="card margin_top_medium borderRadius0px shadow">
                                                <h5 class="card-header fontFamilyRoboto">Cambiar clave de acceso</h5>
                                                <div class="card-body">

                                                    <div class="form-group row margin_bottom_7px">
                                                        <label for="inpActualPass"
                                                            class="col-sm-12 col-md-6 col-form-label fontSize13px fontFamilyRoboto">Contraseña
                                                            Actual:</label>
                                                        <div class="col-sm-12 col-md-6">
                                                            <input type="text" class="form-control inputStyle"
                                                                id="inpActualPass">
                                                            <div id="lblValidCurrentPass"
                                                                class="invalid-feedback fontFamilyRoboto">
                                                                Clave incorrecta <i class="fa fa-times"></i>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row margin_bottom_7px">
                                                        <label for="inpNewPass"
                                                            class="col-sm-12 col-md-6 col-form-label fontSize13px fontFamilyRoboto">Nueva
                                                            Contraseña:</label>
                                                        <div class="col-sm-12 col-md-6">
                                                            <input type="text" class="form-control inputStyle"
                                                                id="inpNewPass">
                                                        </div>
                                                    </div>

                                                    <div class="form-group row margin_bottom_7px">
                                                        <label for="inpReNewPass"
                                                            class="col-sm-12 col-md-6 col-form-label fontSize13px fontFamilyRoboto">Confirmar
                                                            Contraseña:</label>
                                                        <div class="col-sm-12 col-md-6">
                                                            <input type="text" class="form-control inputStyle"
                                                                id="inpReNewPass">
                                                            <div id="lblValidReNewPass"
                                                                class="invalid-feedback fontFamilyRoboto">
                                                                Las claves no coinciden <i class="fa fa-times"></i>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button id="btnAceptarCambiarClave" type="button"
                                                        class="btn colorWhite hoverColorWhite borderNone borderRadius0px outlineNone margin_top_small backgroundPink hoverBackgroundPinkOscuro textUppercase fontSize12px fontWeight600 paddingLaterales20px paddingSuperiorInferior10px">Aceptar</button>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div class="tab-pane fade" id="opcUsuarioFeedBack" role="tabpanel">


                                    <div
                                        class="container-fluid paddingLaterales90px paddingLaterales35pxMovil text-center">

                                        <div class="row margin_top_small">
                                            <div class="col-2 offset-1">
                                                <div
                                                    class="fontSize70px fontSize30pxMovil colorGrisMasClaro width100porciento textCenter cursorPointer">
                                                    <i data-text="Muy mal <i class='fas fa-star'></i>" data-val="1"
                                                        class="iconRating far fa-dizzy hoverColorPink"></i>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div
                                                    class="fontSize70px fontSize30pxMovil colorGrisMasClaro width100porciento textCenter cursorPointer">
                                                    <i data-text="No me gusta <i class='fas fa-star'></i><i class='fas fa-star'></i>"
                                                        data-val="2" class="iconRating far fa-frown hoverColorPink"></i>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div
                                                    class="fontSize70px fontSize30pxMovil colorGrisMasClaro width100porciento textCenter cursorPointer">
                                                    <i data-text="Regular <i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>"
                                                        data-val="3" class="iconRating far fa-meh hoverColorPink"></i>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div
                                                    class="fontSize70px fontSize30pxMovil colorGrisMasClaro width100porciento textCenter cursorPointer">
                                                    <i data-text="Bueno <i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>"
                                                        data-val="4" class="iconRating far fa-smile hoverColorPink"></i>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div
                                                    class="fontSize70px fontSize30pxMovil colorGrisMasClaro width100porciento textCenter cursorPointer">
                                                    <i data-text="Excelente <i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>"
                                                        data-val="5"
                                                        class="iconRating far fa-grin-stars hoverColorPink"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <p id="lblTextRating"
                                            class="fontFamilyRoboto colorPink textCenter fontBold fontSize16px"></p>

                                        <textarea rows="4" id="inpMsjRating" class="form-control inputStyle shadow-sm"
                                            placeholder="Dinos lo que piensas (opcional)"></textarea>

                                        <button id="btnAceptarFeedBack" type="button"
                                            class="btn colorWhite hoverColorWhite borderNone borderRadius0px outlineNone margin_top_medium backgroundPink hoverBackgroundPinkOscuro textUppercase fontSize12px fontWeight600 paddingLaterales20px paddingSuperiorInferior10px">Enviar</button>

                                    </div>

                                </div>

                                <div class="tab-pane fade" id="opcUsuarioSoporte" role="tabpanel">

                                    <p
                                        class="fontSize18px colorGrisOscuro textCenter margin_top_medium fontFamilyRoboto">
                                        Centro de ayuda</p>
                                    <p class="textCenter fontFamilyRoboto colorGrisClaro fontSize14px">Comunícate con
                                        soporte técnico para resolver los problemas que tengas con el sitio web.
                                    </p>

                                    <div class="container-fluid paddingLaterales90px paddingLaterales35pxMovil">
                                        <div class="row margin_top_small">
                                            <div class="col-12">
                                                <p class="margin_bottom_10px fontFamilyRoboto colorGrisOscuro">Asunto:
                                                </p>
                                                <select id="inpTipoSoporte"
                                                    class="form-control inputStyle colorGrisMenosClaro shadow-sm">
                                                    <option value="N/A">Escoge un tema</option>
                                                </select>
                                            </div>

                                            <div class="col-sm-12 margin_top_small">
                                                <p class="margin_bottom_10px fontFamilyRoboto colorGrisOscuro">Mensaje:
                                                </p>
                                                <textarea rows="4" id="inpMsjSoporte"
                                                    class="form-control inputStyle shadow-sm"
                                                    placeholder="Explica con más detalles tu problema."></textarea>
                                            </div>
                                        </div>

                                        <button id="btnAceptarSoporte" type="button"
                                            class="btn float-right colorWhite hoverColorWhite borderNone borderRadius0px outlineNone margin_top_medium backgroundPink hoverBackgroundPinkOscuro textUppercase fontSize12px fontWeight600 paddingLaterales20px paddingSuperiorInferior10px">Enviar</button>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="modalNumber" tabindex="-1" role="dialog" aria-labelledby="modalNumber"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Verificacion via SMS</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label id="lblNumber" class="textCenter width100porciento">Digite su numero de telefono:</label>
                    <div class="paddingLaterales40pxNoMovil">
                        <input type="number" class="form-control inputStyle textCenter letterSpacingMinimo fontSize16px"
                            id="inpNumber" name="inpNumber">
                        <div class="centradoVertical margin_top_small">
                            <label class="textCenter">
                                <input id="inpAceptTermsNum" type="checkbox" name="inpAceptTermsNum"
                                    class="checkboxSimple">
                                <span class="label-text fontFamilyRoboto fontSize13px colorGrisClaro">Acepto recibir
                                    mensajes SMS</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnGuardarNumero" type="button"
                        class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo">Enviar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal fade" id="modalEliminarNumero" tabindex="-1" role="dialog" aria-labelledby="modalEliminarNumero"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Estás seguro?</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="inpIdEliminar">
                    <h5 id="lblEliminarNumero"
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                    </h5>
                </div>
                <div class="modal-footer">
                    <button id="btnEliminarNumero" type="button"
                        class="btn btn-danger borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Eliminar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal fade" id="modalMiGaleria" tabindex="-1" role="dialog" aria-labelledby="modalMiGaleria"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Mis fotos</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="card-columns margin_top_30px cardColumsNum5 cardColumsNum3Movil" id="divMisFotos">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSelectMiGaleria" type="button"
                        class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Seleccionar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal" id="modalMiGaleriaEditar" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Mis fotos</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="card-columns margin_top_30px cardColumsNum5 cardColumsNum3Movil"
                            id="divMisFotosEditar">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSelectMiGaleriaEditar" type="button"
                        class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo">Seleccionar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal" id="modalEditarAnuncio" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Titulo</h5>
                    <button type="button" id="btnCloseModalEditarAnuncio" class="close outlineNone"
                        data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="inpIdAnuncioEditar">
                    <div class="row">
                        <div class="col-sm-12 fontFamilyRoboto">
                            <div>
                                <p class="letterSpacingMinimo fontSize14px
                        colorGrisOscuro margin_bottom_5px">1. Edita el contenido de tu anuncio</p>
                                <p class="colorGrisClaro fontSize14px">Tambien puedes agregar o editar tus etiquetas.
                                </p>
                            </div>
                            <input type="text" class="form-control inputStyle margin_top_30px" name="inpTituloEditar"
                                id="inpTituloEditar" placeholder="Titulo">
                        </div>
                    </div>
                    <div class="row margin_top_small">
                        <div class="col-sm-12 height100porciento">
                            <div id="inpDescripcionEditar" class="backgroudWhite"
                                style="min-height: 120px; cursor: text;"></div>
                            <div id="counterEditar" class="fontFamilyRoboto counterEditorTexto"></div>
                        </div>
                    </div>
                    <div id="tagCloudEditar" class="margin_top_small"></div>

                    <div class="row margin_top_30px">
                        <div class="col-sm-11 fontFamilyRoboto">
                            <div>
                                <p class="fontSize14px letterSpacingMinimo colorGrisOscuro margin_bottom_5px">
                                    2. Agrega o
                                    edita las tarifas y condiciones.
                                </p>
                                <p class="colorGrisClaro fontSize14px">Puedes agregar las combinaciones que creas
                                    necesarias.</p>
                            </div>
                        </div>
                        <div class="col-sm-1 centradoVertical">
                            <button type="button" id="btnAddRowOptionServiceEditar"
                                class="borderNone backgroudNone colorBlue hoverGrisClaro outlineNone"><i
                                    class="far fa-plus-square fontSize25px"></i></button>
                        </div>
                    </div>
                    <div id="divCondicionesEditar">
                    </div>
                    <div class="row margin_top_30px">
                        <div class="col-sm-11 fontFamilyRoboto">
                            <div>
                                <p class="fontSize14px letterSpacingMinimo colorGrisOscuro margin_bottom_5px">3.
                                    Gestiona
                                    tus números y forma de contacto.
                                </p>
                                <p class="colorGrisClaro fontSize14px">Por el momento no podrás agregar o eliminar
                                    números en este anuncio.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div id="divTelefonosEditar" class="row margin_top_medium">
                        <!-- CARDS -->
                    </div>
                    <div class="row margin_top_medium">
                        <div class="col-sm-12 fontFamilyRoboto">
                            <div>
                                <p
                                    class="fontSize14px letterSpacingMinimo colorGrisOscuro margin_top_medium margin_bottom_5px">
                                    4. Agrega o cambia tus fotos. <i>(Maximo 20 fotos por anuncio)</i>
                                </p>
                                <p class="colorGrisClaro fontSize14px">En "Mi Galería" encontrarás todas las fotos que
                                    hayas subido antes.</p>
                            </div>

                            <div class="containerUpload">
                                <input type="file" id="pro-imageEditar" name="pro-imageEditar[]" style="display: none;"
                                    class="form-control" multiple>

                                <div class="row">
                                    <div class="col-sm-8 paddingRight0px paddingLaterales15pxMovil">
                                        <button
                                            class="btn btn-primary floatRight fontFamilyRoboto fontSize14px borderRadius0px width100porciento height100porciento"
                                            onclick="$('#pro-imageEditar').click()">Seleccionar Imagenes</button>
                                    </div>
                                    <div class="col-sm-4 paddingLeft0px paddingLaterales15pxMovil">
                                        <button
                                            class="btn btn-primary floatRight fontFamilyRoboto fontSize14px borderRadius0px width100porciento colorBlue backgroudWhite borderSolid2pxBlue"
                                            id="btnMiGaleriaEditar">Mi
                                            Galeria</button>
                                    </div>
                                </div>

                                <div class="preview-images-zone-editar">
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnAceptarEdicion" type="button"
                        class="btn colorWhite hoverColorWhite backgroundPink hoverBackgroundPinkOscuro borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo paddingSuperiorInferior10px paddingLaterales20px">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal" id="modalEliminarAnuncio" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Seguro?</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="inpIdEliminarAnuncio">
                    <h5 class="textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">Desea
                        eliminar este anuncio?</h5>
                </div>
                <div class="modal-footer">
                    <button id="btnAceptarEliminarAnuncio" type="button"
                        class="btn btn-danger borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal" id="modalEstadisticas" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5 id="ldlTitleEstadisticas"
                        class="modal-title textCenter fontSize16px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto width100porciento">
                        Estadísticas del anuncio</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="inpIdAnuncioEstadisticas">

                    <nav>
                        <div class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link textUppercase colorGrisClaro fontWeight600 fontSize12px letterSpacingMinimo active"
                                data-toggle="tab" href="#tabGraficasGeneral" role="tab"
                                aria-controls="tabGraficasGeneral" aria-selected="true">Datos Generales</a>
                            <a class="nav-item nav-link textUppercase colorGrisClaro fontWeight600 fontSize12px letterSpacingMinimo"
                                data-toggle="tab" href="#tabGraficasFechas" role="tab" aria-controls="tabGraficasFechas"
                                aria-selected="false">Datos por fechas</a>
                            <a class="nav-item nav-link textUppercase colorGrisClaro fontWeight600 fontSize12px letterSpacingMinimo"
                                data-toggle="tab" href="#tabGraficasInversion" role="tab"
                                aria-controls="tabGraficasInversion" aria-selected="false">Detalle inversión</a>
                        </div>
                    </nav>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="tabGraficasGeneral" role="tabpanel">
                            <div class="row">
                                <div class="col-sm-5">

                                    <div
                                        class="card margin_laterales_0px paddinginferior10px margin_top_medium shadow-sm">
                                        <div class="container-fluid">
                                            <div class="row margin_top_small">
                                                <div
                                                    class="col-sm-5 text-center fontFamilyRoboto colorGrisMenosOscuro fontSize16px paddingRight0px">
                                                    <small class="margin0 colorGrisOscuro"><b> Detalle </b></small>
                                                </div>
                                                <div
                                                    class="col-sm-3 textRight fontFamilyRoboto colorGrisMenosOscuro fontSize16px">
                                                    <small class="margin0"><b> Hoy </b></small>
                                                </div>
                                                <div
                                                    class="col-sm-4 text-center fontFamilyRoboto colorGrisMenosOscuro fontSize16px">
                                                    <small class="margin0"><b> Total </b></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container-fluid">
                                            <div class="row margin_top_small">
                                                <div
                                                    class="col-sm-5 paddingRight0px text-center fontFamilyRoboto fontSize12px colorGrisMenosOscuro">
                                                    <label class="margin_bottom_0px">Visitas al anuncio</label>
                                                </div>
                                                <div class="col-sm-3 borderRightSolid3pxPink text-center fontSize14px"
                                                    title="Visitas de este anuncio el dia de hoy">
                                                    <label id="lblVistasHoy"
                                                        class="fontBold margin_bottom_0px pull-right">-</label>
                                                </div>
                                                <div class="col-sm-4 textLeft paddingRight0px fontSize14px"
                                                    title="Visitas totales de este anuncio">
                                                    <label id="lblVistasTotal"
                                                        class="fontBold margin_bottom_0px">-</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container-fluid">
                                            <div class="row margin_top_masSmall">
                                                <div
                                                    class="col-sm-5 paddingRight0px text-center fontFamilyRoboto fontSize12px colorGrisMenosOscuro">
                                                    <label class="margin_bottom_0px">Clics WhatsApp</label>
                                                </div>
                                                <div class="col-sm-3 borderRightSolid3pxGreen text-center fontSize14px"
                                                    title="Clicks en los whatsApp de este anuncio el dia de hoy">
                                                    <label id="lblWhatsAppHoy"
                                                        class="fontBold margin_bottom_0px pull-right">-</label>
                                                </div>
                                                <div class="col-sm-4 textLeft paddingRight0px fontSize14px"
                                                    title="Clicks totales en los whatsApp de este anuncio">
                                                    <label id="lblWhatsAppTotal"
                                                        class="fontBold margin_bottom_0px">-</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container-fluid">
                                            <div class="row margin_top_masSmall">
                                                <div
                                                    class="col-sm-5 paddingRight0px text-center fontFamilyRoboto fontSize12px colorGrisMenosOscuro">
                                                    <label class="margin_bottom_0px">Clics en Llamar</label>
                                                </div>
                                                <div class="col-sm-3 borderRightSolid3pxBlue text-center fontSize14px"
                                                    title="Clicks en los teléfonos de este anuncio el dia de hoy">
                                                    <label id="lblCallsHoy"
                                                        class="fontBold margin_bottom_0px pull-right">-</label>
                                                </div>
                                                <div class="col-sm-4 textLeft paddingRight0px fontSize14px"
                                                    title="Clicks totales en los teléfonos de este anuncio">
                                                    <label id="lblCallsTotal"
                                                        class="fontBold margin_bottom_0px">-</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card margin_top_medium shadow-sm">
                                        <div class="card-body padding10px5px textCenter">
                                            <label class="fontSize13px margin0 fontFamilyRoboto"
                                                id="lblEstadisticaCreacion">Fecha de creación: - </label>
                                            <br>
                                            <label class="fontSize13px margin0 fontFamilyRoboto"
                                                id="lblEstadisticaUltimaEdicion">Última Edición: - </label>
                                        </div>
                                    </div>

                                    <div class="card margin_top_small shadow-sm">
                                        <div class="card-body padding10px5px textCenter">
                                            <div class="row">
                                                <div class="col-4 borderRightSolid1pxGrayClaro">
                                                    <label class="fontSize13px margin0 fontFamilyRoboto">TOP <br>
                                                        <span id="lblNumTop">0</span> </label>
                                                </div>
                                                <div class="col-4 borderRightSolid1pxGrayClaro">
                                                    <label class="fontSize13px margin0 fontFamilyRoboto">PREMIUM
                                                        <br>
                                                        <span id="lblNumPremium">0</span> </label>
                                                </div>
                                                <div class="col-4">
                                                    <label class="fontSize13px margin0 fontFamilyRoboto">PLATINO
                                                        <br>
                                                        <span id="lblNumPlatino">0</span> </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-sm-7">
                                    <div class="margin_top_small paddingLaterales20px">
                                        <canvas id="myChartVistasPorHoras" width="400" height="350"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tabGraficasFechas" role="tabpanel">
                            <div class="row margin_top_medium">
                                <div class="col-sm-4 offset-sm-1">
                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text fontFamilyRoboto">Fecha Inicial</span>
                                        </div>
                                        <input type="date" class="form-control fontFamilyRoboto"
                                            id="inpFecha1Estadistica">
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text fontFamilyRoboto">Fecha Final</span>
                                        </div>
                                        <input type="date" class="form-control fontFamilyRoboto"
                                            id="inpFecha2Estadistica">
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <button type="button"
                                        class="btn btn-primary btn-sm textUppercase fontSize12px width100porciento"
                                        id="inpCargarEstadistica">Cargar</button>
                                </div>
                            </div>
                            <div class="row margin_top_small">
                                <div class="col-sm-6">
                                    <canvas id="myChartTiposVistas" width="400" height="200"></canvas>
                                </div>
                                <div class="col-sm-6">
                                    <canvas id="myChartVistas" width="400" height="200"></canvas>
                                </div>
                            </div>
                            <div class="row margin_top_medium">
                                <div class="col-sm-6">
                                    <canvas id="myChartWhat" width="400" height="200"></canvas>
                                </div>
                                <div class="col-sm-6">
                                    <canvas id="myChartCall" width="400" height="200"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tabGraficasInversion" role="tabpanel">
                            <div class="row margin_top_medium">
                                <div class="col-sm-4 offset-sm-1">
                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text fontFamilyRoboto">Fecha Inicial</span>
                                        </div>
                                        <input type="date" class="form-control fontFamilyRoboto"
                                            id="inpFecha1Inversion">
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text fontFamilyRoboto">Fecha Final</span>
                                        </div>
                                        <input type="date" class="form-control fontFamilyRoboto"
                                            id="inpFecha2Inversion">
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <button type="button"
                                        class="btn btn-primary btn-sm textUppercase fontSize12px width100porciento"
                                        id="inpCargarInversion">Cargar</button>
                                </div>
                            </div>
                            <div class="row margin_top_small">
                                <div class="col-sm-6">
                                    <canvas id="myChartInversionFecha" width="400" height="200"></canvas>
                                </div>
                                <div class="col-sm-6">
                                    <canvas id="myChartInversionTotalByTipo" width="400" height="180"></canvas>
                                </div>
                            </div>
                            <!--// **************************** -->

                            <hr class="styleHR width50porciento margin_top_30px">

                            <h4 class="textCenter margin_top_small">Historico Compras</h4>

                            <div id="divTablaHistorico" class="container margin_top_medium scrollVisible"
                                style="max-height: 300px">
                            </div>

                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button"
                        class="btn btn-default borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal" id="modalRelojito" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Subidas individuales</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="inpIdAnuncioRelojito">

                    <div class="width100porciento textCenter centradoHorizontal">
                        <h4
                            class="spCreditosModals cursorPointer textCenter margin_bottom_7px badge-warning width50porciento width100porcientoMovil padding7px fontSize14px fontWeight500 fontFamilyRoboto">
                            Tu Saldo: -</h4>
                    </div>

                    <h4 id="divAlertMaximoRelojito"
                        class="text-center fontFamilyRoboto padding10px width100porciento btn-danger colorWhite margin_bottom_10px displayNone margin_top_small">
                        Ya programaste 5 subidas para este anuncio.
                    </h4>

                    <p class="textCenter fontFamilyRoboto fontSize14px colorGrisClaro">Por tan solo $100 tu
                        anuncio subirá a primera posición y rotará en el top de anuncios por 20 minutos. Puedes
                        programar simultaneamente hasta 5 subidas individuales por anuncio.</p>

                    <p class="textCenter fontSize14px fontFamilyRoboto">Escoge una hora de incio</p>

                    <p id="lblTipoDiaRelojito" class="textCenter fontSize14px margin_bottom_5px fontFamilyRoboto">
                    </p>

                    <div class="row">
                        <div class="col-sm-6 margin_top_small">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text fontFamilyRoboto fontSize14px borderRadius0px"
                                        id="basic-addon3">Desde:</span>
                                </div>
                                <input type="time" id="inpHoraInicioRelojito" name="inpHoraInicioRelojito"
                                    class="form-control inputStyle fontSize14px backgroudWhite textCenter borderRadius0px"
                                    aria-describedby="basic-addon3">
                            </div>
                        </div>
                        <div class="col-sm-6 margin_top_small">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text fontFamilyRoboto fontSize14px borderRadius0px"
                                        id="basic-addon3">Hasta:</span>
                                </div>
                                <input type="time" id="inpHoraFinRelojito" name="inpHoraFinRelojito"
                                    class="form-control fontFamilyRoboto fontSize14px textCenter borderRadius0px"
                                    aria-describedby="basic-addon3" disabled>
                            </div>
                        </div>
                    </div>

                    <div id="divPillsRelojitosActivos" class="textCenter">
                    </div>

                </div>
                <div class="modal-footer">
                    <button id="btnAceptarRelojito" type="button"
                        class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo">Aceptar</button>
                    <button type="button"
                        class="btn btn-default borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Cerrar</button>
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
                    <input type="hidden" id="inpIdAnuncioTopFree">

                    <h4 id="divAlertMaximoTopFree"
                        class="text-center fontFamilyRoboto padding10px width100porciento btn-success colorWhite margin_bottom_10px displayNone margin_top_small">
                        TOP GRATIS Activo.
                    </h4>

                    <p class="textCenter fontFamilyRoboto fontSize14px colorGrisClaro">Sube tu anuncio a primera
                        posición totalmente gratis. Tu anuncio rotará durante
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

    <!-- ********************************* -->

    <div class="modal" id="modalPromociones" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Promociona tu anuncio</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="inpIdAnuncioPromocion">

                    <div class="width100porciento textCenter centradoHorizontal">
                        <h4
                            class="spCreditosModals cursorPointer textCenter margin_bottom_10px badge-warning width50porciento width100porcientoMovil padding7px fontSize14px fontWeight500 fontFamilyRoboto">
                            Tu Saldo: -</h4>
                    </div>

                    <nav>
                        <div class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active fontSize13px textUppercase fontWeight600 colorGrisClaro"
                                id="navPromoRE" data-toggle="tab" href="#dNavPromoRE" role="tab"
                                aria-controls="dNavPromoRE" aria-selected="true">Paquetes TOP</a>
                            <a class="nav-item nav-link fontSize13px textUppercase fontWeight600 colorGrisClaro"
                                id="navPromoDes" data-toggle="tab" href="#dNavPromoDes" role="tab"
                                aria-controls="dNavPromoDes" aria-selected="false">Destacar Anuncio</a>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane show active padding10px" id="dNavPromoRE" role="tabpanel"
                            aria-labelledby="navPromoRE">
                            <!--  ********************* -->

                            <p class="textCenter fontFamilyRoboto fontSize14px colorGrisClaro">Tu anuncio subirá a
                                primera posición y rotara en el top de anuncios durante la cantidad de días y horas
                                escogidas por día.</p>

                            <ul id="navOpcionesRePromocion"
                                class="nav nav-pills nav-justified mb-3 paddingLaterales35px" role="tablist">
                                <li class="nav-item">
                                    <a class="navPromoREDias btn btn-outline-success hovergreenClaro borderRadius0px width100porciento active paddingSuperiorInferior5px fontSize13px textUppercase fontWeight600"
                                        id="nav7Dias" data-toggle="pill" href="#dNav7Dias" role="tab"
                                        aria-controls="dNav7Dias" aria-selected="true" data-load="false" data-dias="7">7
                                        Días</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navPromoREDias btn btn-outline-success hovergreenClaro bordeslateralesnone borderRadius0px width100porciento paddingSuperiorInferior5px fontSize13px textUppercase fontWeight600"
                                        id="nav15Dias" data-toggle="pill" href="#dNav15Dias" role="tab"
                                        aria-controls="dNav15Dias" aria-selected="false" data-load="false"
                                        data-dias="15">15 Días</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navPromoREDias btn btn-outline-success hovergreenClaro borderRadius0px width100porciento paddingSuperiorInferior5px fontSize13px textUppercase fontWeight600"
                                        id="nav30Dias" data-toggle="pill" href="#dNav30Dias" role="tab"
                                        aria-controls="dNav30Dias" aria-selected="false" data-load="false"
                                        data-dias="30">30 Días</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="dNav7Dias" role="tabpanel"
                                    aria-labelledby="nav7Dias">
                                    <div id="divContainerPaquetes7Dias" class="container">
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="dNav15Dias" role="tabpanel" aria-labelledby="nav15Dias">
                                    <div id="divContainerPaquetes15Dias" class="container">
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="dNav30Dias" role="tabpanel" aria-labelledby="nav30Dias">
                                    <div id="divContainerPaquetes30Dias" class="container">
                                    </div>
                                </div>
                            </div>

                            <!--  ********************* -->
                        </div>
                        <div class="tab-pane" id="dNavPromoDes" role="tabpanel" aria-labelledby="navPromoDes">

                            <div
                                class="card margin_top_medium width100porciento borderRadius0px sombraPequeña backgroundYellowAnuncios">
                                <div class="card-body paddingSuperiorInferior15px">
                                    <button id="countDiasPremiun"
                                        class="btn btn-primary btnMarkItemAnuncio width100porciento padding5px fontSize12px displayNone"><i
                                            class="fas fa-clock"></i> PAQUETE ACTIVO: -</button>

                                    <h5 id="tituloPremiun" class="card-title textCenter fontSize16px textUppercase">
                                        Premium</h5>
                                    <h6 class="card-subtitle mb-2 textCenter fontFamilyRoboto colorGrisOscuro">
                                        Resalta tu
                                        anuncio con un fondo amarillo por 30 días</h6>
                                    <h6 class="card-text textCenter fontFamilyRoboto colorGrisOscuro">Gratis 20 minutos
                                        en primeras posiciones.</h6>
                                    <div class="centradoHorizontal">
                                        <button id="btnPackPremiun"
                                            class="margin_top_small btn borderRadius0px backgroundPinkClaro colorWhite width50porciento fontFamilyRoboto fontSize14px fontWeight600 paddingSuperiorInferior5px sombraPequeña hoverColorWhite hoverBackgroundPinkOscuro">$15.000</button>
                                    </div>
                                    <p
                                        class="margin_bottom_0px margin_top_small width100porciento textCenter fontFamilyRoboto">
                                        A continucación deberás escoger la hora de inicio del obsequio</p>
                                </div>
                            </div>

                            <div
                                class="card margin_top_medium width100porciento borderRadius0px sombraPequeña backgroundPinkAnuncios">
                                <div class="card-body paddingSuperiorInferior15px">
                                    <button id="countDiasPlatino"
                                        class="btn btn-primary btnMarkItemAnuncio width100porciento padding5px fontSize12px displayNone"><i
                                            class="fas fa-clock"></i> PAQUETE ACTIVO: -</button>

                                    <h5 id="tituloPlatino" class="card-title textCenter fontSize16px textUppercase">
                                        Platino + Carrusel</h5>
                                    <h6 class="card-subtitle mb-2 textCenter fontFamilyRoboto colorGrisOscuro">Resalta
                                        tu
                                        anuncio con un fondo purpura y súbelo al carrusel por 30 días</h6>
                                    <h6 class="card-text textCenter fontFamilyRoboto colorGrisOscuro">Gratis 7 días/8
                                        Horas al día en primeras posiciones.</h6>
                                    <div class="centradoHorizontal">
                                        <button id="btnPackPlatino"
                                            class="margin_top_small btn borderRadius0px backgroundPink colorWhite width50porciento fontFamilyRoboto fontSize14px fontWeight600 paddingSuperiorInferior5px sombraPequeña hoverColorWhite hoverBackgroundPinkOscuro">$130.000</button>
                                    </div>
                                    <p
                                        class="margin_bottom_0px margin_top_small width100porciento textCenter fontFamilyRoboto">
                                        A continucación deberás escoger la hora de inicio del obsequio</p>
                                </div>
                            </div>

                            <p class="textCenter margin_top_medium fontFamilyRoboto fontSize14px colorGrisClaro">Los
                                anuncios destacados permanecerán en el TOP por el tiempo que determina su obsequio,
                                luego pasarán al listado general de anuncios. Para volver a las primeras posiciones
                                será
                                necesario adquirir un paquete TOP adicional.</p>

                        </div>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button"
                        class="btn btn-default borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ********************************* -->

    <div class="modal" id="modalHoraPromocion" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content borderRadius0px">
                <div class="modal-header">
                    <h5
                        class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">
                        Configurar tu promocion</h5>
                    <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <input type="hidden" id="inpIdOpcionPromocion">
                    <input type="hidden" id="inpDiasPromocion">
                    <input type="hidden" id="inpHorasPromocion">

                    <input type="hidden" id="inpFecha1Promocion">
                    <input type="hidden" id="inpFecha2Promocion">

                    <p class="textCenter fontFamilyRoboto fontSize14px colorGrisClaro">Calcular duracion de la
                        promocion:</p>

                    <p class="textCenter fontSize14px fontFamilyRoboto">Escoge una hora de incio</p>

                    <div class="row">
                        <div class="col-sm-12 margin_top_small">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text fontFamilyRoboto fontSize14px borderRadius0px"
                                        id="basic-addon3">Hora Inicio:</span>
                                </div>
                                <input type="time" id="inpHoraInicioPromocion" name="inpHoraInicioPromocion"
                                    class="form-control inputStyle fontSize16px backgroudWhite textCenter borderRadius0px"
                                    aria-describedby="basic-addon3">
                            </div>
                        </div>
                    </div>

                    <p class="textCenter fontSize14px margin_bottom_5px fontFamilyRoboto colorGrisMenosClaro">La
                        promocion se efectuara
                        entre los dias:</p>

                    <p id="lblFechasPromocion" class="textCenter fontSize14px margin_bottom_5px fontFamilyRoboto">-
                    </p>

                    <p class="textCenter fontSize14px margin_bottom_5px fontFamilyRoboto colorGrisMenosClaro">y entre
                        las horas:</p>

                    <p id="lblHorasPromocion" class="textCenter fontSize14px margin_bottom_5px fontFamilyRoboto">-
                    </p>



                </div>
                <div class="modal-footer">
                    <button id="btnAceptarPromocion" type="button"
                        class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo">Aceptar</button>
                    <button type="button"
                        class="btn btn-default borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo"
                        data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>


</div>