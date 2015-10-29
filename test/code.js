Quant.Model.extends({
	preCondition:function( current ){
		console.log(current.time);
		return false;
	},
	nextTick:function( current ){
		this.buy(3);
		this.sell(3);
		this.close(1,2);
		this.close(-1,2);
		this.draw("Name",this.ma("$.close",5),{});
	}
})