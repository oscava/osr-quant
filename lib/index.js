var ChildMain = require("osr-cluster/lib/core/process/childmain");
var EventEmitter = require("events").EventEmitter;
var Cluster = require("osr-cluster");
var Quant = ChildMain.extends({
});

Quant.Model = require("./model");

Quant.模型 = require("./model");

Quant.模型.继承 = Quant.Model.extends;

global.Quant = Quant;

global.量化 = Quant;

module.exports = exports = Quant;