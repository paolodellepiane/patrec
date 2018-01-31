const Db = require('tingodb')().Db,
    assert = require('assert'),
    db = new Db(__dirname + '/../data', {}),
    points = db.collection('points'),
    u = require('./u');

exports.addPoint = (req, res) => {
    points.insert(req.body, (err, p) => {
        if (err) res.send(err);
        res.json(p);
    });
};

exports.deletePoint = (req, res) => {
    points.remove({ _id: req.params.id }, (err, p) => {
        if (err) res.send(err);
        res.json(p);
    });
};

exports.getSpace = (req, res) => {
    points.find({}).toArray((err, ps) => {
        if (err) res.send(err);
        res.json(ps.map(p => ({ x: p.x, y: p.y })));
    });
};

exports.deleteSpace = (req, res) => {
    points.remove({}, (err, p) => {
        if (err) res.send(err);
        res.json(p);
    });
};

exports.getLines = (req, res) =>
    points.find({}).toArray((err, space) => res.json(u.getCollinearLines(space, req.params.n)));
