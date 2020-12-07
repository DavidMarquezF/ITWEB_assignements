const Score = require('../models/score');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getScores = async function(req, res, next) {
    try {
        const scores = await Score.find({}).sort({ value: 'desc'}).exec();
        res.send(scores);
    } catch(err) {
        next(err);
    }
}

module.exports.createScore = async function(req, res, next) {
    if (!req.user._id || !req.body.username || !req.body.timestamp || !req.body.value) {
        return res.status(400).json({ 'message': "Score needs the following params: userId, username, timestamp, value!" });
    } else {
        try {
            if (await Score.exists({ userId: req.user_id, timestamp: req.body.timestamp })) {
                return res.status(400).json({ 'message': "Score record for the user and the timestamp already exists! (Possible duplicate)"});
            }
            const score = new Score({
                userId: req.user._id,
                username: req.body.username,
                timestamp: req.body.timestamp,
                value: req.body.value
            });
            await score.save();
            res.send(score);
        } catch(err) {
            return next(err);
        }
    }
}
