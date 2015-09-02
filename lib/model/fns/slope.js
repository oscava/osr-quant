/**
 * Created by Administrator on 2015/8/10.
 */
var slope = function (express, number) {
    var key = this.getKey("SLOPE", express, number);
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
        var _temp = index - number + 1;
        if(_temp<0){
            return 0;
        }
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
                value = _this.getValue(express, item);
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
        _this.datas[key][index] = b;
        return _this.datas[key][index].toFixed(3);
    }
};

module.exports = exports = slope;