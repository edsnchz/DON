
<div class="container-fluid margin_top_small">
    <ul class="nav nav-tabs fontSize12px fontFamilyPoppins colorGrisOscuro letterSpacingMinimo" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tMisAnuncios" role="tab" aria-controls="tMisAnuncios" aria-selected="true">MIS ANUNCIOS</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#tCrearAnuncio" role="tab" aria-controls="tCrearAnuncio" aria-selected="false">CREAR ANUNCIO</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#tPremium" role="tab" aria-controls="tPremium" aria-selected="false">CRÉDITOS</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="tabMensajes" data-toggle="tab" href="#tMensajes" role="tab" aria-controls="tMensajes" aria-selected="false">MENSAJES</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#tOpciones" role="tab" aria-controls="tOpciones" aria-selected="false">OPCIONES</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="tMisAnuncios" role="tabpanel">
            <div class="container">  
                <div class="row" id="divMisAnuncios">
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tCrearAnuncio" role="tabpanel">

            <div class="centerMargin backgroundGray sombra margin_top_medium" style="width: 800px; padding: 20px">
                <div class="fontSize14px fontFamilyRoboto">
                    <p class="letterSpacingMinimo  
                        colorGrisOscuro">1. Rellena los datos de tu anuncio</p>
                        <p class="colorGrisClaro">Según la categoría tendrás la opción de elegir hasta 6 etiquetas</p>
                        
                </div>
                <div class="row margin_top_medium">
                    <div class="col-sm-4">
                        <select class="form-control inputStyle" id="inpCategorias">
                            <option value="N/A">Categoría</option>
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <select class="form-control inputStyle" id="inpDepartamentos">
                            <option value="N/A">Departamento</option>
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <select class="form-control inputStyle" id="inpCiudades">
                            <option value="N/A">Ciudad</option>
                        </select>
                    </div>
                </div>
                <!-- **** -->
                
                <div class="row margin_top_small">
                    <div class="col-sm-12">
                        <input type="text" class="form-control inputStyle" name="inpTitulo" id="inpTitulo" placeholder="Titulo">
                    </div>
                </div>
                <div class="row margin_top_small">
                    <div class="col-sm-12">
                        <textarea rows="5" class="form-control inputStyle" name="inpDescripcion" id="inpDescripcion" placeholder="Descripción"></textarea>
                    </div>
                </div>
                <!-- **** -->
                <div class="margin_top_small" id="tagCloud">
                </div>
                <!-- **** -->
                <div id="divRowsOptionsServicios">
                    <div class="row margin_top_small">
                        <div class="col-sm-11">
                            <div class="fontSize14px fontFamilyRoboto">
                            <br>
                                <p class="letterSpacingMinimo colorGrisOscuro">2. Define las tarifas y condiciones del servicio</p>
                                <p class="colorGrisClaro">Puedes agregar las combinaciones que creas necesarias</p>
                                
                            </div>
                        </div>
                        <div class="col-sm-1 centradoVertical">
                            <button type="button" id="btnAddRowOptionService" class="borderNone backgroudNone colorBlue hoverGrisClaro outlineNone"><i class="far fa-2x fa-plus-square"></i></button>
                        </div>
                    </div>
                    <!-- ***** -->
                    <div class="row margin_top_medium rowOptionService">
                        <div class="col-sm-3">
                            <input type="text" id="inpPrecio1" class="form-control inputStyle inpPrecio" name="inpPrecio" placeholder="Valor" data-type="currency" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$">
                        </div>
                        <div class="col-sm-4">
                            <select id="inpTiempo1" class="form-control inputStyle inpTiempo">
                                <option value="N/A">Tiempo</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <select id="inpRelaciones1" class="form-control inputStyle inpRelaciones">
                                <option value="N/A">Relaciones</option>
                            </select>
                        </div>
                        <div class="col-sm-1 centradoVertical">
                            <button type="button" class="borderNone backgroudNone colorGrisMasClaro btnDeleteRowOptionService outlineNone" disabled><i class="far fa-2x fa-minus-square"></i></button>
                        </div>
                    </div>
                </div>
                <!-- **** -->
                <div class="fontSize14px fontFamilyRoboto">
                <br><br>
                <p class="letterSpacingMinimo
                        colorGrisOscuro">3. Escoge número y forma de contacto para este anuncio</p>
                        <p class="colorGrisClaro">También recibirás mensajes privados en tu bandeja de entrada</p>
                </div>
                <div id="divTelefonos" class="row margin_top_medium">
                    <!-- CARDS -->
                </div>
                <br><br>
                <div class="fontSize14px fontFamilyRoboto">
                    <p class="letterSpacingMinimo  
                        colorGrisOscuro">4. Sube tus fotos</p>
                        <p class="colorGrisClaro">No utilices fotos de otras personas, o tu anuncio será borrado.</p>
                        
                </div>
                <div class="row margin_top_medium">
                    <div class="col-sm-12">

                        <div class="containerUpload">
                            <fieldset class="form-group">
                                <a href="javascript:void(0)" onclick="$('#pro-image').click()" class="hoverGrisClaro textDecorationNone fontFamilyRoboto">Subir imágenes</a>
                                <input type="file" id="pro-image" name="pro-image[]" style="display: none;" class="form-control" multiple>
                                <button class="btn btn-primary floatRight" id="btnMiGaleria" data-toggle="modal" data-target="#modalMiGaleria">Mi Galeria</button>
                            </fieldset>
                            <div class="preview-images-zone">
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="form-group centradoVertical margin_top_small">
                    <input id="inpAceptTerms" type="checkbox" name="inpAceptTerms" class=" margin_left_small">
                    <label for="inpAceptTerms" class="fontFamilyRoboto fontSize12px colorGrisClaro margin_left_10px text-justify">
                    Soy mayor de edad. Acepto la política de privacidad y condiciones de uso de doneróticos.com.
                    Declaro que soy completamente independiente, pongo este anuncio por cuenta propia,
                    ofrezco mis servicios de acompañamiento libremente y por mi propia elección.
                    </label>
                </div>

                <button id="btnGuardar" type="button" class="btn btn-primary borderNone borderRadius0px outlineNone margin_top_small backgroundPink hoverBackgroundPinkOscuro">Publicar anuncio</button>
            </div>

            <br><br>

        </div>
        <div class="tab-pane fade" id="tPremium" role="tabpanel">

            <span id="spCreditos2" class="badge badge-pill borderRadius5pt badge-warning fontSize16px fontWeight400 padding7px fontFamilyRoboto" title="Tus créditos actuales" style="position: absolute; right: 10px"></span>
            <h4 class="textCenter fontSize20px margin_top_small colorGrisOscuro">Comprar créditos</h4>
            <p class="textCenter fontFamilyRoboto colorGrisClaro fontSize14px colorGrisOscuro">
                Valores netos a pagar. Ningún método de pago genera comisiones adicionales.
                <br>
                Tus créditos estarán disponibles inmediatamente una vez aprobada y verificada la transacción por el sistema.
            </p>
            <div class="row margin_top_medium" id="divPrecios">
        
            </div>
            <div class="col-xl-12 mx-auto padding0 textCenter margin_top_30px">
                <img class="img-responsive" src="<?= load_img_url('images/payu.jpg'); ?>" style="width: 30%; height: auto">
            </div>

        </div>
        <div class="tab-pane fade" id="tMensajes" role="tabpanel">

            <div style="height: 65vh;">
                <div class="row height100porciento">
                    <div class="col-sm-4 backgroundGray scrollVisible height100porciento">
                        <div class="row" id="divRemitentes">
                        </div>
                    </div>
                    <div class="col-sm-8 backgroundGray scrollVisible height100porciento" id="divMensajes">
                    </div>
                </div>
            </div>

        </div>
        <div class="tab-pane fade" id="tOpciones" role="tabpanel">
            OPCIONES
        </div>
    </div>
</div>

<div class="modal fade" id="modalNumber" tabindex="-1" role="dialog" aria-labelledby="modalNumber" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content borderRadius0px">
      <div class="modal-header">
        <h5 class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">Verificaremos tu numero de teléfono</h5>
        <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <input type="number" class="form-control inputStyle textCenter letterSpacingMinimo" id="inpNumber" name="inpNumber" placeholder="Ingresa aquí tu nuevo número">
            <div class="form-group pull-left centradoVertical margin_top_small">
                <input id="inpAceptTermsNum" type="checkbox" name="inpAceptTermsNum" class="checkStyle margin_left_small">
                <label for="inpAceptTermsNum" class="fontSize14px colorGrisClaro fontWeight600 margin_left_MasSmall height6px">
                    Acepto recibir mensajes SMS
                </label>
            </div>
      </div>
      <div class="modal-footer">
        <button id="btnGuardarNumero" type="button" class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo" data-dismiss="modal">Validar</button>
      </div>
    </div>
  </div>
</div>

<!-- ********************************* -->

<div class="modal fade" id="modalEliminarNumero" tabindex="-1" role="dialog" aria-labelledby="modalEliminarNumero" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content borderRadius0px">
      <div class="modal-header">
        <h5 class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">Estás seguro?</h5>
        <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <input type="hidden" id="inpIdEliminar">
            <h5 id="lblEliminarNumero" class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto"></h5>
      </div>
      <div class="modal-footer">
        <button id="btnEliminarNumero" type="button" class="btn btn-danger borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo" data-dismiss="modal">Eliminar</button>
      </div>
    </div>
  </div>
</div>

<!-- ********************************* -->

<div class="modal fade" id="modalMiGaleria" tabindex="-1" role="dialog" aria-labelledby="modalMiGaleria" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content borderRadius0px">
      <div class="modal-header">
        <h5 class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">Mis fotos</h5>
        <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div>
                <div class="card-columns margin_top_30px cardColumsNum5" id="divMisFotos"> 
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button id="btnSelectMiGaleria" type="button" class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo" data-dismiss="modal">Seleccionar</button>
      </div>
    </div>
  </div>
</div>

<!-- ********************************* -->

<div class="modal" id="modalMiGaleriaEditar" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content borderRadius0px">
      <div class="modal-header">
        <h5 class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">Mis fotos</h5>
        <button type="button" class="close outlineNone" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div>
                <div class="card-columns margin_top_30px cardColumsNum5" id="divMisFotosEditar"> 
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button id="btnSelectMiGaleriaEditar" type="button" class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo">Seleccionar</button>
      </div>
    </div>
  </div>
</div>

<!-- ********************************* -->

<div class="modal" id="modalEditarAnuncio" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content borderRadius0px">
      <div class="modal-header">
        <h5 class="modal-title textCenter fontSize14px colorGrisOscuro letterSpacingMinimo fontFamilyRoboto">Titulo</h5>
        <button type="button" id="btnCloseModalEditarAnuncio" class="close outlineNone" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <input type="hidden" id="inpIdAnuncioEditar">
            <div class="row">
                <div class="col-sm-12">
                    <div class="fontSize14px fontFamilyRoboto">
                        <p class="letterSpacingMinimo  
                        colorGrisOscuro">1. Rellena los datos de tu anuncio</p>
                    </div>
                    <input type="text" class="form-control inputStyle margin_top_medium" name="inpTituloEditar" id="inpTituloEditar" placeholder="Titulo">
                </div>
            </div>
            <div class="row margin_top_small">
                <div class="col-sm-12">
                <textarea rows="5" class="form-control inputStyle" name="inpDescripcionEditar" id="inpDescripcionEditar" placeholder="Descripción"></textarea>
                </div>
            </div>
            <div id="tagCloudEditar" class="margin_top_small"></div>

            <div class="row margin_top_medium">
                <div class="col-sm-11">
                    <div class="fontSize14px fontFamilyRoboto">
                        <p class="letterSpacingMinimo colorGrisOscuro">2. Define las tarifas y condiciones del servicio</p>
                    </div>
                </div>
                <div class="col-sm-1 centradoVertical">
                    <button type="button" id="btnAddRowOptionServiceEditar" class="borderNone backgroudNone colorBlue hoverGrisClaro outlineNone"><i class="far fa-2x fa-plus-square"></i></button>
                </div>
            </div>
            <div id="divCondicionesEditar">
            </div>
                
            <div id="divTelefonosEditar" class="row margin_top_medium">
                <!-- CARDS -->
            </div>
            <div class="row margin_top_medium">
                <div class="col-sm-12">

                    <div class="containerUpload">
                        <fieldset class="form-group">
                            <a href="javascript:void(0)" onclick="$('#pro-imageEditar').click()" class="hoverGrisClaro textDecorationNone fontFamilyRoboto">Subir imágenes</a>
                            <input type="file" id="pro-imageEditar" name="pro-imageEditar[]" style="display: none;" class="form-control" multiple>
                            <button class="btn btn-primary floatRight" id="btnMiGaleriaEditar">Mi Galeria</button>
                        </fieldset>
                        <div class="preview-images-zone-editar">
                        </div>
                    </div>
                    
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button id="btnAceptarEdicion" type="button" class="btn btn-primary borderRadius0px fontSize12px fontWeight600 textUppercase letterSpacingMinimo">Aceptar</button>
      </div>
    </div>
  </div>
</div>
