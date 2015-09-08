//general
var pause = false;
var blnInitGame = false; 
var canvas, ctx;



function ResizeField(){
	canvas.width = document.documentElement.clientWidth*0.8-6;
    canvas.height = document.documentElement.clientHeight;
}

function LoadDocu(text) {
	canvas = document.getElementById("fieldForSnake");
	ctx = canvas.getContext('2d');
    canvas.width = document.documentElement.clientWidth*0.8-6;
    canvas.height = document.documentElement.clientHeight;
    ctx.font = 'oblique 50pt Georgia';
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(text, canvas.width / 2 - 230, canvas.height / 2 - 70);
	
	window.setTimeout(Statistics.IncreaseTimer_void(), 1000);
}



function StartGame() {
	Statistics.Clear_void();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    CreateFruit();

	wormPos = [[130, 32, nbrRadHead, "R"], [82, 32, nbrRadBody, "R"], [44, 32, nbrRadBody, "R"], [14, 32, nbrRadTail, "R"]];
    DrawWorm();
	Statistics.GetWormLen_void();
	Statistics.GetSpeed_void();
	
    document.getElementsByTagName("body")[0].removeAttribute("onkeydown");
    document.getElementsByTagName("body")[0].setAttribute("onkeydown", "ChangeDirection(event)");
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










