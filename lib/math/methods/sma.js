/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var sma = function ( express, number, weight ) {
	number = number || 5;
	weight = weight || 1;
    var key = getKey(express, number,weight);
    var _this = this;
    return function (index) {
        if ("@@key" == index) {
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
			if (isFunction(express)) {
				temp = express(index);
			} else if (isString(express)) {
				temp = getValue(express, current);
			}
			var _y = ( index < 1 ? 0 : _this.datas[index - 1][key] ) || temp;
			value = (temp * weight + ( number - weight ) * _y ) / number;
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
};
module.exports = sma;