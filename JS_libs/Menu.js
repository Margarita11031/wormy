/**
 * Created by Margarita on 10.05.2016.
 */

var MenuOpened = false;
function CallMenu_void(event) {
    event.stopPropagation();
    if (!MenuOpened) {
        Pause();
        document.getElementById("callMenu").setAttribute("src", "img/icon_back.png");
        OpenMenu_void();
        MenuOpened = true;
    } else {
        document.getElementById("callMenu").setAttribute("src", "img/icon_menu.png");
        CloseMenu_void();
        MenuOpened = false;
        Pause();
    }
}


function OpenMenu_void() {
    //document.getElementById("GameStatus").setAttribute("width", "SetOnClickDirection_str(event)");
    var nbrDocWidth = parseInt(document.body.clientWidth);
    var nbrWidth = 380;
    var nbrCurWidth = 1;
    var openMenu = window.setInterval(function () {
        document.getElementById("GameStatus").style.left = nbrDocWidth - nbrCurWidth + "px";

        nbrCurWidth = nbrCurWidth+2;
        if (nbrCurWidth >= nbrWidth) {
            clearInterval(openMenu);
        }
    }, 3);
}

function CloseMenu_void() {
    var nbrWidth = parseInt(document.getElementById("GameStatus").offsetLeft);
    var nbrDocWidth = parseInt(document.body.clientWidth);
    var closeMenu = window.setInterval(function () {
        document.getElementById("GameStatus").style.left = nbrWidth + "px";

        nbrWidth = nbrWidth+2;
        if (nbrWidth >= nbrDocWidth) {
            clearInterval(closeMenu);
        }
    }, 3);
}