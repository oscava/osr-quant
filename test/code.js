Quant.Model.extends({
	preDeal:function( current ){
		var date = new Date(current.time);
		return date.getSeconds()%10 == 0;
	},
	nextTick:function( current ){
		this.buy(3);
		this.sell(3);
		this.close(1,2);
		this.close(-1,2);
		// this.draw("Name",this.ma("$.close",5),{});
	}
})