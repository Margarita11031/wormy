//general
var pause = false;
var blnInitGame = false;
var canvas, ctx;


function ResizeField() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function LoadDocu(text) {
    canvas = document.getElementById("fieldForSnake");
    ctx = canvas.getContext('2d');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    ctx.font = 'oblique 50pt Georgia';
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(text, canvas.width / 2 - 230, canvas.height / 2 - 70);
    //prepare navigation map
    document.getElementById("naviImg").setAttribute("width", canvas.width);
    document.getElementById("naviImg").setAttribute("height", canvas.height);
    document.getElementById("mapLeft").setAttribute("coords", "0,0," + canvas.width / 2 + "," + canvas.height / 2 + ",0," + canvas.height);
    document.getElementById("mapTop").setAttribute("coords", "0,0," + canvas.width + ",0," + canvas.width / 2 + "," + canvas.height / 2);
    document.getElementById("mapRight").setAttribute("coords", canvas.width + ",0," + canvas.width + "," + canvas.height + "," + canvas.width / 2 + "," + canvas.height / 2);
    document.getElementById("mapBottom").setAttribute("coords", "0," + canvas.height + "," + canvas.width / 2 + "," + canvas.height / 2 + "," + canvas.width + "," + canvas.height);

    window.setTimeout(Statistics.IncreaseTimer_void(), 1000);
}


function StartGame() {
    Statistics.Clear_void();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    CreateFruit();

    objWorm.tblPos = [[130, 32, objWorm.nbrRadHead, "R"], [82, 32, objWorm.nbrRadBody, "R"], [44, 32, objWorm.nbrRadBody, "R"], [14, 32, objWorm.nbrRadTail, "R"]];
    DrawWorm();
    Statistics.GetWormLen_void();
    Statistics.GetSpeed_void();

    document.getElementsByTagName("body")[0].removeAttribute("onkeydown");
    document.getElementsByTagName("body")[0].setAttribute("onkeydown", "SetDirection_str(event)");
    document.getElementsByTagName("body")[0].removeAttribute("onclick");
    document.getElementById("mapLeft").setAttribute("onclick", "SetOnClickDirection_str(event)");
    document.getElementById("mapTop").setAttribute("onclick", "SetOnClickDirection_str(event)");
    document.getElementById("mapRight").setAttribute("onclick", "SetOnClickDirection_str(event)");
    document.getElementById("mapBottom").setAttribute("onclick", "SetOnClickDirection_str(event)");
    blnInitGame = true;
}


function Pause() {
    if (!pause) {
        pause = true;
        clearInterval(intervMoweWorm);
    } else {
        pause = false;
        MoveWorm();
    }
}

function CloseWind() {
    window.close();
}










