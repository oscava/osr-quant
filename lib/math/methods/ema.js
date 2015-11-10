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
			return value;
		}
		if(undefined != _this.datas[index][key]){
			value = _this.datas[index][key];
		}else{
			var current = _this.kline[index];
			var temp = 0;
			if("function" == typeof(express)){
				temp = express( index );
			}else if("string" == typeof(express)){
				temp = _this.getValue( express, current );
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