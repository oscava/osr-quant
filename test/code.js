Quant.Model.extends({
	nextTick:function( current ){
		var ma5 =  当前.简单移动平均(当前.最高价,5)();
		this.log(ma5);
	}
})