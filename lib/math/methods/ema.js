/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var EMA = function(express, number ){
	number = number || 5;
	var key = getKey("EMA",express,number);
	var _this = this;
	return function( index ){
		if("@@key" == index){
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
				cb(null,value);
			}
			return value;
		}
		if(undefined != _this.datas[index][key]){
			value = _this.datas[index][key];
		}else{
			var current = _this.kline[index];
			var temp = 0;
			// if("function" == typeof(express)){
			if(isFunction(express)){
				temp = express( index );
			}else if(isString(express)){
				temp = _this.getValue( express, current );
			}else{
				temp = express;
			}
			var _y =  (index <= 0 ? 0 : _this.datas[ index - 1 ][key]) || temp;
			value = ( 2 * temp + ( number -1 ) * _y ) / ( number+1 );
			if(isNaN(value) || value == Infinity || value == -Infinity){
				value = temp;
			}
			value = parseFloat(value.toFixed(2));
			_this.datas[index][key] = value;
		}
		if(cb){
			cb( null, value );
		}
		return value;
	}
}
module.exports = EMA;