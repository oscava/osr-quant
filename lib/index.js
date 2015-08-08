var ChildMain = require("osr-cluster/lib/core/process/childmain");
var EventEmitter = require("events").EventEmitter;
var Cluster = require("osr-cluster");
var Quant = ChildMain.extends({
});

Quant.Model = require("./model");

global.Quant = Quant;

module.exports = exports = Quant;