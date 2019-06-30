$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);

        $('#register-form-link').removeClass('active');
        $('#divRegistro').removeClass('activeSelect');
        $(this).addClass('active');
        $('#divlogin').addClass('activeSelect');
        e.preventDefault();
    });

    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);

        $('#login-form-link').removeClass('active');
        $('#divlogin').removeClass('activeSelect');
        $(this).addClass('active');
        $('#divRegistro').addClass('activeSelect');
        e.preventDefault();
    });


    function sendEmail(email, token) {
        Email.send({
            SecureToken: "244547e3-d66f-425b-b96d-65766e301fec",
            To: email,
            From: "edson.snchz@gmail.com",
            Subject: "CONFIRMACION DE CORREO DON",
            Body: '<div style="text-align: center; margin-top: 50px;"><h1 style="color: gray; font-family: Helvetica">DON EROTICOS</h1><a style="padding:20px; background: pink; border:none; border-radius: 15pt; box-shadow: -1px 9px 21px -10px rgba(0,0,0,0.51); color: white; font-size: 25px; text-decoration: none; margin-top: 20px" href="http://localhost/don/index.php/c_app/validEmail?idxt=' + token + '" target="_blank">Confirmar correo</a></div>'
        }).then(
            message => console.log(message)
        );
    }

    function login(correo, pass) {
        $.post("login", {
            correo: correo,
            pass: pass
        }, function (data) {
            if (data.resultado == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data.message,
                    footer: '<a href>Olvidaste tu contraseña?</a>'
                });
            } else {
                localStorage.setItem('userLogin', true);
                $(location).attr('href', urlProyectShort());
            }
        }, "json"); //post
    }

    function createUser(correo, pass, token) {
        $('#btnRegistro').prop("disabled", true);
        $.post("insertUsuario", {
            correo: correo,
            pass: pass,
            token: token
        }, function (data) {
            if (data.resultado == true) {
                sendEmail(correo, token);
                Swal.fire(
                    'Gracias por registrarte',
                    data.message,
                    'success'
                )
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data.message
                })
            }
            $('#btnRegistro').prop("disabled", false);
        }, "json"); //post
    }

    $('#btnLogin').click(function () {
        login($("#inpCorreo").val(), $("#inpPass").val());
    });


    $('#btnRegistro').click(function () {

        if (!validEmail($("#inpCorreoRegistro").val())) {
            toastr.warning("Debe digitar un correo valido");
            return false;
        }

        if ($("#inpPassRegistro").val() != $("#inpPassRegistro2").val()) {
            toastr.warning("Las contraseñas no coinciden");
            return false;
        }

        var token = generateRandomNumber();
        createUser($("#inpCorreoRegistro").val(), $("#inpPassRegistro").val(), token);
    });



});