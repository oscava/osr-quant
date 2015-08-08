Quant.Model.extends({
	nextTick:function( current ){
		this.log(this.ma(this.hhv("$.close",5),5)(),current.close);
	}
})