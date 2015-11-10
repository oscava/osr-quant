var Class = require("osr-class");
var Api = Class.extends({
	$:function( model ){
		this.model = model;
		this.model.includes.ABS = this.ABS.bind(this);
		this.model.includes.MA = this.MA.bind(this);
		this.model.includes.EMA = this.EMA.bind(this);
		this.model.includes.HHV = this.HHV.bind(this);
		this.model.includes.LLV = this.LLV.bind(this);
	},
	ABS:function(){
		return require("./methods/abs").apply(this.model,arguments);
	},
	MA:function(){
		return require("./methods/ma").apply(this.model,arguments);
	},
	EMA:function(){
		return require("./methods/ema").apply(this.model,arguments);
	},
	HHV:function(){
		return require("./methods/hhv").apply(this.model,arguments);
	},
	LLV:function(){
		return require("./methods/llv").apply(this.model,arguments);
	}
});

var _api = null;
module.exports = function(){
	if(null == _api){
		_api = new Api(this);
	}
	return _api;
};