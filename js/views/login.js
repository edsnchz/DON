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
    	createEmail_Template("CONFIRMACION DE CORREO - DON EROTICOS", email, '<h1 style="color: #656565; font-family: inherit; font-size: 18px">Bienvenido a un mundo de fantasias y placeres! Confirmanos que eres tu ;)</h1><br><br><a style="padding:20px; background: #b804ef; border:none; border-radius: 15pt; box-shadow: -1px 9px 21px -10px rgba(0,0,0,0.51); color: white; font-size: 25px; text-decoration: none; margin-top: 20px" href="https://doneroticos.com/c_app/validEmail?idxt=' + token + '" target="_blank">Confirmar correo</a>');
    }

    function sendEmailPass(email, pass) {
    	createEmail_Template("NUEVA CONTRASEÑA - DON EROTICOS", email, '<h1 style="color: #656565; font-family: inherit; font-size: 18px">Esta es tu nueva contraseña, guardala bien ;) <br><br> Puedes cambiarla cuando quieras en Opciones de Perfil</h1><br><br><label style="padding:20px; background: #b804ef; border:none; border-radius: 15pt; box-shadow: -1px 9px 21px -10px rgba(0,0,0,0.51); color: white; font-size: 25px; text-decoration: none; margin-top: 20px">'+pass+'</label>');
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

                if(remenber){
                    var encrypted = String(CryptoJS.AES.encrypt((correo+"&"+pass), "userAccess"));
                    localStorage.setItem('userAccess', encrypted);     
                }else{
                    localStorage.removeItem('userAccess');     
                }

                localStorage.setItem('userLogin', true);

                let url = localStorage.getItem("urlBeforeLogin");
                localStorage.removeItem("urlBeforeLogin");
                if(url == "" || typeof url == "undefined" || url == null){
                    $(location).attr('href', urlProyectShort()); 
                }else{
                    $(location).attr('href', urlProyect() + url);
                }

            }
        }, "json"); //post
    }

    function createUser(correo, pass, token) {
        $('#btnRegistro').prop("disabled", true);
        $.post("c_app/insertUsuario", {
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

    function newPass(correo, pass) {
        $.post("c_app/setNewPass", {
            correo: correo,
            pass: pass
        }, function (data) {
            if (data.resultado == true) {
                sendEmailPass(correo, pass);
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
                })
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


    $(".imgLogin").click(function(){
        $(location).attr('href', urlProyectShort()); 
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


    $('body').on('click', '.btnOlvidarPass', function () {  
        olvidarPass();
    });

    async function olvidarPass(){
        const { value: email } = await Swal.fire({
          title: 'Digite el correo electronico',
          input: 'email',
          inputPlaceholder: ''
        })
        if (email) {
          let number = generateRandomNumber();
          newPass(email, number);
        }
    }


});