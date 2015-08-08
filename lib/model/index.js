var Class = require("osr-class");

var Model = Class.extends({
	$:function( process, name, author , money , options){
		this.process = process;
		this.name = name;							//策略名称
		this.author = author;						//作者
		this.money = money;							//钱
		this.aHand = options.aHand || 1;			//手,一手等于多少股票
		this.pctBond = options.pctBond || 1;		//保证金
	},
	receiveData:function(current){
		this.current = current;
		this.nextTick(this.current);
	},
	nextTick:function(current){					//下一刻度
		//执行你的操作
		//买卖
		//画图
		//...And so on
	},
	buy:function(number){						//买
		var price = this.current.last || this.current.close || 0;
		var money = price * this.aHand * this.pctBond;
		if(this.money >= money ){
			this.money -= money;
		}
		this.process.publish("buy",{ number:number , price:price, money:money, myMoney: this.money });
	},
	close:function(direction,number){			//平仓
		
	},
	sell:function(number){						//卖
		
	},
	draw:function(){							//画
		
	},
	text:function(){							//写
		this.process.result.apply(process,arguments);
	},
	log:function(){								//日志
		this.process.log.apply(process,arguments);
	},
	ema:	require("./fns/ema"),				//EMA算法
	sma:	require("./fns/sma"),				//SMA算法
	ma:		require("./fns/ma"),				//MA算法
	slope:	require("./fns/slope"),				//斜率算法
	llv:	require("./fns/llv"),				//最低值
	hhv:	require("./fns/hhv"),				//最高值
});