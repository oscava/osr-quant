/**
 * Created by Administrator on 2015/8/10.
 */
var cross = function (express, express2) {
    var key = getKey("CROSS", express, express2);
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
        if (index < 1) {
			if(cb){
				cb( null, value );
			}
            return 0;
        }
		if(undefined != _this.datas[index][key]){
			value = _this.datas[index][key];
		}else{
			var current = _this.kline[index];
			var result;
			var expvl1,expvc1;
			var expvl2,expvc2;
			if (isFunction(express)) {
				expvc1 = express(index);
				expvl1 = express(index - 1);

			} else if (isString(express)) {
				expvc1 = getValue(express, current);
				expvl1 = getValue(express, _this.kline[index - 1]);
			}
			if (isFunction(express2)) {
				expvc2 = express2(index);
				expvl2 = express2(index - 1);
			} else if (isString(express2)) {
				expvc2 = getValue(express2, current);
				expvl2 = getValue(express2, _this.kline[index - 1]);
			}
			if (expvl1 < expvl2 && expvc1 > expvc2 ) {
				result = 1;//上穿成功
			} else {
				result = 0;//上穿失败
			}
			_this.datas[index][key] = value = result;
		}
        if(cb){
			cb(null, value);
		}
        return value;
    }
};
module.exports = exports = cross;