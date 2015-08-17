量化.模型.继承({
	名字:	"测试案例1",
	optdata:function( datas ){
		console.log("优化数据");
		return datas;
	},
	执行: function( current ){
		this.buy(3);
	}
});