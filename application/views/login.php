<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="PAGINA DE CONTENIDO ADULTO">
    <meta name="author" content="DON">

    <title>DON - LOGIN</title>

    <?= load_styles(); ?>
    <?= load_styles_url("css/login.css"); ?>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">


</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-login">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="login-form" action="#" method="post" role="form" style="display: block;">
                                    <!-- <h2>Iniciar Sesión</h2> -->
                                    <img class="height50px" src="<?= load_img_url('images/logo.svg'); ?>">
                                    <div class="form-group">
                                        <input type="email" name="inpCorreo" id="inpCorreo" tabindex="1"
                                            class="form-control" placeholder="Correo">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="inpPass" id="inpPass" tabindex="2"
                                            class="form-control" placeholder="Contraseña">
                                    </div>
                                    <div class="col-xs-6 form-group pull-left ">
                                        <input id="inpRemember" type="checkbox" class="checkStyle margin_left_small " name="inpRemember">
                                        <label for="inpRemember" class="fontSize12px colorGrisClaro">Recordar Contraseña</label>
                                    </div>
                                    <div class="col-xs-6 form-group pull-right">
                                        <input type="button" name="btnLogin" id="btnLogin" tabindex="4"
                                            class="form-control btn btn-login" value="Ingresar">
                                    </div>
                                </form>
                                <form id="register-form" action="#" method="post" role="form" style="display: none;">
                                    <!-- <h2>Crear Usuario</h2> -->
                                    <img class="height50px" src="<?= load_img_url('images/logo.svg'); ?>">
                                    <div class="form-group">
                                        <input type="email" name="inpCorreoRegistro" id="inpCorreoRegistro" tabindex="1"
                                            class="form-control" placeholder="Correo">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="inpPassRegistro" id="inpPassRegistro" tabindex="2"
                                            class="form-control" placeholder="Contraseña">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="inpPassRegistro2" id="inpPassRegistro2"
                                            tabindex="2" class="form-control" placeholder="Confirmar Contraseña">
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="button" name="btnRegistro" id="btnRegistro" tabindex="4"
                                                    class="form-control btn btn-register" value="Enviar">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-6 tabs">
                                <a href="#" class="active" id="login-form-link">
                                    <div id="divlogin" class="login activeSelect textUppercase fontWeight600 colorGrisClaro letterSpacingMinimo fontSize12px">Iniciar sesión</div>
                                </a>
                            </div>
                            <div class="col-xs-6 tabs">
                                <a href="#" class="" id="register-form-link">
                                    <div id="divRegistro" class="register textUppercase fontWeight600 colorGrisClaro letterSpacingMinimo fontSize12px">Crear usuario</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="container">
            <div class="col-md-10 col-md-offset-1 text-center">
                <h6 class="fontSize12px colorWhite textUppercase fontWeight300 letterSpacingMinimo">Olvidaste tu contraseña?</a></h6>
            </div>
        </div>
    </footer>

    <?= load_scripts(); ?>
    <?= load_scripts_url("js/views/login.js"); ?>

    <!--- CDN DEL EMAIL -->
    <script src="https://smtpjs.com/v3/smtp.js"></script>

</body>

</html>