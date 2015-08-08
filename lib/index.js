var ChildMain = require("osr-cluster/lib/core/process/childmain");
var EventEmitter = require("events").EventEmitter;
var Quant = ChildMain.extends({
	$:function(){
		this.super("$",arguments);
	},
	nextTick:function(channel,message){
		
	}
});

Quant.Model = require("./model");

module.exports = exports = Quant;