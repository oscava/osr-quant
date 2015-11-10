/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var Class = require("osr-class");
var namespace = function( _namespace ){
	return function(){
		return console.log.apply(null,[_namespace].concat(Array.prototype.slice.call(arguments)));
	}
}

var INFO 	= "[ INFO       ]";
var ERROR 	= "[ ERROR      ]";
var WARN 	= "[ WARN       ]";
var SUCCESS = "[ SUCCESS    ]";

var Log = Class.extends({
	$:function( model ){
		this.model = model;
		this.model.includes.Log = this;
	},
	info:function(){
		return namespace(INFO).apply(this,arguments);
	},
	warn:function(){
		return namespace(WARN).apply(this,arguments);
	},
	success:function(){
		return namespace(SUCCESS).apply(this,arguments);
	},
	error:function(){
		return namespace(ERROR).apply(this,arguments);
	}
});

var _log = null;

module.exports = function(){
	if(null == _log){
		_log = new Log(this);
	}
	return _log;
}