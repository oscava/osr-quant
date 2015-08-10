<<<<<<< HEAD
量化.模型.继承({
	执行:function( current ){
		var ma5 =  当前.简单移动平均(当前.最高价,5)();
		当前.打印(ma5);
=======
Quant.Model.extends({
	nextTick:function( current ){
		//this.llv("$.close",5)();
		this.log(this.llv("$.close",5)(),current.close);
>>>>>>> origin/master
	}
})
