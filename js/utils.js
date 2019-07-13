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

if (localStorage.getItem("userLogin") == null) {
    localStorage.setItem('userLogin', false);
}

if (localStorage.getItem("userLogin") === "true") {
    menuLogin();
} else {
    menuLogout();
}

function logout() {
    $.post(urlProyect() + "c_app/logout", {}, function (data) {
        toastr.success(data.message);
        localStorage.setItem('userLogin', false);
        menuLogout();
        $(location).attr('href', urlProyectShort());
    }, "json"); //post
}

$("#btnPanel").click(function () {
    if (localStorage.getItem("userLogin") === "false") {
        $(location).attr('href', urlProyect() + 'c_app/vstLogin');
    } else {
        $(location).attr('href', urlProyect() + 'c_app/vstUsuario');
    }
});

$("#btnSalir").click(function () {
    logout();
});

$("#divColLogo").click(function () {
    $(location).attr('href', urlProyectShort());
});

function urlProyect() {
    return "/don/index.php/";
}

function urlProyectShort() {
    return "/don/";
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
    $("#btnSalir").removeClass("displayNone");
    $("#btnSalir").addClass("displayBlock");
}

function menuLogout() {
    $("#btnSalir").removeClass("displayBlock");
    $("#btnSalir").addClass("displayNone");
}


$("input[data-type='currency']").on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this), "blur");
    }
});


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