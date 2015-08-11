/**
 * Created by Administrator on 2015/8/10.
 */
var ref = function (express, number) {
    var key = this.getKey("REF", express, number);
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
        var refObj = _this.kline[index - number];
        if (!refObj) {
            return 0;
        }
        if (_this.datas[key][index] != undefined) {
            return _this.datas[key][index];
        }
        if (index < number - 1) {
            return 0;
        }
        if ("function" == typeof(express)) {
            value = express(index - number);
        } else {
            value = _this.getValue(express, refObj);
        }
        _this.datas[key][index] = value;
        return _this.datas[key][index];
    }
};

module.exports = ref;