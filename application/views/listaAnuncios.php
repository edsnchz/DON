<script type="text/javascript">
    var categoria = "<?php echo $categ ?>";
    var categorias = categoria.split("_");
    var etiqueta = "<?php echo $etiq ?>";
    var etiquetas = etiqueta.split("_");
</script>

<div class="container-fluid margin_top_medium">
    <div class="row">
        <div class="col-sm-4 mx-auto">
            <input type="text" class="form-control searchStyle" id="" placeholder="Buscar (Anuncios, Modelos, etc...)">
        </div>
        <div class="col-sm-3 mx-auto">
            <select class="form-control searchStyle" id="inpCategorias">
                <option value="N/A">Todas las categorías</option>
            </select>
        </div>
        <div class="col-sm-2 mx-auto">
            <select class="form-control searchStyle" id="inpDepartamentos">
                <option value="N/A">Todos los departamentos</option>
            </select>
        </div>
        <div class="col-sm-2 mx-auto">
            <select class="form-control searchStyle" id="inpCiudades">
                <option value="N/A">Todas las ciudades</option>
            </select>
        </div>
        <div class="col-sm-1">
            <button class="btn btn-outline-secondary borderRadius0px height35px fontSize12px textUppercase fontWeight600" type="button">Buscar</button>
        </div>
    </div>
</div>

<!-- CAROUSEL -->
<div class="owl-carousel owl-theme margin_top_medium">
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_7.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_71.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_72.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_73.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_74.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_75.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_76.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_712.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_713.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_714.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
    <div class="item itemCarousel">
        <img src="<?= load_img_url('uploads/anuncios/anuncio_1_usuario_715.jpg'); ?>" class="imgItemCarousel sombraPequeña">
    </div>
</div>

<!-- MAPIADO -->
<div class="container-fluid">
    <nav aria-label="breadcrumb" style="margin-top: 10pt;">
    <ol class="breadcrumb fontSize12px textUppercase fontWeight600 backgroudNone">
        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
        <li class="breadcrumb-item"><a href="#" id="eMapDepartamento">Departamento</a></li>
        <li class="breadcrumb-item"><a href="#" id="eMapCiudad">Ciudad</a></li>
        <li class="breadcrumb-item"><a href="#" id="eMapCategoria">Categoria</a></li>
        <li class="breadcrumb-item active" aria-current="page" id="eMapEtiqueta">Etiqueta</li>
    </ol>
    </nav>
</div>


<div class="container">
    <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-10" id="divCuadricula">
            <div class="card-columns">
                <!-- ANUNCIOS -->
            </div>
        </div>
    </div>
</div>

<br><br>