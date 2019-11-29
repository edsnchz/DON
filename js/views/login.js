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
            Subject: "CONFIRMACION DE CORREO - DON EROTICOS",
            Body: '<div style="text-align: center; margin-top: 50px;"><img src="http://doneroticos.com/images/logo.svg" alt="Don Eroticos" title="Don Eroticos"><br><br><h1 style="color: #656565; font-family: inherit; font-size: 18px">Bienvenido a un mundo de fantasias y placeres! Confirmanos que eres tu ;)</h1><br><br><a style="padding:20px; background: #b804ef; border:none; border-radius: 15pt; box-shadow: -1px 9px 21px -10px rgba(0,0,0,0.51); color: white; font-size: 25px; text-decoration: none; margin-top: 20px" href="http://doneroticos.com/c_app/validEmail?idxt=' + token + '" target="_blank">Confirmar correo</a></div><br><br>'
        }).then(
            message => console.log(message)
        );
    }

    function sendEmailPass(email, pass) {
        Email.send({
            SecureToken: "244547e3-d66f-425b-b96d-65766e301fec",
            To: email,
            From: "edson.snchz@gmail.com",
            Subject: "NUEVA CONTRASEÑA - DON EROTICOS",
            Body: '<div style="text-align: center; margin-top: 50px;"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk%0D%0Ab2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246%0D%0AIDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzNjIuOSA2My4y%0D%0AIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNjIuOSA2My4yOyIgeG1sOnNwYWNl%0D%0APSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0M1MDFGRTt9%0D%0ACjwvc3R5bGU+CjxnIGlkPSJMYXllcl8xXzFfIj4KPC9nPgo8ZyBpZD0ibG9nb194NUZfZmluYWwi%0D%0APgoJPGc+CgkJPHBhdGggZD0iTTExNy4zLDEwLjV2MjcuN2gtNC41bC0wLjMtMi43Yy0xLjUsMi4z%0D%0ALTMuOSwzLjEtNi4zLDMuMWMtNS44LDAtMTAuMS0zLjgtMTAuMS0xMC4zYzAtNi43LDQuMy0xMC4z%0D%0ALDEwLTEwLjMKCQkJYzIuMSwwLDUuMiwxLjEsNi40LDMuMVYxMC41SDExNy4zeiBNMTAwLjksMjgu%0D%0ANGMwLDMuNCwyLjUsNS44LDUuNSw1LjhzNS43LTIuMiw1LjctNS44YzAtMy40LTIuNi01LjctNS43%0D%0ALTUuNwoJCQlTMTAwLjksMjQuOSwxMDAuOSwyOC40eiIvPgoJCTxwYXRoIGQ9Ik0xNDEsMjguNWMw%0D%0ALDUuNi0zLjgsMTAuMi0xMC4yLDEwLjJjLTYuNCwwLTEwLjItNC42LTEwLjItMTAuMnMzLjktMTAu%0D%0AMiwxMC4xLTEwLjJDMTM2LjksMTguMywxNDEsMjIuOSwxNDEsMjguNXoKCQkJIE0xMjUuNSwyOC41%0D%0AYzAsMywxLjgsNS44LDUuMyw1LjhzNS4zLTIuOCw1LjMtNS44YzAtMi45LTIuMS01LjgtNS4zLTUu%0D%0AOEMxMjcuMywyMi43LDEyNS41LDI1LjYsMTI1LjUsMjguNXoiLz4KCQk8cGF0aCBkPSJNMTU4Ljgs%0D%0AMzguM1YyOGMwLTMtMS42LTUuMi00LjctNS4yYy0zLDAtNSwyLjUtNSw1LjV2MTBoLTQuOFYxOC42%0D%0AaDQuM2wwLjMsMi42YzEuOS0xLjksNC0yLjksNi40LTIuOQoJCQljNC42LDAsOC4zLDMuNCw4LjMs%0D%0AOS42djEwLjNMMTU4LjgsMzguM0wxNTguOCwzOC4zeiIvPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxw%0D%0AYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNzIsMzAuMmMwLjMsMi40LDIuNCw0LjIsNS44LDQuMmMxLjgs%0D%0AMCw0LjEtMC43LDUuMi0xLjhsMy4xLDMuMWMtMi4xLDIuMi01LjUsMy4xLTguNCwzLjEKCQkJCWMt%0D%0ANi43LDAtMTAuOC00LjItMTAuOC0xMC40YzAtNS45LDQtMTAuMywxMC40LTEwLjNjNi41LDAsMTAu%0D%0ANiw0LDkuOSwxMi4xTDE3MiwzMC4yTDE3MiwzMC4yeiBNMTgyLjcsMjYuMgoJCQkJYy0wLjMtMi41%0D%0ALTIuMy0zLjgtNS4xLTMuOGMtMi42LDAtNC44LDEuMy01LjUsMy44SDE4Mi43eiIvPgoJCQk8cGF0%0D%0AaCBjbGFzcz0ic3QwIiBkPSJNMTk1LjYsMTguN2wwLjQsMi4yYzEuNS0yLjQsMy41LTIuOCw1LjUt%0D%0AMi44czQsMC44LDUsMS45bC0yLjIsNC4yYy0xLTAuOC0xLjktMS4zLTMuNS0xLjMKCQkJCWMtMi41%0D%0ALDAtNC45LDEuMy00LjksNC45djEwLjNIMTkxVjE4LjdIMTk1LjZ6Ii8+CgkJCTxwYXRoIGNsYXNz%0D%0APSJzdDAiIGQ9Ik0yMTcuNiwxOC4zYzYuMiwwLDEwLjMsNC42LDEwLjMsMTAuMnMtMy44LDEwLjIt%0D%0AMTAuMiwxMC4ycy0xMC4yLTQuNi0xMC4yLTEwLjJTMjExLjMsMTguMywyMTcuNiwxOC4zegoJCQkJ%0D%0AIE0yMTcuNiwyMi43Yy0zLjUsMC01LjMsMi44LTUuMyw1LjhzMS44LDUuOCw1LjMsNS44czUuMy0y%0D%0ALjgsNS4zLTUuOEMyMjIuOSwyNS42LDIyMC45LDIyLjcsMjE3LjYsMjIuN3ogTTIyMy45LDEwLjNo%0D%0ALTUuNwoJCQkJbC0yLjksNS40djAuMmg0LjNsNC4zLTUuNUwyMjMuOSwxMC4zTDIyMy45LDEwLjN6%0D%0AIi8+CgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMzcuNiwxMy4xdjUuNWg1LjR2NC4yaC01LjV2%0D%0AOC41YzAsMS45LDEsMi44LDIuNSwyLjhjMC43LDAsMS42LTAuMiwyLjMtMC42bDEuMyw0LjEKCQkJ%0D%0ACWMtMS40LDAuNS0yLjUsMC44LTQsMC44Yy00LjMsMC4yLTctMi4yLTctNy4xdi04LjVoLTMuNXYt%0D%0ANC4yaDMuN3YtNUwyMzcuNiwxMy4xeiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjUxLjks%0D%0AMTMuMWMwLDMuNy01LjcsMy43LTUuNywwUzI1MS45LDkuNCwyNTEuOSwxMy4xeiBNMjQ2LjYsMTgu%0D%0ANnYxOS42aDQuOVYxOC42SDI0Ni42eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjcyLjYs%0D%0AMzUuOGMtMi4zLDIuMi00LjYsMy4xLTcuNiwzLjFjLTUuNywwLTEwLjQtMy40LTEwLjQtMTAuM3M0%0D%0ALjctMTAuMywxMC40LTEwLjNjMi44LDAsNC45LDAuOCw3LDIuOQoJCQkJbC0zLjEsMy4yYy0xLjEt%0D%0AMS0yLjUtMS42LTMuOS0xLjZjLTMuMiwwLTUuNiwyLjQtNS42LDUuOGMwLDMuNywyLjUsNS43LDUu%0D%0ANSw1LjdjMS42LDAsMy4xLTAuNCw0LjMtMS42TDI3Mi42LDM1Ljh6Ii8+CgkJCTxwYXRoIGNsYXNz%0D%0APSJzdDAiIGQ9Ik0yOTQuNywyOC41YzAsNS42LTMuOCwxMC4yLTEwLjIsMTAuMnMtMTAuMi00LjYt%0D%0AMTAuMi0xMC4yczMuOS0xMC4yLDEwLjEtMTAuMlMyOTQuNywyMi45LDI5NC43LDI4LjV6CgkJCQkg%0D%0ATTI3OS4xLDI4LjVjMCwzLDEuOCw1LjgsNS4zLDUuOHM1LjMtMi44LDUuMy01LjhjMC0yLjktMi4x%0D%0ALTUuOC01LjMtNS44QzI4MC45LDIyLjcsMjc5LjEsMjUuNiwyNzkuMSwyOC41eiIvPgoJCQk8cGF0%0D%0AaCBjbGFzcz0ic3QwIiBkPSJNMzEwLjgsMjMuOWMtMS40LTEuMy0zLTEuNy00LjktMS43Yy0yLjMs%0D%0AMC0zLjYsMC43LTMuNiwxLjljMCwxLjMsMS4xLDEuOSwzLjcsMi4yYzMuNywwLjIsOC40LDEsOC40%0D%0ALDYuMwoJCQkJYzAsMy40LTIuOCw2LjQtOC40LDYuNGMtMy4xLDAtNi4yLTAuNS05LjEtMy41bDIu%0D%0ANC0zLjRjMS40LDEuNiw0LjYsMi43LDYuNywyLjhjMS44LDAuMSwzLjUtMC45LDMuNS0yLjNjMC0x%0D%0ALjMtMS4xLTEuOS0zLjktMi4xCgkJCQljLTMuNy0wLjMtOC4xLTEuNi04LjEtNi4xczQuNy02LjEs%0D%0AOC4yLTYuMWMzLjEsMCw1LjQsMC42LDcuNiwyLjVMMzEwLjgsMjMuOXoiLz4KCQk8L2c+Cgk8L2c+%0D%0ACgk8ZyBpZD0iaWNvbm8iPgoJCTxwYXRoIGQ9Ik02OS40LDM3LjhjLTQuNi0wLjItOS43LTAuNC0x%0D%0ANC42LTJjLTIuMi0wLjctNC0xLjktNS41LTMuN2MtMS42LTEuOS0wLjgtNC44LDEuNS01LjZjMS4y%0D%0ALTAuNCwyLjQtMC40LDMuNi0wLjEKCQkJYzAuOSwwLjIsMS0wLjEsMS4xLTAuOGMwLjMtMiwwLjIt%0D%0ANC4xLDAuNC02LjFjMC4yLTMuNywyLTYuMyw1LjYtNy40YzQuOS0xLjcsOS45LTEuOCwxNC44LTAu%0D%0AM2M0LDEuMiw1LjgsMy43LDYuMSw4LjMKCQkJYzAuMSwxLjcsMC4yLDMuNSwwLjMsNS4yYzAuMSwx%0D%0ALjEsMC4xLDEuMSwxLjMsMWMyLjMtMC40LDQuMywwLjQsNS41LDIuMmMwLjcsMS4xLDAuNywyLjIs%0D%0AMC4xLDMuNGMtMC44LDEuNi0yLjMsMi43LTMuOSwzLjQKCQkJYy0yLjUsMS4xLTUuMSwxLjYtNy43%0D%0ALDJDNzUuMywzNy43LDcyLjYsMzcuOCw2OS40LDM3Ljh6Ii8+CgkJPHBhdGggZD0iTTU1LjcsNDUu%0D%0AMmMtMC4zLDAuNC0wLjcsMC40LTEuMSwwLjRjLTAuNywwLjEtMS4yLDAuNC0xLjEsMS4yYzAuMSww%0D%0ALjcsMC40LDEuMywxLjMsMS41YzAuNiwwLjEsMS4yLTAuMSwxLjgtMC4yCgkJCWMxLjQtMC41LDIu%0D%0ANy0xLjQsMy44LTIuNGMxLTAuOCwxLjktMS42LDMuMS0yLjJjMS42LTAuOSwzLjMtMSw1LTAuMmMw%0D%0ALjQsMC4yLDAuNywwLjIsMS4xLDBjMi0xLDQtMC43LDUuOSwwLjQKCQkJYzEuNywxLDMuMSwyLjMs%0D%0ANC43LDMuNGMwLjUsMC40LDEuMSwwLjgsMS44LDEuMWMxLjEsMC40LDIuMSwwLjEsMi44LTAuOGMw%0D%0ALjQtMC43LDAuMy0xLjMtMC40LTEuNmMtMC4yLTAuMS0wLjUtMC4xLTAuOC0wLjEKCQkJYy0wLjIt%0D%0AMC4xLTAuNC0wLjItMC43LTAuMmMwLjQtMC43LDEtMC44LDEuNy0wLjZjMS4zLDAuNSwyLDEuNCwy%0D%0ALjIsMi43YzAuMiwxLjItMC40LDIuMi0xLjMsMi44Yy0xLjYsMS4yLTMuNCwxLjYtNS4yLDEuNwoJ%0D%0ACQljLTMuMSwwLjMtNi4xLDAuMi04LjktMS4yYy0xLjYtMC44LTIuOC0wLjktNC4zLDAuMmMtMSww%0D%0ALjgtMi41LDAuOC0zLjksMWMtMi45LDAuMy01LjgsMC4xLTguNi0xYy0xLjItMC41LTIuMi0xLjIt%0D%0AMi42LTIuNQoJCQljLTAuMy0xLDAuMi0yLjUsMS4yLTMuM0M1My45LDQ0LjcsNTQuOCw0NC42LDU1%0D%0ALjcsNDUuMnoiLz4KCTwvZz4KPC9nPgo8ZyBpZD0iTGF5ZXJfNCI+CjwvZz4KPGc+Cgk8cGF0aCBk%0D%0APSJNMTcyLjksNTAuMWgtM2wtMSwyaC0xLjVsNC4zLTguNWgxLjRsMS43LDguNWgtMS41TDE3Mi45%0D%0ALDUwLjF6IE0xNzAuNSw0OC45aDIuMmwtMC42LTMuNGwwLDBMMTcwLjUsNDguOXoiLz4KCTxwYXRo%0D%0AIGQ9Ik0xNzksNDYuNmMwLjMtMC4zLDAuNi0wLjYsMC45LTAuN3MwLjctMC4zLDEuMS0wLjNjMC42%0D%0ALDAsMS4xLDAuMiwxLjQsMC42czAuNCwxLDAuMywxLjlsLTAuNiwzLjloLTEuNGwwLjYtMy45CgkJ%0D%0AYzAuMS0wLjUsMC0wLjktMC4xLTEuMXMtMC40LTAuMy0wLjgtMC4zYy0wLjMsMC0wLjYsMC4xLTAu%0D%0AOCwwLjJzLTAuNCwwLjMtMC42LDAuNWwtMC43LDQuNmgtMS40bDAuOS02LjNoMS4zTDE3OSw0Ni42%0D%0AeiIvPgoJPHBhdGggZD0iTTE4OS4xLDUyLjF2LTAuOWMtMC4yLDAuMy0wLjUsMC42LTAuOSwwLjhz%0D%0ALTAuNywwLjMtMS4xLDAuM2MtMC43LDAtMS4xLTAuMi0xLjUtMC43cy0wLjQtMS4xLTAuMy0yLjFs%0D%0AMC42LTMuN2gxLjQKCQlsLTAuNiwzLjdjLTAuMSwwLjYtMC4xLDEsMC4xLDEuM3MwLjQsMC4zLDAu%0D%0AOCwwLjNjMC4zLDAsMC42LTAuMSwwLjktMC4yczAuNS0wLjMsMC42LTAuNmwwLjctNC42aDEuNGwt%0D%0AMC45LDYuM2gtMS4yVjUyLjF6Ii8+Cgk8cGF0aCBkPSJNMTk1LjUsNDYuNmMwLjMtMC4zLDAuNi0w%0D%0ALjYsMC45LTAuN3MwLjctMC4zLDEuMS0wLjNjMC42LDAsMS4xLDAuMiwxLjQsMC42czAuNCwxLDAu%0D%0AMywxLjlsLTAuNiwzLjloLTEuNGwwLjYtMy45CgkJYzAuMS0wLjUsMC0wLjktMC4xLTEuMXMtMC40%0D%0ALTAuMy0wLjgtMC4zYy0wLjMsMC0wLjYsMC4xLTAuOCwwLjJzLTAuNCwwLjMtMC42LDAuNWwtMC43%0D%0ALDQuNmgtMS40bDAuOS02LjNoMS4zTDE5NS41LDQ2LjZ6Ii8+Cgk8cGF0aCBkPSJNMjA0LjIsNTEu%0D%0AMWMwLjMsMCwwLjYtMC4xLDAuOS0wLjNzMC40LTAuNSwwLjUtMC44aDEuM2wwLDBjLTAuMSwwLjYt%0D%0AMC40LDEuMS0wLjksMS42cy0xLjIsMC42LTEuOSwwLjYKCQljLTAuOSwwLTEuNS0wLjMtMi0wLjlz%0D%0ALTAuNi0xLjQtMC40LTIuM3YtMC4yYzAuMS0wLjksMC41LTEuNywxLjEtMi4zczEuMy0wLjksMi4y%0D%0ALTAuOWMwLjcsMCwxLjMsMC4yLDEuNywwLjdzMC42LDEsMC40LDEuN2wwLDAKCQloLTEuM2MwLjEt%0D%0AMC40LDAtMC43LTAuMi0wLjlzLTAuNC0wLjQtMC44LTAuNGMtMC41LDAtMC45LDAuMi0xLjIsMC42%0D%0Acy0wLjUsMC45LTAuNiwxLjR2MC4yYy0wLjEsMC42LTAuMSwxLjEsMC4xLDEuNQoJCVMyMDMuNyw1%0D%0AMS4xLDIwNC4yLDUxLjF6Ii8+Cgk8cGF0aCBkPSJNMjEwLjcsNTIuMWgtMS40bDAuOS02LjNoMS40%0D%0ATDIxMC43LDUyLjF6IE0yMTEuOSw0NC4yaC0xLjRsMC4yLTEuMmgxLjRMMjExLjksNDQuMnoiLz4K%0D%0ACTxwYXRoIGQ9Ik0yMTQsNDguOWMwLjEtMSwwLjUtMS44LDEuMS0yLjNzMS40LTAuOSwyLjMtMC45%0D%0AYzAuOSwwLDEuNSwwLjMsMiwwLjlzMC42LDEuNCwwLjUsMi4zVjQ5Yy0wLjIsMS0wLjUsMS44LTEu%0D%0AMSwyLjQKCQlzLTEuNCwwLjktMi4zLDAuOWMtMC45LDAtMS41LTAuMy0yLTAuOXMtMC42LTEuNC0w%0D%0ALjUtMi4zVjQ4Ljl6IE0yMTUuNCw0OWMtMC4xLDAuNi0wLjEsMS4xLDAuMSwxLjVzMC41LDAuNiwx%0D%0ALDAuNnMwLjktMC4yLDEuMi0wLjYKCQlzMC41LTAuOSwwLjYtMS41di0wLjFjMC4xLTAuNiwwLTEu%0D%0AMS0wLjEtMS41cy0wLjUtMC42LTEtMC42cy0wLjksMC4yLTEuMiwwLjZTMjE1LjUsNDguMywyMTUu%0D%0ANCw0OUwyMTUuNCw0OXoiLz4KCTxwYXRoIGQ9Ik0yMjUuOCw1MC40YzAtMC4yLDAtMC40LTAuMi0w%0D%0ALjVzLTAuNS0wLjMtMS0wLjRjLTAuNy0wLjItMS4zLTAuNC0xLjYtMC43cy0wLjUtMC43LTAuNC0x%0D%0ALjJjMC4xLTAuNiwwLjQtMSwwLjktMS40CgkJczEuMS0wLjYsMS45LTAuNmMwLjcsMCwxLjMsMC4y%0D%0ALDEuNywwLjZzMC42LDAuOSwwLjUsMS40bDAsMGgtMS40YzAtMC4zLDAtMC41LTAuMi0wLjdzLTAu%0D%0ANC0wLjMtMC44LTAuM2MtMC4zLDAtMC42LDAuMS0wLjgsMC4yCgkJcy0wLjMsMC4zLTAuNCwwLjZz%0D%0AMCwwLjQsMC4yLDAuNXMwLjUsMC4yLDEsMC4zYzAuOCwwLjIsMS4zLDAuNCwxLjcsMC43czAuNSww%0D%0ALjcsMC40LDEuMmMtMC4xLDAuNi0wLjQsMS4xLTAuOSwxLjQKCQlzLTEuMiwwLjUtMS45LDAuNWMt%0D%0AMC44LDAtMS40LTAuMi0xLjgtMC42cy0wLjYtMC45LTAuNS0xLjRsMCwwaDEuM2MwLDAuNCwwLjEs%0D%0AMC42LDAuMywwLjhzMC41LDAuMywwLjksMC4zczAuNi0wLjEsMC45LTAuMgoJCVMyMjUuOCw1MC42%0D%0ALDIyNS44LDUwLjR6Ii8+Cgk8cGF0aCBkPSJNMjQwLjksNDkuM0wyNDAuOSw0OS4zYy0wLjEsMC45%0D%0ALTAuNSwxLjYtMS4xLDIuMXMtMS41LDAuOC0yLjQsMC44Yy0xLDAtMS43LTAuMy0yLjItMXMtMC43%0D%0ALTEuNS0wLjYtMi42bDAuMi0xLjYKCQljMC4yLTEuMSwwLjYtMS45LDEuMy0yLjZzMS42LTEsMi41%0D%0ALTFjMSwwLDEuNywwLjMsMi4yLDAuOHMwLjcsMS4yLDAuNiwyLjFsMCwwSDI0MGMwLjEtMC42LDAt%0D%0AMS0wLjMtMS4zcy0wLjctMC40LTEuMy0wLjQKCQlzLTEsMC4yLTEuNSwwLjdzLTAuNywxLTAuOCwx%0D%0ALjdsLTAuMiwxLjZjLTAuMSwwLjcsMCwxLjMsMC4yLDEuOHMwLjcsMC43LDEuMywwLjdzMS0wLjIs%0D%0AMS40LTAuNXMwLjYtMC43LDAuNy0xLjNIMjQwLjl6Ii8+Cgk8cGF0aCBkPSJNMjQ0LjcsNTIuMWgt%0D%0AMS40bDEuNC05LjFoMS40TDI0NC43LDUyLjF6Ii8+Cgk8cGF0aCBkPSJNMjUxLjUsNTIuMWMwLTAu%0D%0AMiwwLTAuMy0wLjEtMC41czAtMC4zLDAtMC41Yy0wLjIsMC4zLTAuNSwwLjUtMC45LDAuN3MtMC43%0D%0ALDAuMy0xLjEsMC4zYy0wLjYsMC0xLjEtMC4yLTEuNC0wLjUKCQlzLTAuNC0wLjgtMC4zLTEuNGMw%0D%0ALjEtMC42LDAuNC0xLjEsMC45LTEuNXMxLjItMC41LDIuMS0wLjVoMS4xbDAuMS0wLjZjMC4xLTAu%0D%0AMywwLTAuNi0wLjItMC44cy0wLjQtMC4zLTAuOC0wLjMKCQljLTAuMywwLTAuNiwwLjEtMC44LDAu%0D%0AMnMtMC4zLDAuNC0wLjQsMC42aC0xLjRsMCwwYzAuMS0wLjUsMC4zLTEsMC45LTEuM3MxLjItMC42%0D%0ALDEuOS0wLjZzMS4zLDAuMiwxLjcsMC42czAuNiwwLjksMC41LDEuNgoJCWwtMC40LDIuOGMwLDAu%0D%0AMy0wLjEsMC41LTAuMSwwLjhzMCwwLjUsMC4xLDAuN2gtMS40VjUyLjF6IE0yNDkuOSw1MS4xYzAu%0D%0AMywwLDAuNy0wLjEsMS0wLjNzMC41LTAuNCwwLjctMC42bDAuMS0wLjloLTEuMQoJCWMtMC40LDAt%0D%0AMC43LDAuMS0xLDAuM3MtMC40LDAuNC0wLjUsMC43YzAsMC4zLDAsMC40LDAuMSwwLjZTMjQ5LjYs%0D%0ANTEuMSwyNDkuOSw1MS4xeiIvPgoJPHBhdGggZD0iTTI1OS41LDUwLjRjMC0wLjIsMC0wLjQtMC4y%0D%0ALTAuNXMtMC41LTAuMy0xLTAuNGMtMC43LTAuMi0xLjMtMC40LTEuNi0wLjdzLTAuNS0wLjctMC40%0D%0ALTEuMmMwLjEtMC42LDAuNC0xLDAuOS0xLjQKCQlzMS4xLTAuNiwxLjktMC42YzAuNywwLDEuMyww%0D%0ALjIsMS43LDAuNnMwLjYsMC45LDAuNSwxLjRsMCwwaC0xLjRjMC0wLjMsMC0wLjUtMC4yLTAuN3Mt%0D%0AMC40LTAuMy0wLjgtMC4zYy0wLjMsMC0wLjYsMC4xLTAuOCwwLjIKCQlzLTAuMywwLjMtMC40LDAu%0D%0ANnMwLDAuNCwwLjIsMC41czAuNSwwLjIsMSwwLjNjMC44LDAuMiwxLjMsMC40LDEuNywwLjdzMC41%0D%0ALDAuNywwLjQsMS4yYy0wLjEsMC42LTAuNCwxLjEtMC45LDEuNAoJCXMtMS4yLDAuNS0xLjksMC41%0D%0AYy0wLjgsMC0xLjQtMC4yLTEuOC0wLjZzLTAuNi0wLjktMC41LTEuNGwwLDBoMS4zYzAsMC40LDAu%0D%0AMSwwLjYsMC4zLDAuOHMwLjUsMC4zLDAuOSwwLjNzMC42LTAuMSwwLjktMC4yCgkJUzI1OS41LDUw%0D%0ALjYsMjU5LjUsNTAuNHoiLz4KCTxwYXRoIGQ9Ik0yNjQuOSw1Mi4xaC0xLjRsMC45LTYuM2gxLjRM%0D%0AMjY0LjksNTIuMXogTTI2Niw0NC4yaC0xLjRsMC4yLTEuMmgxLjRMMjY2LDQ0LjJ6Ii8+Cgk8cGF0%0D%0AaCBkPSJNMjY4LjMsNTIuMWwwLjgtNS4zaC0xbDAuMi0xLjFoMWwwLjEtMC41YzAuMS0wLjgsMC40%0D%0ALTEuNCwwLjktMS44czEuMi0wLjYsMi0wLjZjMC4zLDAsMC41LDAsMC44LDAuMXMwLjYsMC4xLDAu%0D%0AOSwwLjMKCQlsLTAuNCwxLjJjLTAuMi0wLjEtMC41LTAuMS0wLjctMC4ycy0wLjUtMC4xLTAuOC0w%0D%0ALjFjLTAuNCwwLTAuNywwLjEtMSwwLjNzLTAuNCwwLjUtMC40LDAuOGwtMC4xLDAuNWgxLjJsLTAu%0D%0AMiwxLjFoLTEuMmwtMC44LDUuMwoJCUgyNjguM3ogTTI3My4zLDUyLjFoLTEuNGwwLjktNi4zaDEu%0D%0ANEwyNzMuMyw1Mi4xeiIvPgoJPHBhdGggZD0iTTI3OS4xLDUxLjFjMC4zLDAsMC42LTAuMSwwLjkt%0D%0AMC4zczAuNC0wLjUsMC41LTAuOGgxLjNsMCwwYy0wLjEsMC42LTAuNCwxLjEtMC45LDEuNnMtMS4y%0D%0ALDAuNi0xLjksMC42CgkJYy0wLjksMC0xLjUtMC4zLTItMC45cy0wLjYtMS40LTAuNC0yLjN2LTAu%0D%0AMmMwLjEtMC45LDAuNS0xLjcsMS4xLTIuM3MxLjMtMC45LDIuMi0wLjljMC43LDAsMS4zLDAuMiwx%0D%0ALjcsMC43czAuNiwxLDAuNCwxLjdsMCwwCgkJaC0xLjNjMC4xLTAuNCwwLTAuNy0wLjItMC45cy0w%0D%0ALjQtMC40LTAuOC0wLjRjLTAuNSwwLTAuOSwwLjItMS4yLDAuNnMtMC41LDAuOS0wLjYsMS40djAu%0D%0AMmMtMC4xLDAuNi0wLjEsMS4xLDAuMSwxLjUKCQlTMjc4LjUsNTEuMSwyNzkuMSw1MS4xeiIvPgoJ%0D%0APHBhdGggZD0iTTI4Ny44LDUyLjFjMC0wLjIsMC0wLjMtMC4xLTAuNXMwLTAuMywwLTAuNWMtMC4y%0D%0ALDAuMy0wLjUsMC41LTAuOSwwLjdzLTAuNywwLjMtMS4xLDAuM2MtMC42LDAtMS4xLTAuMi0xLjQt%0D%0AMC41CgkJcy0wLjQtMC44LTAuMy0xLjRjMC4xLTAuNiwwLjQtMS4xLDAuOS0xLjVzMS4yLTAuNSwy%0D%0ALjEtMC41aDEuMWwwLjEtMC42YzAuMS0wLjMsMC0wLjYtMC4yLTAuOHMtMC40LTAuMy0wLjgtMC4z%0D%0ACgkJYy0wLjMsMC0wLjYsMC4xLTAuOCwwLjJzLTAuMywwLjQtMC40LDAuNmgtMS40bDAsMGMwLjEt%0D%0AMC41LDAuMy0xLDAuOS0xLjNzMS4yLTAuNiwxLjktMC42YzAuNywwLDEuMywwLjIsMS43LDAuNnMw%0D%0ALjYsMC45LDAuNSwxLjYKCQlsLTAuNCwyLjhjMCwwLjMtMC4xLDAuNS0wLjEsMC44czAsMC41LDAu%0D%0AMSwwLjdoLTEuNFY1Mi4xeiBNMjg2LjIsNTEuMWMwLjMsMCwwLjctMC4xLDEtMC4zczAuNS0wLjQs%0D%0AMC43LTAuNmwwLjEtMC45aC0xLjEKCQljLTAuNCwwLTAuNywwLjEtMSwwLjNzLTAuNCwwLjQtMC41%0D%0ALDAuN2MwLDAuMywwLDAuNCwwLjEsMC42UzI4NS45LDUxLjEsMjg2LjIsNTEuMXoiLz4KCTxwYXRo%0D%0AIGQ9Ik0yOTIuMiw0OWMwLjItMSwwLjUtMS45LDEtMi41czEuMi0wLjksMi0wLjljMC4zLDAsMC42%0D%0ALDAuMSwwLjksMC4yczAuNSwwLjQsMC42LDAuNmwwLjUtMy41aDEuNGwtMS40LDkuMUgyOTZ2LTAu%0D%0AOAoJCWMtMC4zLDAuMy0wLjUsMC41LTAuOCwwLjdzLTAuNywwLjItMSwwLjJjLTAuNywwLTEuMy0w%0D%0ALjMtMS43LTAuOVMyOTIsNDkuOSwyOTIuMiw0OUwyOTIuMiw0OXogTTI5My42LDQ5LjEKCQljLTAu%0D%0AMSwwLjYtMC4xLDEuMSwwLjEsMS40czAuNSwwLjUsMSwwLjVjMC4zLDAsMC41LTAuMSwwLjgtMC4y%0D%0AczAuNC0wLjMsMC42LTAuNmwwLjQtMi44Yy0wLjEtMC4yLTAuMi0wLjQtMC40LTAuNQoJCXMtMC40%0D%0ALTAuMi0wLjctMC4yYy0wLjUsMC0wLjgsMC4yLTEuMiwwLjZzLTAuNSwwLjktMC42LDEuNkwyOTMu%0D%0ANiw0OS4xeiIvPgoJPHBhdGggZD0iTTMwMC40LDQ4LjljMC4xLTEsMC41LTEuOCwxLjEtMi4zczEu%0D%0ANC0wLjksMi4zLTAuOXMxLjUsMC4zLDIsMC45czAuNiwxLjQsMC41LDIuM1Y0OWMtMC4yLDEtMC41%0D%0ALDEuOC0xLjEsMi40CgkJcy0xLjQsMC45LTIuMywwLjlzLTEuNS0wLjMtMi0wLjlzLTAuNi0xLjQt%0D%0AMC41LTIuM1Y0OC45eiBNMzAxLjgsNDljLTAuMSwwLjYtMC4xLDEuMSwwLjEsMS41czAuNSwwLjYs%0D%0AMSwwLjZzMC45LTAuMiwxLjItMC42CgkJczAuNS0wLjksMC42LTEuNXYtMC4xYzAuMS0wLjYsMC0x%0D%0ALjEtMC4xLTEuNXMtMC41LTAuNi0xLTAuNnMtMC45LDAuMi0xLjIsMC42UzMwMS45LDQ4LjMsMzAx%0D%0ALjgsNDlMMzAxLjgsNDl6Ii8+Cgk8cGF0aCBkPSJNMzEyLjMsNTAuNGMwLTAuMiwwLTAuNC0wLjIt%0D%0AMC41cy0wLjUtMC4zLTEtMC40Yy0wLjctMC4yLTEuMy0wLjQtMS42LTAuN3MtMC41LTAuNy0wLjQt%0D%0AMS4yYzAuMS0wLjYsMC40LTEsMC45LTEuNAoJCXMxLjEtMC42LDEuOS0wLjZjMC43LDAsMS4zLDAu%0D%0AMiwxLjcsMC42czAuNiwwLjksMC41LDEuNGwwLDBoLTEuNGMwLTAuMywwLTAuNS0wLjItMC43cy0w%0D%0ALjQtMC4zLTAuOC0wLjNjLTAuMywwLTAuNiwwLjEtMC44LDAuMgoJCXMtMC4zLDAuMy0wLjQsMC42%0D%0AczAsMC40LDAuMiwwLjVzMC41LDAuMiwxLDAuM2MwLjgsMC4yLDEuMywwLjQsMS43LDAuN3MwLjUs%0D%0AMC43LDAuNCwxLjJjLTAuMSwwLjYtMC40LDEuMS0wLjksMS40UzMxMS43LDUyLDMxMSw1MgoJCWMt%0D%0AMC44LDAtMS40LTAuMi0xLjgtMC42cy0wLjYtMC45LTAuNS0xLjRsMCwwaDEuM2MwLDAuNCwwLjEs%0D%0AMC42LDAuMywwLjhzMC41LDAuMywwLjksMC4zczAuNi0wLjEsMC45LTAuMlMzMTIuMiw1MC42LDMx%0D%0AMi4zLDUwLjR6IgoJCS8+CjwvZz4KPC9zdmc+Cg==" alt="Logo" title="Logo" style="height:60px" /><br><br><h1 style="color: #656565; font-family: inherit; font-size: 18px">Esta es tu nueva contraseña, guardala bien ;) <br><br> Puedes cambiarla cuando quieras en Opciones de Perfil</h1><br><br><label style="padding:20px; background: #b804ef; border:none; border-radius: 15pt; box-shadow: -1px 9px 21px -10px rgba(0,0,0,0.51); color: white; font-size: 25px; text-decoration: none; margin-top: 20px">'+pass+'</label></div><br><br>'
        }).then(
            message => console.log(message)
        );
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

    $("#imgLogin").click(function(){
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