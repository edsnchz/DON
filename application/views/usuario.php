<div class="container-fluid margin_top_small">
<!-- fontFamilyPoppins fontSize12px textUppercase fontWeight600 colorGrisOscuro letterSpacingMinimo hoverGrisClaro-->
    <div class="ui top attached tabular menu fontSize12px fontFamilyPoppins colorGrisOscuro letterSpacingMinimo">
        <a class="active item" data-tab="tMisAnuncios">MIS ANUNCIOS</a>
        <a class="item" data-tab="tCrearAnuncio">CREAR ANUNCIO</a>
        <a class="item" data-tab="tPremium">PREMIUM</a>
        <a class="item" data-tab="tMensajes">MENSAJES</a>
        <a class="item" data-tab="tOpciones">OPCIONES</a>
    </div>
    <div class="ui bottom attached active tab segment" data-tab="tMisAnuncios">
        MIS ANUNCIOS
    </div>
    <div class="ui bottom attached tab segment" data-tab="tCrearAnuncio">

        <div class="centerMargin backgroundGray sombra margin_top_medium" style="width: 800px; padding: 20px">
            <div class="fontSize14px fontFamilyRoboto">
                <p class="letterSpacingMinimo  
                    colorGrisOscuro">1. Rellena los datos de tu anuncio</p>
                    <p class="colorGrisClaro">Según la categoría tendrás la opción de elegir hasta 6 etiquetas</p>
                    
            </div>
            <div class="row margin_top_medium">
                <div class="col-sm-4">
                    <select class="form-control inputStyle" id="inpCategorias">
                        <option value="N/A">Categoría *</option>
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control inputStyle" id="inpDepartamentos">
                        <option value="N/A">Departamento *</option>
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control inputStyle" id="inpCiudades">
                        <option value="N/A">Ciudad *</option>
                    </select>
                </div>
            </div>
            <!-- **** -->
            
            <div class="row margin_top_small">
                <div class="col-sm-12">
                    <input type="text" class="form-control inputStyle" name="inpTitulo" id="inpTitulo" placeholder="Titulo *">
                </div>
            </div>
            <div class="row margin_top_small">
                <div class="col-sm-12">
                    <textarea rows="5" class="form-control inputStyle" name="inpDescripcion" id="inpDescripcion" placeholder="Descripción *"></textarea>
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
                        <fieldset class="form-group ">
                            <a href="javascript:void(0)" onclick="$('#pro-image').click()" class="hoverGrisClaro textDecorationNone fontFamilyRoboto">Examinar imágenes</a>
                            <input type="file" id="pro-image" name="pro-image[]" style="display: none;" class="form-control" multiple>
                        </fieldset>
                        <div class="preview-images-zone">
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="form-group centradoVertical margin_top_small">
                <input id="inpAceptTerms" type="checkbox" name="inpAceptTerms" class="checkStyle margin_left_small">
                <label for="inpAceptTerms" class="fontSize14px colorGrisClaro margin_left_MasSmall width100porciento">
                Soy mayor de edad. Acepto la política de privacidad y condiciones de uso de doneróticos.com.
                Declaro que soy completamente independiente, pongo este anuncio por cuenta propia,
                ofrezco mis servicios de acompañamiento libremente y por mi propia elección.
                </label>
            </div>

            <button id="btnGuardar" type="button" class="btn btn-primary borderNone borderRadius0px outlineNone margin_top_small backgroundPink hoverBackgroundPinkOscuro">Publicar anuncio</button>
        </div>

        <br><br>

    </div>
    <div class="ui bottom attached tab segment" data-tab="tPremium">
        PREMIUM
    </div>
    <div class="ui bottom attached tab segment" data-tab="tMensajes">
        MENSAJES
    </div>
    <div class="ui bottom attached tab segment" data-tab="tOpciones">
        OPCIONES
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

