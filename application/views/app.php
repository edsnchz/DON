<div class="pageComplete">

    <!-- Masthead -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-12 mx-auto padding0 IndexHeader">
                <img id="imgBanner" class="filterHeader centerImageLeft"
                    src="<?= load_img_url('images/bg-header.webp'); ?>" style="width: 100%; height: 200px" alt="BANNER">
                <div class="overlayTextHeader fontFamilyRoboto width70porcientoMovil">
                    <h1>Anuncios clasificados eróticos en Colombia</h1>
                    <p class="colorGrisClaro d-none d-md-block fontSize14px">En <strong>doneroticos.com</strong>
                        encontrarás
                        las mejores <strong>prepagos y masajistas eróticas</strong> de tu ciudad, ademas de una gran
                        variedad en servicios sexuales profesionales.
                        <strong>Transexuales, travestis, gays, gigolós,</strong> y mucho mas. Completamente sin censura.
                    </p>
                    <span><i class="fab fa-twitter fa-lg colorBlue"></i><a class="colorBlue"
                            href="https://twitter.com/doneroticos" target="_blank"> @doneroticos</a></span>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid paddingSuperior10px bg-light">
        <div class="row">
            <div class="col-md-3 col-sm-6 col-12 mx-auto margin_top_small">
                <input type="text" class="form-control searchStyle" id="inpTextBuscar" placeholder="Palabra clave">
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

    <section class="features-icons bg-light text-center paddinginferior3rem">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatPre">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatPre borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="1"><img class="padding7px"
                                src="<?= load_img_url('images/icons/prepagos-ico.svg'); ?>"
                                style="width: 100%; height: 50px" alt="Icono categoria prepagos">Prepagos</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatMa">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatMas borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="2"><img class="padding7px"
                                src="<?= load_img_url('images/icons/masajes-ico.svg'); ?>"
                                style="width: 100%; height: 50px" alt="Icono categoria masajes eroticos">Masajes
                            eróticos</h3>

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatTra">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatTrans borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="3"><img class="padding7px" src="<?= load_img_url('images/icons/trans-ico.svg'); ?>"
                                style="width: 100%; height: 50px" alt="Icono categoria transexuales">Transexuales</h3>

                    </div>
                </div>
            </div>
            <!-- ***************** -->
            <div class="row margin_top_small">
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatS">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatGay borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="4"><img class="padding7px" src="<?= load_img_url('images/icons/gay-ico.svg'); ?>"
                                style="width: 100%; height: 50px" alt="Icono categoria gays">Escort gay</h3>

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatG">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatGig borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="5"><img class="padding7px"
                                src="<?= load_img_url('images/icons/gigolo-ico.svg'); ?>"
                                style="width: 100%; height: 50px" alt="Icono categoria gigolos">Gigolós</h3>

                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" id="divCatO">
                        <h3 class="hCategoria textUppercase fontSize14px fontWeight600 backgroundCatOtros borderRadius10pt padding10px borderSolidPink hoversolidPink cursorPointer"
                            data-id="6"><img class="padding7px" src="<?= load_img_url('images/icons/otros-ico.svg'); ?>"
                                style="width: 100%; height: 50px" alt="Icono categoria otros">Otros anuncios</h3>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="features-icons bg-light text-center paddingTop0px">
        <h2 class="fontSize25px fontWeight100 fontFamilyRoboto paddingLaterales20px">Estos son los beneficios
            de publicar tus anuncios en <strong>doneroticos.com</strong></h2>
        <p class="fontFamilyRoboto fontSize16px fontWeight400 colorGrisClaro paddingLaterales20px paddinginferior5px">
            Publica tus anuncios en <strong>doneróticos</strong> y recibe mas de lo que otros sitios te dan.
        </p>
        <hr class="styleHR width15porciento width50porcientoMovil">

        <div class="container-fluid">
            <div class="row paddingLaterales120px margin_top_30px paddingLaterales35pxMovil">

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite borderSolid1pxGreenTOP sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="fas fa-arrow-up colorGreenTOP fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Top Gratis</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">Sube
                            tus anuncios a primera posición durante 15 minutos GRATIS!! Todas las veces que quieras.
                        </p>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="fas fa-hand-holding-usd colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Saldo gratis</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">
                            Te regalamos $10.000 por publicar tu primer anuncio. Y en cada compra recibe saldo
                            adicional.</p>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class=" far fa-image colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Galería de fotos</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">Cada
                            vez
                            que subes una foto esta se guarda en tu galería privada para que la puedas reutilizar en
                            otros
                            anuncios.</p>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="fas fa-phone colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Gestiona tus números</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">
                            Agrega
                            hasta 4 números de teléfono en tu cuenta y decide cuales aparecen en cada anuncio.</p>
                    </div>
                </div>

            </div>

            <!-- ***************** -->
            <div class="row margin_top_30px paddingLaterales120px paddingLaterales35pxMovil">

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="far fa-eye colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Mas visibilidad</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">Con
                            nuestro carrusel puedes lograr que mas personas vean tu anuncio. Mas top que nunca!</p>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="fas fa-hashtag colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Etiquetas</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">
                            Agrega
                            hasta seis etiquetas por cada anuncio y consigue que te encuentren fácilmente.</p>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="fas fa-chart-bar colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Estadísticas reales</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">
                            Datos
                            reales del rendimiento de tus anuncios, actualizados instantáneamente. Controla la inversión
                            de
                            tus
                            créditos.</p>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="far fa-money-bill-alt colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Medios de pago</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">
                            Recarga saldo de forma fácil y segura, sin pagar comisiones extras y recibelo
                            inmediatamente.
                        </p>
                    </div>
                </div>

                <!-- <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 backgroundWhite sombraMediana
                    width85porciento width100porcientoMovil minHeight300px">
                        <i class="fas fa-tasks colorPink fontSize40px margin_top_30px"></i>
                        <h3 class="colorGrisOscuro fontSize16px fontWeight600 textUppercase margin_top_30px">
                            Mas por llegar...</h3>
                        <p class="fontFamilyRoboto margin_top_30px paddingLaterales20px fontSize14px fontWeight400">Esto
                            es solo el comienzo, tenemos preparado mucho mas, tanto para anunciantes como usuarios.</p>
                    </div>
                </div> -->
            </div>
        </div>

        <h2 class="fontSize25px fontWeight100 fontFamilyRoboto paddingLaterales20px margin_top_30px">Además,
            en <strong>doneróticos</strong> escuchamos tus ideas.</h2>
        <p class="fontFamilyRoboto fontSize16px fontWeight400 colorGrisOscuro paddingLaterales20px"> Utiliza el link de
            <b>contacto</b> en el pie de página para recomendarnos todo lo que te gustaría tener en nuestro sitio
            web,<br>no importa si eres anunciante o usuario, esta página fue creada para ti.
        </p>
    </section>

    <section class="showcase text-justify backgroundIcons">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 my-auto showcase-text">
                    <h2 class="textUppercase">Bienvenido a doneroticos.com</h2>
                    <p class="fontSize14px fontFamilyRoboto fontWeight400"><strong>doneroticos.com</strong> es
                        una pagina de
                        anuncios eróticos gratis en Colombia.
                        Creada exclusivamente para <strong>prepagos, masajistas eróticos,</strong> y otros
                        <strong>servicios sexuales</strong> profesionales.
                        Con nuestro panel de usuario mejorado todos pueden publicar y gestionar sus anuncios de una
                        manera mas fácil, rápida y sencilla. <strong>doneroticos.com</strong> se caracteriza por su
                        variedad de opciones para destacar tus anuncios y
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
                        El objetivo principal de <strong>doneroticos.com</strong> es dar un servicio de alta calidad
                        tanto para
                        los servidores
                        sexuales como para los consumidores de sexo. Lo que todo el mundo necesita, una web dinámica,
                        fácil,
                        sencilla, bien diseñada y efectiva. Para todos ustedes, esta es nuestra web
                        <strong>doneroticos.com</strong>
                    </p>
                </div>
            </div>
        </div>
    </section>


</div>