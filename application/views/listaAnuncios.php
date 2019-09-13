<script type="text/javascript">
    var categoria = "<?php echo $categ ?>";
    var categorias = categoria.split("_");
    var etiqueta = "<?php echo $etiq ?>";
    var etiquetas = etiqueta.split("_");
    var state = "<?php echo $state ?>";
    var city = "<?php echo $city ?>";
    var text = "<?php echo $text ?>";
</script>

<div class="container-fluid margin_top_small bg-light">
    <div class="row">
        <div class="col-md-4 col-sm-6 col-12 mx-auto margin_top_small">
            <input type="text" class="form-control searchStyle" id="inpTextBuscar" placeholder="Término de búsqueda (Opcional)">
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
        <div class="col-md-1 col-sm-12 col-xs-12 margin_top_small">
            <button id="btnBuscar" class="btn btn-secondary borderRadius0px height35px fontSize12px textUppercase fontWeight600 width100porciento" type="button">Buscar</button>
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

<!-- MAPIADO -->
<div class="container-fluid">
    <nav aria-label="breadcrumb" style="margin-top: 10pt;">
        <ol class="breadcrumb fontSize12px textUppercase fontWeight600 backgroudNone">
            <li class="breadcrumb-item"><a href="#" id="eMapInicio">Inicio</a></li>
            <li class="breadcrumb-item colorGrisClaro"><a id="eMapDepartamento">Departamento</a></li>
            <li class="breadcrumb-item colorGrisClaro"><a id="eMapCiudad">Ciudad</a></li>
            <li class="breadcrumb-item"><a href="#" id="eMapCategoria">Categoria</a></li>
            <li class="breadcrumb-item active colorGrisClaro" aria-current="page" id="eMapEtiqueta"></li>
        </ol>
    </nav>

    <div id="btnsStyleGrid" class="pull-right">
        <div class="btn-group" role="group">
            <button id="btnViewTable" type="button" class="btn "><span class="oi oi-grid-three-up"></span></button>    
            <button id="btnViewList" type="button" class="btn  inactivo"><span class="oi oi-list-rich fontSize18px margin0"></span></button>
        </div>
    </div>
</div>


<div class="container container-mas-grande">
    <div class="row">
        <div class="col-sm-3">
            <div class="margin_top_small" id="tagCloud">
            </div>
            <!-- ************** -->
            <div class="margin_top_medium">
                <ul id="enlacesCategorias" class="paddingSuperiorInferior10px backgroundGrayDos">
                </ul>
            </div>
        </div>
        <div class="col-sm-9" id="divCuadricula">
                <!-- ANUNCIOS -->
        </div>
    </div>
</div>

<br><br>
