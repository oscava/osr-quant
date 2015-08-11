/**
 * Created by Administrator on 2015/8/10.
 */
var sma = function (express, number, weight, ext) {
    var key = this.getKey(express, number,weight);
    if (!this.datas[key]) {
        this.datas[key] = [];
    }
    var _this = this;
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
        var _y = _this.datas[key][index - 1] || 0;
        value = (temp * weight + ( number - weight ) * _y ) / number;
        _this.datas[key][index] = parseFloat(value.toFixed(2));
        return _this.datas[key][index];
    }
};
module.exports = sma;