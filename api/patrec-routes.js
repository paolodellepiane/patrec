'use strict';
module.exports = function (app) {
    var points = require('./patrec-controller');

    app.route('/point')
        .post(points.addPoint);

    app.route('/point/:id')
        .delete(points.deletePoint);

    app.route('/space')
        .get(points.getSpace)
        .delete(points.deleteSpace);

    app.route('/lines/:n')
        .get(points.getLines);
};