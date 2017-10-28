var express = require("express");
var path = require("path");
var router = express.Router();
var friendsList = require('../data/friends.js');


router.post('/api/friends', function(req, res) {
    let newSurvey = req.body;
    let friendPick;
    let friendConnect = [];

    for (var i = 0; i < friendsList.length; i++) {
        var totalDifference = 0;

        for (var j = 0; j < 5; j++) {
            let scoreDiff = Math.abs(friendsList[i].scores[j] - newSurvey.scores[j]);
            totalDifference += scoreDiff;
        }

        friendConnect.push({
            name: friendsList[i].name,
            picture: friendsList[i].picture,
            totalDiff: totalDifference
            });
        }

    let maxScore = 20;
    friendConnect.map(function(obj) {
        if (obj.totalDiff < maxScore) maxScore = obj.totalDiff;
    });

    friendPick = friendConnect.filter(function(e) { return e.totalDiff == maxScore; });

    res.json(friendPick);
    friendsList.push(newSurvey);

});

router.get('/api/friends', function(req, res) {
    res.json(friendsList);
});

module.exports = router;