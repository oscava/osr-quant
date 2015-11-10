var llv = function (express, number) {
	number = number || 5;
    var key = getKey("LLV", express, number);
    var _this = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
		var cb,
			value = null;
		if(isFunction(index)){
			cb = index;
			index = _this.index;
		}
        if (index < 0) {
            return 0;
        }
		if(undefined != _this.datas[index][key]){
			value = _this.datas[index][key];
		}else{
			var _temp =  index - number + 1;
			var array = _this.kline.slice( _temp < 0 ? 0 :_temp, index +1  );
			array.forEach(function (item, itemIndex) {
				var sub = 0;
				if ("function" == typeof(express)) {
					sub = express(index - itemIndex + 1);
				} else {
					sub = getValue(express, item);
				}
				if (value!=0 && !value) {
					value = sub;
				}
				if (sub < value) {
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
			cb( null, value );
		}
        return value;
    }
}

module.exports = llv;