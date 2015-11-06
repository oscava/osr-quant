var hhv = function( express , number ){
	var key = this.getKey("HHV",express,number);
	if(!this.datas[key]){
		this.datas[key] = [];
	}
	var _this = this;
	number = number || 5;
	return function( index ){
		if("@@key" == index){
			return key;
		}
		var index = index || _this.index;
		if(_this.datas[key][index]!=undefined){
			return _this.datas[key][index];
		}
		if(index<0){
			return 0;
		}
		var _temp =  index - number + 1;
		var array = _this.kline.slice( _temp < 0 ? 0 :_temp, index +1  );
		var value;
		array.forEach(function(item,itemIndex){
			var sub = 0;
			if("function" == typeof(express)){
				sub = express( index - itemIndex + 1 );
			}else{
				sub = _this.getValue( express, item );
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
		_this.datas[key][index] = parseFloat(value.toFixed(2));
		return _this.datas[key][index];
	}
}

module.exports = hhv;