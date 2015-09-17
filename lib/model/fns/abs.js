var abs = function( express ){
	var key = this.getKey("ABS",express);
	var _this = this;
	return function( index ){
		if("@@key" == index){
			return key;
		}
		var index = index || _this.index;
		if(index<0){
			return 0;
		}
		var current = _this.kline[index];
		var value = 0;
		if("function" == typeof( express )){
			value = express( index );
		}else{
			value = _this.getValue( express , current );
		}
		if(isNaN(value) || value == Infinity){
			value = 0;
		}
		return Math.abs( value );
	}
}

module.exports = exports = abs;