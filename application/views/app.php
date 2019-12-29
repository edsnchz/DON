<div class="pageComplete">

    <!-- Masthead -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-12 mx-auto padding0 IndexHeader">
                <img id="imgBanner" class="filterHeader centerImageLeft"
                    src="<?= load_img_url('images/bg-header.jpg'); ?>" style="width: 100%; height: 200px">
                <div class="overlayTextHeader fontFamilyRoboto width70porcientoMovil">
                    <h1>Anuncios clasificados eróticos en Colombia</h1>
                    <p class="colorGrisClaro d-none d-md-block">En &copy; <strong>"doneróticos.com"</strong> encontrarás
                        las mejores <strong>prepagos y masajistas eróticas</strong> de tu ciudad, ademas de una gran
                        variedad en servicios sexuales profesionales.
                        <strong>Transexuales, travestis, gays, gigolós,</strong> y mucho mas. Completamente sin censura.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid paddingSuperior10px bg-light">
        <div class="row">
            <div class="col-md-4 col-sm-6 col-12 mx-auto margin_top_small">
                <input type="text" class="form-control searchStyle" id="inpTextBuscar"
                    placeholder="Término de búsqueda (Opcional)">
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
                <button id="btnBuscar"
                    class="btn btn-secondary borderRadius0px height35px fontSize12px textUppercase fontWeight600 width100porciento"
                    type="button">Buscar</button>
            </div>
        </div>
    </div>

    <section class="features-icons bg-light text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatPre">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatPre borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="1"><img class="padding7px"
                                src="<?= load_img_url('images/icons/prepagos-ico.svg'); ?>"
                                style="width: 100%; height: 50px">Prepagos</h3>

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatMa">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatMas borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="2"><img class="padding7px"
                                src="<?= load_img_url('images/icons/masajes-ico.svg'); ?>"
                                style="width: 100%; height: 50px">Masajes eróticos</h3>

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatTra">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatTrans borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="3"><img class="padding7px" src="<?= load_img_url('images/icons/trans-ico.svg'); ?>"
                                style="width: 100%; height: 50px">Transexuales</h3>

                    </div>
                </div>
            </div>
            <!-- ***************** -->
            <div class="row margin_top_small">
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatS">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatGay borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="4"><img class="padding7px" src="<?= load_img_url('images/icons/gay-ico.svg'); ?>"
                                style="width: 100%; height: 50px">Escort gay</h3>

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatG">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatGig borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="5"><img class="padding7px"
                                src="<?= load_img_url('images/icons/gigolo-ico.svg'); ?>"
                                style="width: 100%; height: 50px">Gigolós</h3>

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatO">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatOtros borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="6"><img class="padding7px" src="<?= load_img_url('images/icons/otros-ico.svg'); ?>"
                                style="width: 100%; height: 50px">Otros anuncios</h3>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="showcase text-justify backgroundIcons">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 my-auto showcase-text">
                    <h2 class="textUppercase">Bienvenido a doneróticos.com</h2>
                    <p class="fontSize14px fontFamilyRoboto fontWeight400">&copy; "doneróticos.com" es una pagina de
                        anuncios eróticos gratis en Colombia.
                        Creada exclusivamente para <strong>prepagos, masajistas eróticos,</strong> y otros
                        <strong>servicios sexuales</strong> profesionales.
                        Con nuestro panel de usuario mejorado todos pueden publicar y gestionar sus anuncios de una
                        manera mas fácil, rápida y sencilla.
                        &copy; "doneróticos.com" se caracteriza por su variedad de opciones para destacar tus anuncios y
                        así obtener
                        maxima visibilidad. La web se divide en seis categorías básicas: <strong>Prepagos, masajes
                            eróticos, transexuales,
                            escort gay, gigolós</strong> y otros anuncios. Esta web esta desarrollada por expertos del
                        sector para
                        profesionales, independientes, agencias, spa, <strong>escorts, putas, prostitutas,
                            transexuales</strong>, gigolós y cualquiera que este
                        relacionado con los servicios sexuales de pago. Todos los anuncios se publican al instante, sin
                        retrasos,
                        al igual que nuestros paquetes premium se activan inmediatamente.
                        Puedes subir tus anuncios a primera posición y destacarlos sobre el resto,
                        todo en una web rápida y de fácil manejo pensada y diseñada para los usuarios.
                        El objetivo principal de &copy; "doneróticos.com" es dar un servicio de alta calidad tanto para
                        los servidores
                        sexuales como para los consumidores de sexo. Lo que todo el mundo necesita, una web dinámica,
                        fácil,
                        sencilla, bien diseñada y efectiva. Para todos ustedes, esta es nuestra web &copy;
                        "doneróticos.com"</p>
                </div>
            </div>
        </div>
    </section>


    <div id="divInfoWindows" class="card">
        <div class="card-body backgroundGray shadow-lg borderRadius0px">
            <h5 class="card-title fontFamilyRoboto">Tranquilo!</h5>
            <h6 class="card-subtitle mb-2 text-muted fontSize14px fontFamilyRoboto">No mostramos publicidad
                de terceros</h6>
            <p class="card-text margin0 fontSize12px fontFamilyRoboto">Desactiva los 'AdBlocks' para el correcto
                funcionamiento del sitio.</p>
            <a href="#" id="btnCloseInfoWindows"
                class="card-link colorPink hoverColorPink fontSize12px floatRight textUppercase fontWeight600 letterSpacingMinimo">Aceptar</a>
        </div>
    </div>


    <div class="modal fade styleModal18year" id="modal18year" tabindex="-1" role="dialog" data-backdrop="static"
        data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg widthAutoMovil paddingLaterales30pxMovil"
            role="document" style="width: 650px">
            <div class="modal-content backgroundTransparent">

                <div class="width100porciento height200pxMovil" style="height: 400px;">
                    <img src="../images/alert18years.jpg"
                        class="width100porciento height100porciento img18year displayNoneMovil">

                    <div class="sombra divLbls18year">
                        <img src="../images/logoPNG.png" class="imgSmall18year displayNoneNoMovil">
                        <h4 class="text-center fontSize16px margin_bottom_20px">Eres mayor de edad? (+18)</h4>
                        <h4 class="text-center fontSize13px margin_bottom_20px fontWeight400">Este sitio tiene contenido
                            explicito, debes aceptar tener la mayoria de edad!</h4>
                        <div class="width100porciento centradoHorizontal">
                            <button class="btn padding0 height30px"
                                onclick="window.location='https://www.google.com/'">No</button>
                            <button id="btnAcept18year"
                                class="btn buttonAcept18year backgroundPink borderNone colorWhite hoverColorWhite">Si</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>




</div>