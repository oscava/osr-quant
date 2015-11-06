// var abs = function( express ){
	// var key = this.getKey("ABS",express);
	// var _this = this;
	// console.log(this);
	// return function( index ){
		// if("@@key" == index){
			// return key;
		// }
		// var index = index || _this.index;
		// if(index<0){
			// return 0;
		// }
		// var current = _this.kline[index];
		// var value = 0;
		// if("function" == typeof( express )){
			// value = express( index );
		// }else{
			// value = _this.getValue( express , current );
		// }
		// if(isNaN(value) || value == Infinity || value == -Infinity){
			// value = 0;
		// }
		// return Math.abs( value );
	// }
// }

// module.exports = exports = abs;

var abs = function( express , index ){
	var key = this.getKey("ABS",express);
	if( "@key" === index ){
		return key;
	}
	var index = index || this.index;
	var current = this.kline[index];
	var _this = this;
	return function( cb ){
		// cb(null,Math.abs( express ));
		if(isFunction(express)){
			value = express( index );
		}else{
			value = _this.getValue( express, current );
		}
		if(isNaN(value) || value == Infinity || value == -Infinity){
			value = 0;
		}
		cb(null,Math.abs(value));
	}
}

module.exports = abs;