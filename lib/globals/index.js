module.exports = function(){
	this.includes.CLOSE = "$.close";				//收盘
	this.includes.OPEN = "$.open";					//开盘
	this.includes.HIGH = "$.high";					//最高
	this.includes.LOW = "$.low";					//最低
	this.includes.VOLUME = "$.volume";				//成交量
	this.includes.POSITION = "$.position";			//持仓
	this.includes.isType = function( name ){
		return function( obj ){
			return name === typeof( obj );
		}
	}

	this.includes.isFunction = this.includes.isType("function");

	this.includes.isArray = this.includes.isType("array");

	this.includes.idObject = this.includes.isType("object");
	
	this.includes.isString = this.includes.isType("string");
	
	this.includes.isNumber = this.includes.isType("number");
	
	this.includes.getKey = function(){
		var sub = "";
		for(var key in arguments){
			if(!arguments[key]){
				continue;
			}else if(isFunction(arguments[key])){
				sub+="@"+arguments[key]("@@key");
			}else{
				sub+="@"+arguments[key];
			}
		}
		return sub;
	}
	
	this.includes.getValue = function( express, item ){
		var $ = item;
		var value = eval(express);
		return value;
	}
	
	global.isFunction = this.includes.isFunction;
	global.isArray = this.includes.isArray;
	global.idObject = this.includes.idObject;
	global.isString = this.includes.isString;
	global.define = this.includes.define;
	global.middlewear = this.includes.middlewear;
	global.getKey = this.includes.getKey;
	global.getValue = this.includes.getValue;
};