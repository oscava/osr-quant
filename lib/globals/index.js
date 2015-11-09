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
	
	this.includes.middlewear = function( express, index, callback ){
		
	}
	
	this.includes.defineApi = function( name , indexPosition ){
		var _this = this;
		return function( express ){
			var key == this.getKey(name,express);
		}
	}
	
	global.isFunction = this.includes.isFunction;
	global.isArray = this.includes.isArray;
	global.idObject = this.includes.idObject;
	global.middlewear = 
};