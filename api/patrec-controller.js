const Db = require('tingodb')().Db,
    assert = require('assert'),
    fs = require('fs'),
    u = require('./u');

const dbPath = __dirname + '/../data';
if (!fs.existsSync(dbPath))
    fs.mkdirSync(dbPath);
const db = new Db(dbPath, {}),
    points = db.collection('points');

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

exports.getLines = (req, res) => {
    const n = parseInt(req.params.n);
    if (isNaN(n)) res.send('param must be a number');
    points.find({}).toArray((err, space) => {
        if (err) res.send(err);
        try {
            res.json(u.getCollinearLines(space, n))
        } catch (e) {
            res.send(e.message)
        }
    })
};
