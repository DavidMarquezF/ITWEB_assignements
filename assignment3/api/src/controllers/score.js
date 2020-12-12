const Score = require('../models/score');
const ObjectId = require('mongoose').Types.ObjectId;
const { BehaviorSubject } = require('rxjs');

var lastTopN = [];
var lastTopNSubject = new BehaviorSubject();

module.exports.getScores = async function(req, res, next) {
    try {
        const scores = await Score.find({}).sort({ value: 'desc'}).exec();
        res.send(scores);
    } catch(err) {
        next(err);
    }
}

module.exports.getTopNScores = async function(n) {
    if (lastTopN.length == 0) {
        const scores = await Score.find({}).sort({ value: 'desc'}).exec();
        lastTopN = scores.slice(0, n);
        lastTopNSubject.next(lastTopN);
    }
    return lastTopNSubject;
}

module.exports.createScore = async function(req, res, next) {
    if (!req.user._id || !req.body.username || !req.body.timestamp || 
        !req.body.value) {
        return res.status(400).json({ 'message': "Score needs the following" + 
        "params: userId, username, timestamp, value!" });
    } else {
        try {
            if (await Score.exists({ userId: req.user_id, 
                timestamp: req.body.timestamp })) {
                return res.status(400).json({ 'message': "Score record for the" +
                " user and the timestamp already exists! (Possible duplicate)"});
            }
            const score = new Score({
                userId: req.user._id,
                username: req.body.username,
                timestamp: req.body.timestamp,
                value: req.body.value
            });
            await score.save();
            if (score.value > lastTopN[lastTopN.length-1].value) {
                console.log("bigger score");
                lastTopN.push(score);
                lastTopN.sort((x, y) => y.value - x.value);
                lastTopN = lastTopN.slice(0, 10)
                console.log(lastTopN);
                lastTopNSubject.next(lastTopN);
            } else {
                console.log(lastTopN);
            }
            res.send(score);
        } catch(err) {
            return next(err);
        }
    }
}
