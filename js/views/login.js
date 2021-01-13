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
/*
    function sendEmail(email, token) {
        createEmail_Template("Confirmacion de Correo - doneróticos", email, '<p>Hola,<br>Te damos la bienvenida a <b>doneróticos!</b><br>Utiliza el siguiente link para confirmar tu correo electrónico.</p><br><a style="padding:15px; background: #b804ef; border:none; border-radius: 0; box-shadow: -1px 9px 21px -10px rgba(0,0,0,0.51); color: white; font-size: 17px; text-decoration: none; margin-top: 20px" href="https://doneroticos.com/c_app/validEmail?idxt=' + token + '" target="_blank">Confirmar correo</a>');
    }

    function sendEmailPass(email, pass) {
        createEmail_Template("Nueva Contraseña - doneróticos", email, '<h1 style="color: #656565; font-family: inherit; font-size: 18px">Esta es tu nueva contraseña de acceso, <br><br> Puedes cambiarla desde el Panel de Usuario</h1><br><br><label style="padding:20px; background: #b804ef; border:none; border-radius: 15pt; box-shadow: -1px 9px 21px -10px rgba(0,0,0,0.51); color: white; font-size: 25px; text-decoration: none; margin-top: 20px">' + pass + '</label>');
    }
*/
    function AjaxSendCodeNumber(number, code) {
        let rtn;
        $.ajax({
            url: '../c_general/sendSMS',
            type: 'POST',
            dataType: "json",
            async: false,
            data: { number: number, code: code },
            success: function (data) {
                if (data.code == 0) {
                    rtn = true;
                } else {
                    rtn = data.message;
                }
            },
            error: function (x) {
                rtn = "Error al enviar el SMS de validacion";
            }
        });
        return rtn;
    }

    function login(correo, pass, remenber) {
        $.post("c_app/setLogin", {
            correo: correo,
            pass: pass
        }, function (data) {
            if (data.resultado == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data.message,
                    footer: '<a href="#" class="btnOlvidarPass">Olvidaste tu contraseña?</a>'
                });
            } else {

                if (remenber) {
                    var encrypted = String(CryptoJS.AES.encrypt((correo + "&" + pass), "userAccess"));
                    localStorage.setItem('userAccess', encrypted);
                } else {
                    localStorage.removeItem('userAccess');
                }

                localStorage.setItem('userLogin', true);

                let url = localStorage.getItem("urlBeforeLogin");
                localStorage.removeItem("urlBeforeLogin");
                if (url == "" || typeof url == "undefined" || url == null) {
                    $(location).attr('href', urlProyectShort());
                } else {
                    $(location).attr('href', urlProyect() + url);
                }

            }
        }, "json"); //post
    }

    function createUser(correo, pass, number) {
        $('#btnRegistro').prop("disabled", true);
        $.post("c_app/insertUsuario", {
            correo: correo,
            pass: pass,
            number: number
        }, function (data) {
            $('#btnRegistro').prop("disabled", false);
            if (data.resultado == true) {
                Swal.fire(
                    'Genial!!',
                    data.message,
                    'success'
                )
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data.message
                });
            }
        }, "json"); //post
    }

    function newPass(number, code) {
        $.post("c_app/setNewPass", {
            number: number,
            code: code
        }, function (data) {
            if (data.resultado == true) {
                AjaxSendCodeNumber(number, code);
                Swal.fire(
                    'Contraseña Generada',
                    data.message,
                    'success'
                )
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data.message
                });
            }
        }, "json"); //post
    }

    $('#btnLogin').click(function () {
        login($("#inpCorreo").val(), $("#inpPass").val(), $("#remenberCheck").prop("checked"));
    });

    $("#inpPass").on('keyup', function (e) {
        if (e.keyCode === 13) {
            login($("#inpCorreo").val(), $("#inpPass").val(), $("#remenberCheck").prop("checked"));
        }
    });

    $(".imgLogin").click(function () {
        $(location).attr('href', urlProyectShort());
    });

    $('#btnRegistro').click(function () {

        if (!$("#inpAceptTermsNum").is(':checked')) {
            toastr.warning("Debe aceptar el envio de SMS a su telefono");
            return false;
        }

        if ($("#inpTelefonoRegistro").val() == "") {
            toastr.warning("Debe digitar un numero de telefono");
            return false;
        }

        if (!validEmail($("#inpCorreoRegistro").val())) {
            toastr.warning("Debe digitar un correo valido");
            return false;
        }

        if ($("#inpPassRegistro").val() != $("#inpPassRegistro2").val()) {
            toastr.warning("Las contraseñas no coinciden");
            return false;
        }

        let generateCodeSMS = generateRandomNumber();

        let rtnSend = AjaxSendCodeNumber($("#inpTelefonoRegistro").val(), generateCodeSMS);

        if (rtnSend) {
            validSMSRegistro(generateCodeSMS);
        } else {
            toastr.error(rtnSend);
        }
        
    });

    $('body').on('click', '.btnOlvidarPass', function () {
        olvidarPass();
    });

    $("#inpAceptTermsNum").change(function () {
        if (!$(this).is(':checked')) {
            $("#inpTelefonoRegistro").prop("disabled", true);
        } else {
            $("#inpTelefonoRegistro").prop("disabled", false);
        }
    });

    async function olvidarPass() {
        const { value: number } = await Swal.fire({
            title: 'Digite su numero de telefono principal',
            input: 'number',
            inputPlaceholder: ''
        })
        if (number) {
            let generateCodeSMS = generateRandomNumber();
            newPass(number, generateCodeSMS);
        }
    }

    async function validSMSRegistro(codeSend) {
        const { value: number } = await Swal.fire({
            title: 'Digite el codigo enviado a su telefono',
            input: 'number',
            inputPlaceholder: ''
        })
        if (number) {
            if(number == codeSend){
                createUser($("#inpCorreoRegistro").val(), $("#inpPassRegistro").val(), $("#inpTelefonoRegistro").val());    
            }else{
                toastr.error("Codigo incorrecto!, porfavor verifique");
            }
        }
    }


});