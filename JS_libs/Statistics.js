/**
 * Created by Perl on 01.09.2015.
 */

var Statistics = {
    intSpeed: 50,
    intTime: 0,
    intScore: 0,
    intReward: 5,

    GetSpeed_void: function () {
        document.getElementById("speed").innerHTML = Statistics.intSpeed;
    },

    IncreaseScore_void: function () {
        Statistics.intScore += Statistics.intReward;
        document.getElementById("score").innerHTML = Statistics.intScore;
    },

    IncreaseTimer_void: function () {
        if (blnInitGame) {
            Statistics.intTime += 1;
            document.getElementById("time").innerHTML = Statistics.intTime;
        }
        //window.setTimeout(Statistics.IncreaseTimer_void(), 1000); //TBD!!!
    },

    GetWormLen_void: function () {
        document.getElementById("len").innerHTML = objWorm.tblPos.length;
    },

    Clear_void: function () {
        Statistics.intTime = 0;
        Statistics.intScore = 0;
    }
}
