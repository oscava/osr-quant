/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var hhv = function( express , number ){
	number = number || 5;
	var key = getKey("HHV",express,number);
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
			var _temp =  index - number + 1;
			var array = _this.kline.slice( _temp < 0 ? 0 :_temp, index +1  );
			var value;
			array.forEach(function(item,itemIndex){
				var sub = 0;
				// if("function" == typeof(express)){
				if(isFunction(express)){
					sub = express( index - itemIndex + 1 );
				}else if(isString(express)){
					sub = getValue( express, item );
				}else{
					sub = express;
				}
				if (value!=0 && !value) {
					value = sub;
				}
				if( sub > value){
					value = sub;
				}
			});
			if(isNaN(value) || value == Infinity || value == -Infinity){
				value = temp;
			}
			value = parseFloat(value.toFixed(2));
			_this.datas[index][key] = value;
		}
		if(cb){
			cb( null, value);
		}
		return value;
	}
}

module.exports = hhv;