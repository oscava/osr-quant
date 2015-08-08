var ChildMain = require("osr-cluster/lib/core/process/childmain");
var EventEmitter = require("events").EventEmitter;
var Quant = ChildMain.extends({
});

Quant.Model = require("./model");

global.Quant = Quant;

module.exports = exports = Quant;