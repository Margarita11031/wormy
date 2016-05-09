/**
 * Created by Perl on 01.09.2015.
 */

function ReachWall_tbl() {
    tblPoint = [-1, -1];
    if (objWorm.tblPos[0][0] + 30 > canvas.width) {
        tblPoint = [objWorm.tblPos[0][0] + 30, objWorm.tblPos[0][1]];
    }
    if (objWorm.tblPos[0][1] + 30 > canvas.height) {
        tblPoint = [objWorm.tblPos[0][0], objWorm.tblPos[0][1] + 30];
    }
    if (objWorm.tblPos[0][0] - 30 < 0) {
        tblPoint = [objWorm.tblPos[0][0] - 30, objWorm.tblPos[0][1]];
    }
    if (objWorm.tblPos[0][1] - 30 < 0) {
        tblPoint = [objWorm.tblPos[0][0], objWorm.tblPos[0][1] - 30];
    }
    return tblPoint;
}

function FruitIntegrity_bln() {
    blnResult = false;
    tblHeadPoint = GetHeadPoints_tbl();
    for (var i = 0; i < objFruit.tblPoints.length; i++) {
        for (var j = 0; j < tblHeadPoint.length; j++) {
            if (objFruit.tblPoints[i][0] == tblHeadPoint[j][0] && objFruit.tblPoints[i][1] == tblHeadPoint[j][1]) {
                blnResult = true;
            }
        }
    }
    return blnResult;
}


function GetFruitPoints_tbl() {
    var tblPointsArray = [];
    //get top and bottom lines
    for (var i = objFruit.tblPos[0]; i < objFruit.tblPos[0] + objFruit.nbrWidth; i++) {
        tblPointsArray.unshift([Math.round(i), Math.round(objFruit.tblPos[1])]);
        tblPointsArray.unshift([Math.round(i), Math.round(objFruit.tblPos[1] + objFruit.nbrHeight)]);
    }
    //get left and right lines
    for (var j = objFruit.tblPos[1]; j < objFruit.tblPos[1] + objFruit.nbrHeight; j++) {
        tblPointsArray.unshift([Math.round(objFruit.tblPos[0]), Math.round(j)]);
        tblPointsArray.unshift([Math.round(objFruit.tblPos[0] + objFruit.nbrWidth), Math.round(j)]);
    }
    return tblPointsArray;
}

function GetHeadPoints_tbl() {
    var tblPointsArray = [];
    // X line
    for (var i = objWorm.tblPos[objWorm.nbrIdHead][0] - objWorm.tblPos[objWorm.nbrIdHead][2]; i < objWorm.tblPos[objWorm.nbrIdHead][0] + objWorm.tblPos[objWorm.nbrIdHead][2]; i++) {
        tblPointsArray.push([Math.round(i), Math.round(objWorm.tblPos[objWorm.nbrIdHead][1])]);
    }
    //Y line
    for (var j = objWorm.tblPos[objWorm.nbrIdHead][1] - objWorm.tblPos[objWorm.nbrIdHead][2]; j < objWorm.tblPos[objWorm.nbrIdHead][1] + objWorm.tblPos[objWorm.nbrIdHead][2]; j++) {
        tblPointsArray.push([Math.round(objWorm.tblPos[objWorm.nbrIdHead][0]), Math.round(j)]);
    }
    return tblPointsArray;

}


function GetBodyPoints_tbl() {
    var tblPointsArray = [];
    var segmentsCount = objWorm.tblPos.length;
    while (segmentsCount--) {
        // X line
        var intStartPoint = objWorm.tblPos[segmentsCount][0] - objWorm.tblPos[segmentsCount][2] + objWorm.nbrSegmConnect + 2;
        var intStopPoint = objWorm.tblPos[segmentsCount][0] + objWorm.tblPos[segmentsCount][2] - objWorm.nbrSegmConnect - 2;
        for (var i = intStartPoint; i < intStopPoint; i++) {
            tblPointsArray.push([Math.round(i), Math.round(objWorm.tblPos[segmentsCount][1])]);
        }
        //Y line
        intStartPoint = objWorm.tblPos[segmentsCount][1] - objWorm.tblPos[segmentsCount][2] + objWorm.nbrSegmConnect + 2;
        intStopPoint = objWorm.tblPos[segmentsCount][1] + objWorm.tblPos[segmentsCount][2] - objWorm.nbrSegmConnect - 2;
        for (var j = intStartPoint; j < intStopPoint; j++) {
            if (Math.round(j) != Math.round(objWorm.tblPos[segmentsCount][1])) {
                tblPointsArray.push([Math.round(objWorm.tblPos[segmentsCount][0]), Math.round(j)]);
            }
        }
    }
    return tblPointsArray;
}

function WormIntegrity_tbl() {
    var tblPoint = [-1, -1];
    var tblWormPoints = GetBodyPoints_tbl();
    var nbrLen = tblWormPoints.length;
    for (var m = 0; m < (nbrLen - 1); m++) {
        for (var j = m + 1; j < nbrLen; j++) {
            if (tblWormPoints[m][0] == tblWormPoints[j][0] && tblWormPoints[m][1] == tblWormPoints[j][1]) {
                tblPoint = [tblWormPoints[m][0], tblWormPoints[m][1]];
            }
        }
    }
    return tblPoint;
}
