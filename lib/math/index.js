var Class = require("osr-class");
var Api = Class.extends({
	$:function( model ){
		this.model = model;
	},
	abs:function(){
		return require("./methods/abs").apply(this.model,arguments);
	},
	buy:function(){
		return require("./methods/buy").apply(this.model.arguments);
	},
	mema:function(){
		return require("./methods/mema").apply(this.model,arguments);
	}
});

var _api = null;
module.exports = function(){
	if(null == _api){
		_api = new Api(this);
	}
	return _api;
};