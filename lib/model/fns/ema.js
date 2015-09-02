var EMA = function(express, number, ext ){
	var key = this.getKey( express , number );
	if(!this.datas[key]){
		this.datas[key] = [];
	}
	var _this = this;
	number = number || 5;
	return function( index ){
		if("@@key" == index){
			return key;
		}
		var index = index || _this.index ;
		if(_this.datas[key][index]){
			return _this.datas[key][index];
		}
		var value = 0;
		var current = _this.kline[index];
		var temp = 0;
		if("function" == typeof(express)){
			temp = express( index );
		}else if("string" == typeof(express)){
			temp = _this.getValue( express, current );
		}
		var _y = _this.datas[key][ index - 1 ] || temp;
		value = ( 2 * temp + ( number -1 ) * _y ) / ( number+1 );
		_this.datas[key][index] = parseFloat(value.toFixed(2));
		return _this.datas[key][index];
	}
}
module.exports = EMA;