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
		
	this.includes.define = function( name, dealfn, indexPosition ){
		indexPosition = indexPosition || 1;
		var method = function( express ){
			var index = parseInt(arguments[arguments.length-1]);
			index = index || this.index || 0 ;
			var _this = this;
			var _args = Array.prototype.slice.call(arguments);
			var _key = getKey( express );
			var _current = this.kline[index] || this.current;
			var fn = function(cb){
				if("@@key" === cb){
					console.log(key);
					return _key;
				}
				if(!_this.datas[index]){
					_this.datas[index] = [];
				}
				if(_this.datas[index][_key]){
					cb(null,_this.datas[index][_key]);
					return;
				}
				var args = Array.prototype.slice.call(fn._args);
				args[indexPosition] = index;
				if(isFunction(express)){
					middlewear.bind(_this)(express,index,function(err,mdresult){
						var result = dealfn.apply(_this,[mdresult,index]);
						cb(null,result);
					});
				}else if(isString(express)){
					// cb(null,getValue(express,_current));
					var result = dealfn.apply(_this,args);
					cb(null,result);
				}else{
					var result = dealfn.apply(_this,args);
					cb(null,result);
				}
			}
			fn._args = arguments;
			fn._method = method;
			fn._name = name;
			fn._indexPosition = indexPosition;
			return fn;
		}
		return method;
	}
	
	this.includes.middlewear = function( express, index, callback ){
		var args = Array.prototype.slice.apply( express._args );
		args[express._indexPosition] = index;
		var method = express._method.apply(this,args);
		method(callback);
	}
	
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