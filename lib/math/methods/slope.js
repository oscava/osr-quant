/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:18:14
	-------------------------------------------------------------
*/
var slope = function (express, number) {
	number = number || 5;
    var key = getKey("SLOPE", express, number);
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
		var _temp = index - number + 1;
		if( _temp < 0 ){
			if(cb){
				cb( null, value );
			}
			return value;
		}
		if(undefined != _this.datas[index][key]){
			value = _this.datas[index][key];
		}else{
			var array = _this.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
			var ytotal = 0;
			var xtotal = 0;
			var _index = 0;
			var xavg = 0;
			var yavg = 0;
			var fmsum = 0;
			var fzsum = 0;
			var tempArray = [];
			array.forEach(function (item, itemIndex) {
				if ("function" == typeof(express)) {
					value = express(index - number + itemIndex + 1);
				} else if ("string" == typeof (express)) {
					value = getValue(express, item);
				}
				ytotal += value;
				tempArray.push(value);
				_index++;
				xtotal += _index;
			});
			yavg = ytotal / number;
			xavg = xtotal / number;
			tempArray.forEach(function (item, tempIndex) {
				var x = tempIndex + 1;
				var y = item;
				fzsum += (x - xavg) * (y - yavg);
				fmsum += Math.pow((x - xavg), 2);
			});
			var b = fzsum / fmsum;
			var a = yavg - (b * xavg);
			// _this.datas[key][index] = b;
			_this.datas[index][key] = value = b;
		}
        if(cb){
			cb( null, value );
		}
        return value;
    }
};

module.exports = exports = slope;