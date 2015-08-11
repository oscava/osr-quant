Quant.Model.extends({
	nextTick:function( current ){
		//this.llv("$.close",5)();
		this.log(this.llv("$.close",5)(),current.close);
	}
})