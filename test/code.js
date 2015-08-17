量化.模型.继承({
	名字:	"测试案例1",
	optdata:function( datas ){
		return datas;
	},
	执行: function( current ){
		this.draw("MACLOSE5",this.ma(收盘价,5));
	}
});