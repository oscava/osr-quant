var ChildMain = require("osr-cluster/lib/core/process/childmain");
var EventEmitter = require("events").EventEmitter;
var Cluster = require("osr-cluster");
var Quant = ChildMain.extends({
	run:function( name, file, options ){
		if(!this.cluster){
			this.cluster = new Cluster("TaiRan Quant");
		}
		if(!options){
			options = {};
		}
		options.require = [ __dirname ];
		options.childMain = __dirname;
		this.cluster.run( name, file, options );
	}
});

Quant.Model = require("./model");

global.Quant = Quant;

module.exports = exports = Quant;