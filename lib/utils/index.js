var utils = function(){
	this.最高价 = "$.high";
	this.最低价 = "$.low";
	this.收盘价 = "$.close";
	this.开盘价 = "$.open";
	this.简单移动平均 = this.ma;
	this.普通指数平滑 = this.ema;
	this.加权指数平滑 = this.sma;
	this.改良指数平滑 = this.mema;
	this.开多单 = this.buy;
	this.开空单 = this.sell;
	this.平仓 = this.close;
	this.绝对值 = this.abs;
	this.最高值 = this.hhv;
	this.最低值 = this.llv;
	this.前N个周期 = this.ref;
	this.线性回归率 = this.slope;
	this.打印 = this.log;
	this.nextTick = this.执行;
	global.当前 = this;
	global.打印 = function(){
		当前.打印.bind(当前).apply(当前,arguments);
	}
	global.最高价 = "$.high";
	global.最低价 = "$.low";
	global.收盘价 = "$.close";
	global.开盘价 = "$.open";
}

module.exports = exports = utils;