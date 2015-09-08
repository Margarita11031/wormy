/**
 * Created by Perl on 01.09.2015.
 * @return {boolean}
 */

function ReachWall_bln() {
    var result = false;
    result = result || wormPos[0][0] + 30 > canvas.width;
    result = result || wormPos[0][1] + 30 > canvas.height;
    result = result || wormPos[0][0] - 30 < 0;
    result = result || wormPos[0][1] - 30 < 0;
    return result;
}

/**
 * @return {boolean}
 */
function FruitIntegrity_bln() {
    var blnResult = false, tblHeadPoint;
    tblHeadPoint = GetHeadPoints_tbl();
    for (var i = 0; i < tblFruitPoints.length; i++) {
        for (var j = 0; j < tblHeadPoint.length; j++) {
            if (tblFruitPoints[i][0] == tblHeadPoint[j][0] && tblFruitPoints[i][1] == tblHeadPoint[j][1]) {
                blnResult = true;
            }
        }
    }
    return blnResult;
}


function GetFruitPoints_tbl() {
    var tblPointsArray = [];
    //get top and bottom lines
    for (var i = tblFruitPos[0]; i < tblFruitPos[0] + nbrFruitWidth; i++) {
        tblPointsArray.unshift([Math.round(i), Math.round(tblFruitPos[1])]);
        tblPointsArray.unshift([Math.round(i), Math.round(tblFruitPos[1] + nbrFruitHeight)]);
    }
    //get left and right lines
    for (var j = tblFruitPos[1]; j < tblFruitPos[1] + nbrFruitHeight; j++) {
        tblPointsArray.unshift([Math.round(tblFruitPos[0]), Math.round(j)]);
        tblPointsArray.unshift([Math.round(tblFruitPos[0] + nbrFruitWidth), Math.round(j)]);
    }
    return tblPointsArray;
}

function GetHeadPoints_tbl() {
    var tblPointsArray = [];
    // X line
    for (var i = wormPos[idHead][0] - wormPos[idHead][2]; i < wormPos[idHead][0] + wormPos[idHead][2]; i++) {
        tblPointsArray.unshift([Math.round(i), Math.round(wormPos[idHead][1])]);
    }
    //Y line
    for (var j = wormPos[idHead][1] - wormPos[idHead][2]; j < wormPos[idHead][1] + wormPos[idHead][2]; j++) {
        tblPointsArray.unshift([Math.round(wormPos[idHead][0]), Math.round(j)]);
    }
    return tblPointsArray;

}