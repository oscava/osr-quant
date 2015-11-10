/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var Class = require("osr-class");
var Api = Class.extends({
	$:function( model ){
		this.model = model;
		this.model.includes.ABS = this.ABS.bind(this);
		this.model.includes.MA = this.MA.bind(this);
		this.model.includes.EMA = this.EMA.bind(this);
		this.model.includes.HHV = this.HHV.bind(this);
		this.model.includes.LLV = this.LLV.bind(this);
		this.model.includes.REF = this.REF.bind(this);
		this.model.includes.MEMA = this.MEMA.bind(this);
		this.model.includes.SMA = this.SMA.bind(this);
		this.model.includes.CROSS = this.CROSS.bind(this);
		this.model.includes.SLOPE = this.SLOPE.bind(this);
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
	},
	REF:function(){
		return require("./methods/ref").apply(this.model,arguments);
	},
	MEMA:function(){
		return require("./methods/mema").apply(this.model,arguments);
	},
	SMA:function(){
		return require("./methods/sma").apply(this.model,arguments);
	},
	CROSS:function(){
		return require("./methods/cross").apply(this.model,arguments);
	},
	SLOPE:function(){
		return require("./methods/slope").apply(this.model,arguments);
	}
});

var _api = null;
module.exports = function(){
	if(null == _api){
		_api = new Api(this);
	}
	return _api;
};