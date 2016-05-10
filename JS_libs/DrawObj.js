/**
 * Created by Perl on 01.09.2015.
 */

//fruit
var objFruit = {
    tblPos: [0, 0],
    nbrWidth: 64,
    nbrHeight: 64,
    tblPoints: [0],
    objImg: new Image()
};

objFruit.objImg.src = "img/Fruit.png";


//worm
var objWorm = {
    nbrRadHead: 30,
    nbrRadBody: 20,
    nbrRadTail: 12,
    nbrSegmConnect: 2,
    tblPos: [],
    tblChangeDirSpot: [],
    nbrIdHead: 0
};
var intervMoweWorm;


function CreateFruit(tblFruitPosTemp) {
    if (!tblFruitPosTemp) {
        var posX = Math.random() * (canvas.width - objFruit.nbrWidth),
            posY = Math.random() * (canvas.height - objFruit.nbrHeight);
        tblFruitPosTemp = [posX, posY];
        ctx.drawImage(objFruit.objImg, tblFruitPosTemp[0], tblFruitPosTemp[1], objFruit.nbrWidth, objFruit.nbrHeight);
        objFruit.tblPos = tblFruitPosTemp;
        objFruit.tblPoints = GetFruitPoints_tbl();
    } else {
        ctx.drawImage(objFruit.objImg, tblFruitPosTemp[0], tblFruitPosTemp[1], objFruit.nbrWidth, objFruit.nbrHeight);
        objFruit.tblPos = tblFruitPosTemp;
    }
}

function DrawWorm() {
    for (var i = 0; i < objWorm.tblPos.length; i++) {
        ctx.fillStyle = "#1CB235";
        ctx.beginPath();
        ctx.moveTo(objWorm.tblPos[i][0], objWorm.tblPos[i][1]);
        ctx.arc(objWorm.tblPos[i][0], objWorm.tblPos[i][1], objWorm.tblPos[i][2], 0, Math.PI * 2, false);
        ctx.fill();
    }
}


function MoveWorm() {
    intervMoweWorm = window.setInterval(function () {
        for (var i = 0; i < objWorm.tblPos.length; i++) {
            moveSegm(i, 1);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawWorm();
        CreateFruit(objFruit.tblPos);

        if (FruitIntegrity_bln()) {
            AddSegmant_void();
            Statistics.IncreaseScore_void();
            CreateFruit();
        }

        var tblReachWall = ReachWall_tbl();
        if (!(tblReachWall[0] == -1 && tblReachWall[0] == -1)) {
            clearInterval(intervMoweWorm);
            Explosion_void(tblReachWall[0], tblReachWall[1], 40);
        }

        var tblWormIntegrity = WormIntegrity_tbl();
        if (!(tblWormIntegrity[0] == -1 && tblWormIntegrity[0] == -1)) {
            clearInterval(intervMoweWorm);
            Explosion_void(tblWormIntegrity[0], tblWormIntegrity[1], 40);
        }


    }, 1000 / Statistics.intSpeed);

}

function SetOnClickDirection_str(event) {
    var newVal = "D";
    var tagID = event.target.id;
    //event.stopPropagation();
    switch (tagID) {
        case "mapBottom":
            newVal = "D";
            break;
        case "mapRight":
            newVal = "R";
            break;
        case "mapTop":
            newVal = "U";
            break;
        case "mapLeft":
            newVal = "L";
            break;
        default:
            return;
    }
    ChangeDirection_void(newVal);
    return newVal;
}

function SetDirection_str(actKey) {
    var newVal = objWorm.tblPos[0][3];
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

    ChangeDirection_void(newVal);
    return newVal;
}

function ChangeDirection_void(strDir) {
    if (pause) {
        Pause();
    }
    var headDir = objWorm.tblPos[0][3];
    var checkRevertion = function (curDir, newDir) {
        var resRevertion = (curDir == "R" && newDir == "L");
        resRevertion = resRevertion || (curDir == "L" && newDir == "R");
        resRevertion = resRevertion || (curDir == "D" && newDir == "U");
        resRevertion = resRevertion || (curDir == "U" && newDir == "D");
        return resRevertion;
    };

    var revertDir = function () {
        for (var i = 0; i < objWorm.tblPos.length; i++) {
            switch (objWorm.tblPos[i][3]) {
                case "R":
                    objWorm.tblPos[i][3] = "L";
                    break;
                case "L":
                    objWorm.tblPos[i][3] = "R";
                    break;
                case "U":
                    objWorm.tblPos[i][3] = "D";
                    break;
                case "D":
                    objWorm.tblPos[i][3] = "U";
                    break;
                default:
                    break;
            }
        }

        for (var j = 0; j < objWorm.tblChangeDirSpot.length; j++) {
            if (objWorm.tblChangeDirSpot[j][4] != 0) {
                objWorm.tblChangeDirSpot[j][4] = objWorm.tblPos.length - objWorm.tblChangeDirSpot[j][4];
            }
            var tempDir = objWorm.tblChangeDirSpot[j][3];
            objWorm.tblChangeDirSpot[j][3] = objWorm.tblChangeDirSpot[j][2];
            objWorm.tblChangeDirSpot[j][2] = tempDir;
            //direction to
            switch (objWorm.tblChangeDirSpot[j][2]) {
                case "R":
                    objWorm.tblChangeDirSpot[j][2] = "L";
                    break;
                case "L":
                    objWorm.tblChangeDirSpot[j][2] = "R";
                    break;
                case "U":
                    objWorm.tblChangeDirSpot[j][2] = "D";
                    break;
                case "D":
                    objWorm.tblChangeDirSpot[j][2] = "U";
                    break;
                default:
                    break;
            }
            // direction from
            switch (objWorm.tblChangeDirSpot[j][3]) {
                case "R":
                    objWorm.tblChangeDirSpot[j][3] = "L";
                    break;
                case "L":
                    objWorm.tblChangeDirSpot[j][3] = "R";
                    break;
                case "U":
                    objWorm.tblChangeDirSpot[j][3] = "D";
                    break;
                case "D":
                    objWorm.tblChangeDirSpot[j][3] = "U";
                    break;
                default:
                    break;
            }
        }
    };

    if (checkRevertion(headDir, strDir)) {

        var tempTail = objWorm.tblPos[objWorm.tblPos.length - 1];
        objWorm.tblPos[objWorm.tblPos.length - 1] = [objWorm.tblPos[0][0], objWorm.tblPos[0][1], objWorm.nbrRadTail, objWorm.tblPos[0][3]];
        objWorm.tblPos[0] = [tempTail[0], tempTail[1], objWorm.nbrRadHead, tempTail[3]];

        revertDir();

        moveSegm(objWorm.tblPos.length - 1, objWorm.nbrRadHead - objWorm.nbrRadTail);
        moveSegm(0, objWorm.nbrRadHead - objWorm.nbrRadTail);

    } else {
        if (headDir != strDir) {
            objWorm.tblChangeDirSpot.push([objWorm.tblPos[0][0], objWorm.tblPos[0][1], strDir, headDir, objWorm.tblPos.length]);
            //objWorm.tblPos[0][3] = strDir;
        }
    }
    clearInterval(intervMoweWorm);
    MoveWorm();
}


function AddSegmant_void() {
    if (objWorm.nbrIdHead == 0) {
        objWorm.tblPos[objWorm.tblPos.length - 1] = GetNewSegmPos_tbl(objWorm.tblPos[objWorm.tblPos.length - 1], objWorm.nbrRadBody, false);
        objWorm.tblPos.push(GetNewSegmPos_tbl(objWorm.tblPos[objWorm.tblPos.length - 1], objWorm.nbrRadTail, true));
    } else {
        objWorm.tblPos[0] = GetNewSegmPos_tbl(objWorm.tblPos[0], objWorm.nbrRadBody, false);
        objWorm.tblPos.unshift(GetNewSegmPos_tbl(objWorm.tblPos[0], objWorm.nbrRadTail, true));
    }
    for (var i = 0; i < objWorm.tblChangeDirSpot.length; i++) {
        if (objWorm.tblChangeDirSpot[i][4] != 0) {
            objWorm.tblChangeDirSpot[i][4]++;
        }
    }

    Statistics.GetWormLen_void();
}

function GetNewSegmPos_tbl(tblSegm, nbrRad, blnIsNew) {
    var nbrSegmX = tblSegm[0];
    var nbrSegmY = tblSegm[1];
    var nbrSegmConn = objWorm.nbrSegmConnect;
    var nbrRevert = 1;
    if (!blnIsNew) {
        nbrRevert = -1;
        nbrSegmConn = 0;
    }
    switch (tblSegm[3]) {
        case "R":
        {
            nbrSegmX = nbrSegmX - nbrRevert * tblSegm[2] - nbrRad + nbrSegmConn;
            break;
        }
        case "L":
        {
            nbrSegmX = nbrSegmX + nbrRevert * tblSegm[2] + nbrRad - nbrSegmConn;
            break;
        }
        case "U":
        {
            nbrSegmY = nbrSegmY + nbrRevert * tblSegm[2] + nbrRad - nbrSegmConn;
            break;
        }
        case "D":
        {
            nbrSegmY = nbrSegmY - nbrRevert * tblSegm[2] - nbrRad + nbrSegmConn;
            break;
        }
        default:
            break;
    }
    return [nbrSegmX, nbrSegmY, nbrRad, tblSegm[3]];
}

function moveSegm(segmPos, pointsNum) {
    for (var i = 1; i <= pointsNum; i++) {
        for (var j = 0; j < objWorm.tblChangeDirSpot.length; j++) {
            if (objWorm.tblChangeDirSpot[j][4] != 0) {
                if (objWorm.tblPos[segmPos][0] == objWorm.tblChangeDirSpot[j][0] && objWorm.tblPos[segmPos][1] == objWorm.tblChangeDirSpot[j][1]) {
                    objWorm.tblPos[segmPos][3] = objWorm.tblChangeDirSpot[j][2];
                    objWorm.tblChangeDirSpot[j][4] -= 1;
                    if (objWorm.tblChangeDirSpot[j][4] == 0) {
                        objWorm.tblChangeDirSpot.splice(j, 1);
                    }
                }
            }
        }
        switch (objWorm.tblPos[segmPos][3]) {
            case "R":
                objWorm.tblPos[segmPos][0] += 1;
                break;
            case "L":
                objWorm.tblPos[segmPos][0] -= 1;
                break;
            case "U":
                objWorm.tblPos[segmPos][1] -= 1;
                break;
            case "D":
                objWorm.tblPos[segmPos][1] += 1;
                break;
            default:
                break;
        }
    }
}
function GameOver_void() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blnInitGame = false;
    LoadDocu("Game over");
}