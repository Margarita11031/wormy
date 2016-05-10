/**
 * Created by Margarita on 10.05.2016.
 */

var MenuOpened = false;
function CallMenu_void() {
    if (!MenuOpened) {
        document.getElementById("callMenu").setAttribute("src", "img/icon_back.png");
        OpenMenu_void();
        MenuOpened = true;
    } else {
        document.getElementById("callMenu").setAttribute("src", "img/icon_menu.png");
        CloseMenu_void();
        MenuOpened = false;
    }

}


function OpenMenu_void() {

    //document.getElementById("GameStatus").setAttribute("width", "SetOnClickDirection_str(event)");


    var nbrDocWidth = parseInt(document.body.clientWidth);
    var nbrWidth = Math.round(nbrDocWidth * 0.2);
    var nbrCurWidth = 1;
    var openMenu = window.setInterval(function () {
        document.getElementById("GameStatus").style.left = nbrDocWidth - nbrCurWidth + "px";

        nbrCurWidth++;
        if (nbrCurWidth >= nbrWidth) {
            clearInterval(openMenu);
        }
    }, 5);
}

function CloseMenu_void() {
    var nbrWidth = parseInt(document.getElementById("GameStatus").offsetLeft);
    var nbrDocWidth = parseInt(document.body.clientWidth);
    var closeMenu = window.setInterval(function () {
        document.getElementById("GameStatus").style.left = nbrWidth + "px";

        nbrWidth++;
        if (nbrWidth >= nbrDocWidth) {
            clearInterval(closeMenu);
        }
    }, 5);
}