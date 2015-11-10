/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var Class = require("osr-class");

var Me = Class.extends({
	$:function( quant ){
		this.quant = quant;
	},
	buy:function(){
		
	},
	sell:function(){
		
	},
	close:function(){
		
	},
	
});
var _me = null;
module.exports = function(){
	if(null == _me){
		_me = new Me(this);
	}
	return _me;
}