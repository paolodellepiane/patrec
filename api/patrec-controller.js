const mongoose = require('mongoose'),
    Point = mongoose.model('Point'),
    Victor = require('victor');

exports.addPoint = (req, res) => {
    new Point(req.body).save((err, p) => {
        if (err) res.send(err);
        res.json(p);
    });
};

exports.deletePoint = (req, res) => {
    Point.remove({ _id: req.params.id }, (err, p) => {
        if (err) res.send(err);
        res.json(p);
    });
};


exports.getSpace = (req, res) => {
    Point.find({}, (err, p) => {
        if (err) res.send(err);
        res.json(p);
    });
};

exports.deleteSpace = (req, res) => {
    Point.remove({}, (err, p) => {
        if (err) res.send(err);
        res.json(p);
    });
};

exports.getLines = (req, res) => {
    let n = req.params.n;
    res.json(areCollinear(Point.find({}, p => p)));
};

areCollinear = points =>
    sumMagnitudes(points) === Victor.fromObject(points[points.length - 1]).distanceSq(Victor.fromObject(points[0]));

sumMagnitudes = points =>
    points.map(p => Victor.fromObject(p))
        .skip(1)
        .reduce((v, i) => vecs[i].distanceSq(vecs[i - 1]), 0);

areCollinearBanale = points => {
    let vecs = points.map(p => Victor.fromObject(p))
    return vecs[2].distanceSq(vecs[1]) + vecs[1].distanceSq(vecs[0]) === vecs[2].distanceSq(vecs[0]);
};
