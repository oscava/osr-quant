/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var Class = require("osr-class");

var Me = Class.extends({
	$:function( model ){
		this.model = model;
		this.model.includes.Me = this;
	},
	BUY:function(){
		if(this.model.doCondition("buy"))
			return require("./methods/buy").apply(this.model,arguments);
		else
			this.model.includes.Log.warn("BUY-Condition is not satisfied");
	},
	SELL:function(){
		if(this.model.doCondition("sell"))
			return require("./methods/sell").apply(this.model,arguments);
		else
			this.model.includes.Log.warn("SELL-Condition is not satisfied");
	},
	CLOSE:function(){
		if(this.model.doCondition("close"))
			return require("./methods/close").apply(this.model,arguments);
		else
			this.model.includes.Log.warn("CLOSE-Condition is not satisfied");
	},
	
});
var _me = null;
module.exports = function(){
	if(null == _me){
		_me = new Me(this);
	}
	return _me;
}