/**
 * Created by Administrator on 2015/8/10.
 */
var cross = function (express, express2) {
    var key = this.getKey("CROSS", express, express2);
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
        if (index < 1) {
            return 0;
        }
        var current = _this.kline[index];
        var result;
        var expvl1,expvc1;
        var expvl2,expvc2;
        if ("function" == typeof (express)) {
            expvc1 = express(index);
            expvl1 = express(index - 1);

        } else if ("string" == typeof (express)) {
            expvc1 = _this.getValue(express, current);
            expvl1 = _this.getValue(express, _this.kline[index - 1]);
        }

        if ("function" == typeof (express2)) {
            expvc2 = express2(index);
            expvl2 = express2(index - 1);
        } else if ("string" == typeof (express2)) {
            expvc2 = _this.getValue(express2, current);
            expvl2 = _this.getValue(express2, _this.kline[index - 1]);
        }
        if (expvl1 < expvl2 && expvc1 > expvc2 ) {
            result = 1;//上穿成功
        } else {
            result = 0;//上穿失败
        }
        _this.datas[key][index] = result;
        return _this.datas[key][index];
    }
};
module.exports = exports = cross;