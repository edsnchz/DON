toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

if (typeof loginBack !== "undefined") {
    if (loginBack == false) {
        localStorage.setItem('userLogin', false);
    }
}

if (localStorage.getItem("userLogin") == null) {
    localStorage.setItem('userLogin', false);
}

if (localStorage.getItem("userLogin") === "true") {
    menuLogin();
} else {
    menuLogout();
}

if (localStorage.getItem("userLogin") !== "true") {
    if(localStorage.getItem("userAccess") != null) {
        let decrypted = CryptoJS.AES.decrypt(localStorage.getItem("userAccess"), "userAccess").toString(CryptoJS.enc.Utf8);
        let res = decrypted.split("&");
        autoLogin(res[0], res[1]);
    }   
}

function logout() {
    $.post(urlProyect() + "c_app/logout", {}, function (data) {
        toastr.success(data.message);
        localStorage.setItem('userLogin', false);
        localStorage.removeItem('userAccess');  
        menuLogout();
        $(location).attr('href', urlProyectShort());
    }, "json"); //post
}

function autoLogin(correo, pass) {
    $.post(urlProyect() + "c_app/login", {
        correo: correo,
        pass: pass
    }, function (data) {
        localStorage.setItem('userLogin', true);
        menuLogin();
    }, "json"); //post
}

$(".btnPanel").click(function () {
    if (localStorage.getItem("userLogin") === "false") {
        $(location).attr('href', urlProyect() + 'c_app/vstLogin');
        localStorage.setItem('urlBeforeLogin', "c_app/vstUsuario?tab=0");
    } else {
        $(location).attr('href', urlProyect() + 'c_app/vstUsuario?tab=0');
    }
});

$(".btnPublicar").click(function () {
    if (localStorage.getItem("userLogin") === "false") {
        $(location).attr('href', urlProyect() + 'c_app/vstLogin');
        localStorage.setItem('urlBeforeLogin', "c_app/vstUsuario?tab=1");
    } else {
        $(location).attr('href', urlProyect() + 'c_app/vstUsuario?tab=1');
    }
});

$(".btnSalir").click(function () {
    logout();
});

$("#btnOpenPanelLateral").click(function () {
    $(this).toggleClass("is-active");
    if($(this).data("open") == "0"){
        $("#divPanelLateral").css({"z-index": "990", "opacity": "1"});
        $("#divPanelLateral ul li a").css({"opacity": "1", "transform": "translateX(0)"}); 
        // BLOCK SCROLLING
        $('html, body').css({overflow: 'hidden',height: '100%'});   
        $(this).data("open", "1")
    }else{
        $("#divPanelLateral").css({"z-index": "-1", "opacity": "0"});
        $("#divPanelLateral ul li a").css({"opacity": "0", "transform": "translateX(0)"});
        // RESTART SCROLLING
        $('html, body').css({overflow: 'auto',height: 'auto'});
        $(this).data("open", "0")
    }
});

$("#divColLogo").on("click", "img", function (event) {
    $(location).attr('href', urlProyectShort());
});

$("#aLinkCondicionesUso").click(function(){
    $(location).attr('href', urlProyect() + 'c_app/vstCondicionesUso');
});

$("#aLinkPoliticaPagos").click(function(){
    $(location).attr('href', urlProyect() + 'c_app/vstPoliticaPagos');
});

$("#aLinkPoliticaPrivacidad").click(function(){
    $(location).attr('href', urlProyect() + 'c_app/vstPoliticaPrivacidad');
});

$("#aLinkContactanos").click(function(){
    $(location).attr('href', urlProyect() + 'c_app/vstContactanos');
});

function urlProyect() {
    return "/index.php/";
}

function urlProyectShort() {
    return "/";
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000) + 500000;
}

function validEmail(string) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(string)) {
        return true;
    } else {
        return false;
    }
}

function menuLogin() {
    $(".btnSalir").removeClass("displayNone");
    $(".btnSalir").addClass("displayBlock");
}

function menuLogout() {
    $(".btnSalir").removeClass("displayBlock");
    $(".btnSalir").addClass("displayNone");
}


$("input[data-type='currency']").on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this), "blur");
    }
});

function formatCurrencyString(string) {
    return "$" + new Intl.NumberFormat("es-ES").format(string);
}

function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
    var input_val = input.val();
    if (input_val === "") { return; }
    var original_len = input_val.length;
    var caret_pos = input.prop("selectionStart");
    if (input_val.indexOf(".") >= 0) {
        var decimal_pos = input_val.indexOf(".");
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);
        left_side = formatNumber(left_side);
        right_side = formatNumber(right_side);

        if (blur === "blur") {
            right_side += "00";
        }

        right_side = right_side.substring(0, 2);

        input_val = "$" + left_side + "." + right_side;

    } else {
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        if (blur === "blur") {
            input_val += ".00";
        }
    }

    input.val(input_val);
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

var reemplazarAcentos = function (cadena) {
    var chars = {
        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
        "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "ñ": "n",
        "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
        "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U", "Ñ": "N"
    }
    var expr = /[áàéèíìóòúùñ]/ig;
    var res = cadena.replace(expr, function (e) { return chars[e] });
    return res;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getBrowserCurrent() {
    rtn = "";
    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        rtn = "opera";
    }
    if (typeof InstallTrigger !== 'undefined') {
        rtn = "firefox";
    }
    if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) {
        rtn = "safari";
    }
    if (/*@cc_on!@*/false || !!document.documentMode) {
        rtn = "ie";
    }
    if (!(/*@cc_on!@*/false || !!document.documentMode) && !!window.StyleMedia) {
        rtn = "edge";
    }
    if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        rtn = "chrome";
    }

    return rtn;
}

function AjaxInsertAud(idAnuncio, tipo) {
    $.ajax({
        url: '../c_app/insertAuditoria',
        type: 'POST',
        dataType: "json",
        data: { idAnuncio: idAnuncio, tipo: tipo }
    });
}

function dateNow() {
    let hoy = new Date();
    let d = hoy.getDate();
    let m = hoy.getMonth() + 1;
    let y = hoy.getFullYear();
    if (d < 10) {
        d = "0" + d;
    }
    if (m < 10) {
        m = "0" + m;
    }
    let data = y + "-" + m + "-" + d;
    return data;
}

function SubDateNow(dias) {
    let hoy = new Date();
    hoy.setDate(hoy.getDate() - dias);
    let d = hoy.getDate();
    let m = hoy.getMonth() + 1;
    let y = hoy.getFullYear();
    if (d < 10) {
        d = "0" + d;
    }
    if (m < 10) {
        m = "0" + m;
    }
    let data = y + "-" + m + "-" + d;
    return data;
}

function isMobileAndTablet() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}


