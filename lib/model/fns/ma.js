var ma = function (express, number) {
    var key = this.getKey("MA", express, number);
    if (!this.datas[key]) {
        this.datas[key] = [];
    }
    var _this = this;
    number = number || 5;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        var index = index || _this.index;
        if (_this.datas[key][index] != undefined) {
            return _this.datas[key][index];
        }
        var value = 0;
        var _temp =  index - number + 1;
        var array = _this.kline.slice( _temp < 0 ? 0 :_temp, index +1  );
        var temp = 0;
        array.forEach(function (item, itemIndex) {
            var sub = 0;
            if ("function" == typeof(express)) {
                sub = express(index - number + itemIndex + 1);
            } else {
                sub = _this.getValue(express, item);
            }
            if (sub) {
                temp += sub;
            }
        });
        value = temp / number;
		if(isNaN(value) || value == Infinity || value == -Infinity){
			value = temp;
		}
        _this.datas[key][index] = parseFloat(value.toFixed(2));
        return _this.datas[key][index];
    }
}

module.exports = exports = ma;