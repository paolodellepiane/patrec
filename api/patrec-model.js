'use strict';
var mongoose = require('mongoose');
var PointSchema = mongoose.Schema({
  x: Number,
  y: Number
});

module.exports = mongoose.model('Point', PointSchema);