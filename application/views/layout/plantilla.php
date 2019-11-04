<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Anuncios clasificados eróticos gratis en toda Colombia">
    <meta name="keywords" content="prepagos,putas,escort,anuncios,clasificados,erótico,masajistas,transexuales,travestis,gay,gigolo">
    <meta name="author" content="DON">

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
                <img class="height50px" src="<?= load_img_url('images/logo.svg'); ?>">

                <button id="btnOpenPanelLateral" class="hamburger hamburger--spin centradoVertical d-block d-sm-none" type="button" data-open="0" style="width: 65px">
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
                    <div class="col-sm-5 backgroundPink textCenter centradoVertical hoverBackgroundPinkOscuro height100porciento">
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
    <footer class="footer bg-light height40px centradoVertical paddingTop45remMovil">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 h-100 text-lg-center my-auto">
                    <ul class="list-inline mb-2 textCenter">
                        <li class="list-inline-item">
                            <a href="#" id="aLinkCondicionesUso" class="textDecorationNone fontSize12px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Condiciones de uso</a>
                        </li>
                        <li class="list-inline-item">&sdot;</li>
                        <li class="list-inline-item">
                            <a href="#" id="aLinkPoliticaPagos" class="textDecorationNone fontSize12px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Política de pagos</a>
                        </li>
                        <li class="list-inline-item">&sdot;</li>
                        <li class="list-inline-item">
                            <a href="#" id="aLinkPoliticaPrivacidad" class="textDecorationNone fontSize12px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Política de privacidad</a>
                        </li>
                        <li class="list-inline-item">&sdot;</li>
                        <li class="list-inline-item">
                            <a href="#" id="aLinkContactanos" class="textDecorationNone fontSize12px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro">Contacto</a>
                        </li>
                    </ul>
                    <p class="text-muted small mb-2 mb-lg-0 fontFamilyRoboto textCenter">&copy; "doneróticos.com" es una página de contenido +18. Todos los anunciantes han reconocido ser mayores de 18 años y aceptar los terminos.</p>
                </div>
            </div>
        </div>
    </footer>

    <div id="divPanelLateral">
        <ul>
            <li>
                <a class="colorWhite transitionNone fontSize12px letterSpacingMinimo textUppercase fontWeight600 width100porciento textDecorationNone colorPink btnPublicar" href="#"><i class="fas fa-plus"></i> Publica Gratis</a>
            </li>
            <li>
              <a class="textDecorationNone fontSize12px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro btnPanel" href="#">Panel de Usuario</a>
            </li>
            <li><a class="textDecorationNone displayNone fontSize12px letterSpacingMinimo textUppercase fontWeight600 colorGrisOscuro hoverGrisClaro btnSalir" href="#">Salir</a>
            </li>
        </ul>
    </div>

    <div id="divLoading" class="containerLoader animated" style="visibility: hidden;">
        <svg class="loaderSVG shadow-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
             <circle id="circle1" cx="170" cy="170" r="95" stroke="#C501FE"/>
             <circle id="circle2" cx="170" cy="170" r="80" stroke="#444444"/>
             <circle id="circle3" cx="170" cy="170" r="65" stroke="#C501FE"/>
             <circle id="circle4" cx="170" cy="170" r="50" stroke="#444444"/>
        </svg>
    </div>



    <?= load_scripts(); ?>
    <?= $js ?>

</body>

</html>