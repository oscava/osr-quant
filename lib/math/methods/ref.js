/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var ref = function (express, number) {
	number = number || 5;
    var key = getKey("REF", express, number);
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
				cb( null, value );
			}
			return value;
		}
        var refObj = _this.kline[index - number];
        if (!refObj) {
            return 0;
        }
        if (undefined != _this.datas[index][key]) {
            value = _this.datas[index][key];
        }else{
			if (index < number - 1) {
				return 0;
			}
			if (isFunction(express)) {
				value = express(index - number);
			} else if(isString(express)){
				value = getValue(express, refObj);
			}
			_this.datas[index][key] = parseFloat(value.toFixed(2));
		}
        if(cb){
			cb(null,value);
		}
        return value;
    }
};

module.exports = ref;