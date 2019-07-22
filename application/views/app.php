
<!-- Masthead -->
<div class="container-fluid">
    <div class="row">
        <div class="col-xl-12 mx-auto padding0">
            <img class="img-responsive" src="<?= load_img_url('images/bg-header.jpg'); ?>" style="width: 100%; height: auto">
        </div>
    </div>
</div>

<div class="container-fluid margin_top_small bg-light">
    <div class="row">
        <div class="col-sm-4 mx-auto">
            <input type="text" class="form-control searchStyle" id="inpTextBuscar" placeholder="Término de búsqueda (Opcional)">
        </div>
        <div class="col-sm-3 mx-auto">
            <select class="form-control searchStyle" id="inpCategorias">
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
                <option value='NaN'>Todas las ciudades</option>
            </select>
        </div>
        <div class="col-sm-1">
            <button id="btnBuscar" class="btn btn-outline-secondary borderRadius0px height35px fontSize12px textUppercase fontWeight600" type="button">Navegar</button>
        </div>
    </div>
</div>

<section class="features-icons bg-light text-center">
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatPre">
                    <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundGrayMasClaro padding10px borderSolidPink hoversolidPink cursorPointer" data-id="1"><img class="padding7px" src="<?= load_img_url('images/icons/prepagos-ico.svg'); ?>"style="width: 100%; height: 50px">Prepagos</h3>
                    
                </div>
            </div>
            <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatMa">
                    <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundGrayMasClaro padding10px borderSolidPink hoversolidPink cursorPointer" data-id="2"><img class="padding7px" src="<?= load_img_url('images/icons/masajes-ico.svg'); ?>"style="width: 100%; height: 50px">Masajes eroticos</h3>
                    
                </div>
            </div>
            <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatTra">
                    <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundGrayMasClaro padding10px borderSolidPink hoversolidPink cursorPointer" data-id="3"><img class="padding7px" src="<?= load_img_url('images/icons/trans-ico.svg'); ?>"style="width: 100%; height: 50px">Transexuales</h3>
                    
                </div>
            </div>
        </div>
        <!-- ***************** --> 
        <div class="row margin_top_small">
            <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatS">
                    <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundGrayMasClaro padding10px borderSolidPink hoversolidPink cursorPointer" data-id="4"><img class="padding7px" src="<?= load_img_url('images/icons/gay-ico.svg'); ?>"style="width: 100%; height: 50px">Scort gay</h3>
                    
                </div>
            </div>
            <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatG">
                    <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundGrayMasClaro padding10px borderSolidPink hoversolidPink cursorPointer" data-id="5"><img class="padding7px" src="<?= load_img_url('images/icons/gigolo-ico.svg'); ?>"style="width: 100%; height: 50px">Gigolos</h3>
                    
                </div>
            </div>
            <div class="col-lg-4">
                <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatO">
                    <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundGrayMasClaro padding10px borderSolidPink hoversolidPink cursorPointer" data-id="6"><img class="padding7px" src="<?= load_img_url('images/icons/otros-ico.svg'); ?>"style="width: 100%; height: 50px">Otros anuncios</h3>
                    
                </div>
            </div>
        </div>
    </div>
</section>

<section class="showcase text-justify backgroundIcons">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 my-auto showcase-text">
                <!-- <h2>Fully Responsive Design</h2> -->
                <p class="fontSize12px letterSpacingMinimo">doneróticos.com es una pagina de anuncios clasificados gratis 100% Colombiana. Creada exclusivamente
                    para <strong>prepagos</strong>, masajistas eróticos, y servicios sexuales profesionales, cualquiera puede publicar su anuncio de una manera
                    fácil rápida y sencilla, sin censuras y en un sólo paso. doneróticos.com se caracteriza
                    por poder subir tus anuncios a primera posición gratis. Dividimos la web en cinco secciones básicas de prepagos,
                    escorts, escorts gay, transexuales, masajes eróticos, y otros. En esta web puede publicar todo el mundo sus avisos,
                    independientes, agencias, webs, <strong>escorts, putas, prostitutas, transexuales</strong>, gigolós y cualquiera que este
                    relacionado con los servicios sexuales de pago. Esta web esta desarrollada por expertos del sector para
                    profesionales, todos los anuncios se publican al instante, sin retrasos, sin censuras, en un sólo paso,
                    puedes subir tus anuncios a primera posición y, todo en una web rápida y de fácil manejo para el usuario.
                    El objetivo principal de doneróticos.com es dar un servicio de alta calidad para los usuarios, tanto servidores
                    sexuales como consumidores de sexo. Resumiendo, lo que todo el mundo necesita, una web dinámica, fácil,
                    sencilla y efectiva. Para escorts, para todos ustedes, esta es nuestra web doneróticos.com</p>
            </div>
        </div>
    </div>
</section>