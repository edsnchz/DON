<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description"
        content="Prepagos, Gigolos, Escorts, Gays, Trans, Masajistas disponibles a un click, Anuncios clasificados eróticos gratis en toda Colombia. Busca y publica.">
    <meta name="keywords"
        content="prepagos,putas,escort,anuncios,clasificados,erótico,masajistas,transexuales,travestis,gay,gigolo,disponibles,click,rapido">
    <meta name="author" content="doneroticos">


    <title><?= $title ?></title>

    <script type="text/javascript">
    var loginBack = "<?php echo $loginBack ?>";
    </script>


    <?= load_styles(); ?>
    <?= $css ?>

</head>

<body>

    <!-- HEADER -->
    <div class="container-fluid width100porciento">
        <div class="row sombraPequeña">
            <div class="col-12 col-sm-8 cursorPointer centradoVertical" id="divColLogo">
                <img class="height50px" src="<?= load_img_url('images/logo.svg'); ?>" alt="LOGO DONEROTICOS">
                <button id="btnOpenPanelLateral" class="hamburger hamburger--spin centradoVertical d-block d-sm-none"
                    type="button" data-open="0" style="width: 65px">
                    <span class="hamburger-box margin_top_8px">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div class="col-sm-4 d-none d-sm-block">
                <div class="row height100porciento">
                    <div class="col-sm-2 centradoVertical textCenter">
                        <a class="textDecorationNone displayNone fontSize12px letterSpacingMinimo textUppercase
                        fontWeight600 colorGrisOscuro hoverGrisClaro btnSalir" href="#">Salir</a>
                    </div>
                    <div class="col-sm-5 centradoVertical textCenter">
                        <a class="textDecorationNone fontSize12px letterSpacingMinimo textUppercase fontWeight600
                        colorGrisOscuro hoverGrisClaro btnPanel" href="#">Panel de
                            Usuario</a>
                    </div>
                    <div
                        class="col-sm-5 backgroundPink textCenter centradoVertical hoverBackgroundPinkOscuro height100porciento">
                        <a class="colorWhite transitionNone fontSize12px letterSpacingMinimo textUppercase fontWeight600
                        colorGrisOscuro width100porciento hoverColorWhite textDecorationNone btnPublicar" href="#">
                            <i class="fas fa-plus"></i> Publica Gratis
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- CONTENIDO -->
    <?= $content_for_layout ?>


    <!-- FOOTER -->
    <footer class="footer bg-light height40px centradoVertical paddingTop43remMovil">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 h-100 text-lg-center my-auto">
                    <ul class="list-inline mb-2 textCenter">
                        <li class="list-inline-item">
                            <a href="#" id="aLinkCondicionesUso"
                                class="textDecorationNone fontSize11px fontSize10pxMovil letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Condiciones
                                de uso</a>
                        </li>
                        <li class="list-inline-item">&sdot;</li>
                        <li class="list-inline-item">
                            <a href="#" id="aLinkPoliticaPagos"
                                class="textDecorationNone fontSize11px fontSize10pxMovil letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Política
                                de pagos</a>
                        </li>
                        <li class="list-inline-item">&sdot;</li>
                        <li class="list-inline-item">
                            <a href="#" id="aLinkPoliticaPrivacidad"
                                class="textDecorationNone fontSize11px fontSize10pxMovil letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Política
                                de privacidad</a>
                        </li>
                        <li class="list-inline-item">&sdot;</li>
                        <li class="list-inline-item">
                            <a href="#" id="aLinkContactanos"
                                class="textDecorationNone fontSize11px fontSize10pxMovil letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Contacto</a>
                        </li>
                    </ul>
                    <p class="text-muted small mb-2 mb-lg-0 fontFamilyRoboto textCenter fontSize12px fontSize11pxMovil">
                        <strong>doneroticos.com</strong> es una página de contenido adulto. Todos los anunciantes han
                        reconocido
                        ser mayores de 18 años.
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <div id="divPanelLateral">
        <ul>
            <li>
                <a class="colorWhite transitionNone fontSize14px letterSpacingMinimo textUppercase fontWeight600 width100porciento textDecorationNone colorPink btnPublicar"
                    href="#"><i class="fas fa-plus"></i> Publica Gratis</a>
            </li>
            <li>
                <a class="textDecorationNone fontSize14px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro btnPanel"
                    href="#">Panel de Usuario</a>
            </li>
            <li><a class="textDecorationNone displayNone fontSize14px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro btnSalir"
                    href="#">Salir</a>
            </li>
        </ul>
    </div>

    <div id="divLoading" class="containerLoader animated" style="visibility: hidden;">
        <svg class="loaderSVG shadow-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
            <circle id="circle1" cx="170" cy="170" r="95" stroke="#C501FE" />
            <circle id="circle2" cx="170" cy="170" r="80" stroke="#444444" />
            <circle id="circle3" cx="170" cy="170" r="65" stroke="#C501FE" />
            <circle id="circle4" cx="170" cy="170" r="50" stroke="#444444" />
        </svg>
    </div>

    <div id="divInfoWindows" class="card borderRadius20pt">
        <div class="card-body backgroundBlue colorWhite borderRadius20pt shadow-lg">
            <h5 class="card-title fontFamilyRoboto">Tranquilo!</h5>
            <h6 class="card-subtitle mb-2 fontSize14px fontFamilyRoboto">No mostramos publicidad
                de terceros</h6>
            <p class="card-text margin0 fontSize13px fontFamilyRoboto fontWeight300">Desactiva los 'AdBlocks' para el
                correcto funcionamiento del sitio web.</p>
            <a href="#" id="btnCloseInfoWindows"
                class="card-link colorWhite hoverColorgray fontSize12px floatRight textUppercase fontWeight600 letterSpacingMinimo">Aceptar</a>
        </div>
    </div>

    <div class="modal fade styleModal18year" id="modal18year" tabindex="-1" role="dialog" data-backdrop="static"
        data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg widthAutoMovil paddingLaterales30pxMovil"
            role="document" style="width: 650px">
            <div class="modal-content backgroundTransparent">

                <div class="width100porciento height200pxMovil" style="height: 400px;">
                    <img src="../images/alert18years.webp"
                        class="width100porciento height100porciento img18year displayNoneMovil"
                        alt="Imagen descriptiva confirmacion mayoria de edad">

                    <div class="sombra divLbls18year">
                        <!-- <img src="../images/logoPNG.png" class="imgSmall18year displayNoneNoMovil"> -->
                        <img src="../images/18years.svg" class="height90px" style="display: block; margin: auto"
                            alt="Imagen descriptiva confirmacion mayoria de edad MOVIL">
                        <!-- <h4 class="text-center fontSize16px margin_bottom_20px">Eres mayor de edad? (+18)</h4> -->
                        <h4 class="text-center fontFamilyRoboto fontSize13px fontWeight400 margin_top_small">
                            Este sitio tiene contenido explicito, debes ser mayor de edad para acceder!</h4>
                        <div class="width100porciento centradoHorizontal">
                            <button
                                class="positionAbsolute col-sm-6 col-sm-offset-3 fontFamilyRoboto buttonSalir18 width50porcientoMovil"
                                onclick="window.location='https://www.google.com/'">Salir</button>
                            <button id="btnAcept18year"
                                class="positionAbsolute fontFamilyRoboto col-sm-6 col-sm-offset-3 buttonAcept18year hoverColorWhite width50porcientoMovil">Soy
                                mayor</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>


    <?= load_scripts(); ?>
    <?= $js ?>

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156985052-1">
    </script>
    <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'UA-156985052-1');
    </script>

</body>

</html>