/**
 * 求改良指数平滑移动平均
 *用法:MEMA(X,N)
 *Y = MEMA(X,N);
 *Y = (X+(N-1)*Y')/N;
 * Created by Administrator on 2015/8/10.
 */
var mema = function (express, number, ext) {
    var key = this.getKey(express, number);
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
        if (_this.datas[key][index]) {
            return _this.datas[key][index];
        }
        var value = 0;
        var current = _this.kline[index];
        var temp = 0;
        if ("function" == typeof(express)) {
            temp = express(index);
        } else if ("string" == typeof(express)) {
            temp = _this.getValue(express, current);
        }
        var _y = _this.datas[key][index - 1] || temp;
        value = (temp + ( number - 1 ) * _y ) /  number;
		if(!value){
			value = temp;
		}
        _this.datas[key][index] = parseFloat(value.toFixed(2));
        return _this.datas[key][index];
    }
};
module.exports = mema;