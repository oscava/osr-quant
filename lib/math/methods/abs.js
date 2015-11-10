/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var abs = function(express){
	var key = getKey("ABS",express);
	var _this = this;
	return function(index){
		if("@@key"==index){
			return key;
		}
		var cb,
			value = 0;
		if(isFunction(index)){
			cb = index;
			index = _this.index;
		}
		if(index<0){
			if(cb){
				cb( null, value);
			}
			return value;
		}
		if(undefined != _this.datas[index][key]){
			value = _this.datas[index][key];
		}else{
			var current = _this.kline[index] || _this.current;
			if(isFunction(express)){
				value = express(index);
			}else if(isString(express)){
				value = getValue(express,current);
			}else if(isNumber(express)){
				value = express;
			}
			value = Math.abs(value);
			if(isNaN(value) || Infinity == value || -Infinity == value){
				value = 0;
			}
			_this.datas[index][key] = value;
		}
		if(cb){
			cb(null,value);
		}
		return value;
	}
}

module.exports = express = abs;