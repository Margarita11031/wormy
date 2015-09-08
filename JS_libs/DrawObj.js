/**
 * Created by Perl on 01.09.2015.
 */



//fruit
var tblFruitPos = [0, 0];
var nbrFruitWidth = 64, nbrFruitHeight = 64;
var tblFruitPoints;
var Fruit = new Image();
Fruit.src = "img/Fruit.png";

//worm
var intervMoweWorm;
var nbrRadHead = 30, nbrRadBody = 20, nbrRadTail = 12;
var nbrSegmConnection = 2;
var wormPos;
var changeDirSpot = [], idHead = 0, blnInitGame;


function CreateFruit(tblFruitPosTemp) {
    if (!tblFruitPosTemp) {
        var posX = Math.random() * (canvas.width - nbrFruitWidth),
            posY = Math.random() * (canvas.height - nbrFruitHeight);
        tblFruitPosTemp = [posX, posY];
        ctx.drawImage(Fruit, tblFruitPosTemp[0], tblFruitPosTemp[1], nbrFruitWidth, nbrFruitHeight);
        tblFruitPos = tblFruitPosTemp;
        tblFruitPoints = GetFruitPoints_tbl();
    } else {
        ctx.drawImage(Fruit, tblFruitPosTemp[0], tblFruitPosTemp[1], nbrFruitWidth, nbrFruitHeight);
        tblFruitPos = tblFruitPosTemp;
    }
}

function DrawWorm() {
    for (var i = 0; i < wormPos.length; i++) {
        ctx.fillStyle = "#1CB235";
        ctx.beginPath();
        ctx.moveTo(wormPos[i][0], wormPos[i][1]);
        ctx.arc(wormPos[i][0], wormPos[i][1], wormPos[i][2], 0, Math.PI * 2, false);
        ctx.fill();
    }
}


function MoveWorm() {
    intervMoweWorm = window.setInterval(function () {
        for (var i = 0; i < wormPos.length; i++) {
            moveSegm(i, 1);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawWorm();
        CreateFruit(tblFruitPos);

        if (FruitIntegrity_bln()) {
            AddSegmant_void();
            Statistics.IncreaseScore_void();
            CreateFruit();
        }

        if (ReachWall_bln()) {
            clearInterval(intervMoweWorm);
            blnInitGame = false;
            LoadDocu("Game over");
        }


    }, 1000 / Statistics.intSpeed);

}

function ChangeDirection(actKey) {
    if (pause) {
        Pause();
    }
    var newVal = wormPos[0][3], headDir = wormPos[0][3];
    switch (actKey.keyCode) {
        case 40:
            newVal = "D";
            break;
        case 39:
            newVal = "R";
            break;
        case 38:
            newVal = "U";
            break;
        case 37:
            newVal = "L";
            break;
        default:
            return;
    }

    var checkRevertion = function (curDir, newDir) {
        var resRevertion = (curDir == "R" && newDir == "L");
        resRevertion = resRevertion || (curDir == "L" && newDir == "R");
        resRevertion = resRevertion || (curDir == "D" && newDir == "U");
        resRevertion = resRevertion || (curDir == "U" && newDir == "D");
        return resRevertion;
    };

    var revertDir = function () {
        for (var i = 0; i < wormPos.length; i++) {
            switch (wormPos[i][3]) {
                case "R":
                    wormPos[i][3] = "L";
                    break;
                case "L":
                    wormPos[i][3] = "R";
                    break;
                case "U":
                    wormPos[i][3] = "D";
                    break;
                case "D":
                    wormPos[i][3] = "U";
                    break;
                default:
                    break;
            }
        }

        for (var j = 0; j < changeDirSpot.length; j++) {
            if (changeDirSpot[j][4] != 0) {
                changeDirSpot[j][4] = wormPos.length - changeDirSpot[j][4]
            }
            var tempDir = changeDirSpot[j][3];
            changeDirSpot[j][3] = changeDirSpot[j][2];
            changeDirSpot[j][2] = tempDir;
            //direction to
            switch (changeDirSpot[j][2]) {
                case "R":
                    changeDirSpot[j][2] = "L";
                    break;
                case "L":
                    changeDirSpot[j][2] = "R";
                    break;
                case "U":
                    changeDirSpot[j][2] = "D";
                    break;
                case "D":
                    changeDirSpot[j][2] = "U";
                    break;
                default:
                    break;
            }
            // direction from
            switch (changeDirSpot[j][3]) {
                case "R":
                    changeDirSpot[j][3] = "L";
                    break;
                case "L":
                    changeDirSpot[j][3] = "R";
                    break;
                case "U":
                    changeDirSpot[j][3] = "D";
                    break;
                case "D":
                    changeDirSpot[j][3] = "U";
                    break;
                default:
                    break;
            }
        }
    };

    if (checkRevertion(headDir, newVal)) {

        var tempTail = wormPos[wormPos.length - 1];
        wormPos[wormPos.length - 1] = [wormPos[0][0], wormPos[0][1], nbrRadTail, wormPos[0][3]];
        wormPos[0] = [tempTail[0], tempTail[1], nbrRadHead, tempTail[3]];

        revertDir();

        moveSegm(wormPos.length - 1, nbrRadHead - nbrRadTail);
        moveSegm(0, nbrRadHead - nbrRadTail);

    } else {
        if (headDir != newVal) {
            changeDirSpot.push([wormPos[0][0], wormPos[0][1], newVal, headDir, wormPos.length]);
            //wormPos[0][3] = newVal;
        }
    }
    clearInterval(intervMoweWorm);
    MoveWorm();
}

function AddSegmant_void() {
    if (idHead == 0) {
        wormPos[wormPos.length - 1] = GetNewSegmPos_tbl(wormPos.length - 2, nbrRadBody);
        wormPos.push(GetNewSegmPos_tbl(wormPos.length - 1, nbrRadTail));
    } else {
        wormPos[0] = GetNewSegmPos_tbl(1, nbrRadBody);
        wormPos.unshift(GetNewSegmPos_tbl(0, nbrRadTail));
    }
    for (var i = 0; i < changeDirSpot.length; i++) {
        if (changeDirSpot[i][4] != 0) {
            changeDirSpot[i][4]++;
        }
    }

    Statistics.GetWormLen_void();
}

function GetNewSegmPos_tbl(nbrPrevSegm, nbrRad) {
    var nbrSegmX = wormPos[nbrPrevSegm][0];
    var nbrSegmY = wormPos[nbrPrevSegm][1];
    switch ((wormPos[nbrPrevSegm + 1] || wormPos[nbrPrevSegm])[3]) {
        case "R":
        {
            nbrSegmX = nbrSegmX - nbrRadBody - nbrRad + nbrSegmConnection;
            break;
        }
        case "L":
        {
            nbrSegmX = nbrSegmX + nbrRadBody + nbrRad - nbrSegmConnection;
            break;
        }
        case "U":
        {
            nbrSegmY = nbrSegmY + nbrRadBody + nbrRad - nbrSegmConnection;
            break;
        }
        case "D":
        {
            nbrSegmY = nbrSegmY - nbrRadBody - nbrRad + nbrSegmConnection;
            break;
        }
        default:
            break;
    }
    return [nbrSegmX, nbrSegmY, nbrRad, ((wormPos[nbrPrevSegm + 1] || wormPos[nbrPrevSegm])[3])];
}

function moveSegm(segmPos, pointsNum) {
    for (var i = 1; i <= pointsNum; i++) {
        for (var j = 0; j < changeDirSpot.length; j++) {
            if (changeDirSpot[j][4] != 0) {
                if (wormPos[segmPos][0] == changeDirSpot[j][0] && wormPos[segmPos][1] == changeDirSpot[j][1]) {
                    wormPos[segmPos][3] = changeDirSpot[j][2];
                    changeDirSpot[j][4] -= 1;
                    if (changeDirSpot[j][4] == 0) {
                        changeDirSpot.splice(j, 1);
                    }
                }
            }
        }
        switch (wormPos[segmPos][3]) {
            case "R":
                wormPos[segmPos][0] += 1;
                break;
            case "L":
                wormPos[segmPos][0] -= 1;
                break;
            case "U":
                wormPos[segmPos][1] -= 1;
                break;
            case "D":
                wormPos[segmPos][1] += 1;
                break;
            default:
                break;
        }
    }
}