const mongoose = require('mongoose'),
    Point = mongoose.model('Point');

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
