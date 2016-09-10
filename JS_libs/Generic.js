//general
var pause = false;
var blnInitGame = false;
var canvas, ctx;


function ResizeField() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function LoadDocu(text) {
    window.scrollTo(0, 1);
    canvas = document.getElementById("fieldForSnake");
    ctx = canvas.getContext('2d');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    document.getElementById("customMessage").innerHTML = "<p id='messageText'>" + text + "</p>";
    window.setTimeout(Statistics.IncreaseTimer_void(), 1000);
}


function StartGame() {
    Statistics.Clear_void();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("customMessage").innerHTML = "";
    CreateFruit();

    objWorm.tblPos = [[130, 32, objWorm.nbrRadHead, "R"], [82, 32, objWorm.nbrRadBody, "R"], [44, 32, objWorm.nbrRadBody, "R"], [14, 32, objWorm.nbrRadTail, "R"]];
    DrawWorm();
    Statistics.GetWormLen_void();
    Statistics.GetSpeed_void();

    document.getElementsByTagName("body")[0].removeAttribute("onkeydown");
    document.getElementsByTagName("body")[0].removeAttribute("onclick");
    blnInitGame = true;
    ActivateMove_void();
}

function ActivateMove_void(){
    if(pause || !blnInitGame){
        document.getElementsByTagName("body")[0].removeAttribute("onkeydown");
        document.getElementById("naviLeft").removeAttribute("onclick");
        document.getElementById("naviLeft").style.display = 'none';
        document.getElementById("naviTop").removeAttribute("onclick");
        document.getElementById("naviTop").style.display = 'none';
        document.getElementById("naviRight").removeAttribute("onclick");
        document.getElementById("naviRight").style.display = 'none';
        document.getElementById("naviBottom").removeAttribute("onclick");
        document.getElementById("naviBottom").style.display = 'none';

    }else{
        document.getElementsByTagName("body")[0].setAttribute("onkeydown", "SetDirection_str(event)");
        document.getElementById("naviLeft").setAttribute("onclick", 'ChangeDirection_void("L")');
        document.getElementById("naviLeft").style.display = 'block';
        document.getElementById("naviTop").setAttribute("onclick", 'ChangeDirection_void("U")');
        document.getElementById("naviTop").style.display = 'block';
        document.getElementById("naviRight").setAttribute("onclick", 'ChangeDirection_void("R")');
        document.getElementById("naviRight").style.display = 'block';
        document.getElementById("naviBottom").setAttribute("onclick", 'ChangeDirection_void("D")');
        document.getElementById("naviBottom").style.display = 'block';

    }

}


function Pause() {
    if (blnInitGame) {
        if (!pause) {
            pause = true;
            clearInterval(intervMoweWorm);
        } else {
            pause = false;
            MoveWorm();
        }
    }
}

function CloseWind() {
    window.close();
}

function ShareResults_void() {
    document.getElementById("customMessage").innerHTML = "<p>Length: " + objWorm.tblPos.length + " pieces</p>" +
        "<p>Speed:" + Statistics.intSpeed + " px/sec</p>" +
        "<p id='messageText'>Share your result</p>" +
        "<img class='icon' id='facebook' src='img/icon_facebook.png' alt='facebook' onclick='ShareOnFacebook_void()'/>" + " " +
        "<img class='icon' id='twitter' src='img/icon_twitter.png' alt='twitter'/>" + " " +
        "<img class='icon' id='google' src='img/icon_google.png' alt='google'/>";

}








