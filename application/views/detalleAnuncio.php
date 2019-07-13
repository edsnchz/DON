<script type="text/javascript">
    var idAnuncio = "<?php echo $id ?>";
</script>

<div class="container-fluid margin_top_medium">
    <div class="row">
        <div class="col-sm-4 mx-auto">
            <input type="text" class="form-control searchStyle" id="inpTextBuscar" placeholder="Término de búsqueda (Opcional)">
        </div>
        <div class="col-sm-3 mx-auto">
            <select class="form-control searchStyleBlack" id="inpCategorias">
                <option value="NaN">Todas las categorías</option>
            </select>
        </div>
        <div class="col-sm-2 mx-auto">
            <select class="form-control searchStyleBlack" id="inpDepartamentos">
                <option value="NaN">Todos los departamentos</option>
            </select>
        </div>
        <div class="col-sm-2 mx-auto">
            <select class="form-control searchStyleBlack" id="inpCiudades">
            </select>
        </div>
        <div class="col-sm-1">
            <button id="btnBuscar" class="btn btn-outline-secondary borderRadius0px height35px fontSize12px textUppercase fontWeight600" type="button">Navegar</button>
        </div>
    </div>
</div>

<!-- CAROUSEL -->
<div id="divCarouselPadre" class="owl-carousel owl-theme carousel-tops margin_top_medium">
    <div class="item itemCarousel backgroundGrayDos sombraPequeña padding18px">
        <img src="<?= load_img_url('images/camera.svg'); ?>" class="imgItemCarouselDefault">
        <!-- <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_717.jpg'); ?>" class="imgItemCarousel sombraPequeña"> -->
    </div>
</div>

<!-- CALL TO ACTION CAROUSEL -->
<div class="alert alert-success divCTACarousel colorWhite pulse borderRadius0px" role="alert">
  <h4 class="alert-heading margin_bottom_5px text-center fontSize16px">WOW!!</h4>
  <p class="margin0 fontFamilyRoboto">Quieres máxima visibilidad? Súbete al carrusel y se lo primero que vean!</p>
  
</div>

<!-- DETALLE DEL ANUNCIO -->
<div class="container margin_top_medium">

    <div class="row">
        <div class="col-sm-9">
            <h3 id="labelTitulo" class="text-center margin_top_medium"></h3>

            <div id="divEtiquetas" class="text-center"></div>

            <h5 id="labelDescripcion" class="fontWeight300 margin_top_small"></h5>

            <hr class="styleHR">

            <div>
                <div class="card-columns cardColumsNum2" id="divImagenes"> 
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            
            <div id="divCelulares"></div>
            
            <hr class="styleHR">

            <h4 class="text-center">Condiciones</h4>

            <div id="divCondiciones"></div>

            <label class="text-center margin_top_small"><small>* Don Eroticos no realiza ninguna transacion con el cliente solo es un metodo de conocer</small></label>

            <div>
                <button type="button" class="btn btn-outline-success width100porciento margin_top_small"><i class="fas fa-paper-plane"></i> Mensaje Privado</button>

                <button type="button" class="btn btn-danger width100porciento margin_top_small"><i class="fas fa-exclamation-triangle"></i> Denunciar</button>
                
                <hr class="styleHR">

                <h4 class="text-center">Estadisticas</h4>

                <div class="row">
                    <div class="col-sm-6 borderRightSolid1pxGray text-center fontSize16px">
                        <i class="fas fa-eye"></i> Hoy: <label id="lblVistasHoy" class="fontBold"></label>
                    </div>
                    <div class="col-sm-6 text-center fontSize16px">
                        <i class="fas fa-eye"></i> Total: <label id="lblVistasTotal" class="fontBold"></label>
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>