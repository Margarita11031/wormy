/**
 * Created by Perl on 01.09.2015.
 */

function ReachWall_bln() {
    result = false;
    result = result || objWorm.tblPos[0][0] + 30 > canvas.width;
    result = result || objWorm.tblPos[0][1] + 30 > canvas.height;
    result = result || objWorm.tblPos[0][0] - 30 < 0;
    result = result || objWorm.tblPos[0][1] - 30 < 0;
    return result;
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
        tblPointsArray.unshift([Math.round(i), Math.round(objWorm.tblPos[objWorm.nbrIdHead][1])]);
    }
    //Y line
    for (var j = objWorm.tblPos[objWorm.nbrIdHead][1] - objWorm.tblPos[objWorm.nbrIdHead][2]; j < objWorm.tblPos[objWorm.nbrIdHead][1] + objWorm.tblPos[objWorm.nbrIdHead][2]; j++) {
        tblPointsArray.unshift([Math.round(objWorm.tblPos[objWorm.nbrIdHead][0]), Math.round(j)]);
    }
    return tblPointsArray;

}