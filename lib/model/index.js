var Class = require("osr-class");
var utils = require("../utils");
var Model = Class.extends({
	$:function( process, name, author , money , options){
		this.process = process;
		this.name = name;							//策略名称
		this.index = -1;
		this.kline = [];
		this.datas = {};
		utils.bind(this)();
	},
	receiveData:function(current){
		this.current = current;
		this.kline.push( this.current );
		this.index ++ ;
		// console.log(this.nextTick.toString());
		//this.nextTick( this.current );
		this.nextTick( this.current );
	},
	nextTick:function(current){					//下一刻度
		//执行你的操作
		//买卖
		//画图
		//...And so on
	},
	buy:function(){								//买
		return require("../fns/buy").apply( this, arguments );
	},
	sell:function(){							//卖
		return require("../fns/sell").apply( this, arguments );
	},
	log:function(value){						//日志
		return require("../fns/log").apply( this, arguments );
	},
	publish:function(){							//推送
		return require("../fns/publish").apply( this, arguments );
	},
	getKey:function(){							//得到键
		var sub = "";
		for(var key in arguments){
			if(!arguments[key]){
				continue;
			}else if("function" == typeof(arguments[key])){
				sub += "@" + arguments[key]("@@key");
			}else{
				sub += "@" + arguments[key];
			}
		}
		return sub;
	},
	getValue:function( express, item ){			//得到值
		var $ = item;
		var value = eval(express);
		return value;
	},
	ema:function(){								//EMA
		return require("../fns/ema").apply(this,arguments);
	},
	ma:function(){								//MA
		return require("../fns/ma").apply(this,arguments);
	},
	sma:function(){								//SMA
		return require("../fns/sma").apply(this,arguments);
	},
	abs:function(){								//ABS
		return require("../fns/abs").apply(this,arguments);
	},
	draw:function(){							//DRAW
		return require("../fns/draw").apply(this,arguments);
	},
	hhv:function(){								//HHV
		return require("../fns/hhv").apply(this,arguments);
	},
	llv:function(){								//LLV
		return require("../fns/llv").apply(this,arguments);
	},
	mema:function(){							//MEMA
		return require("../fns/mema").apply(this,arguments);
	},
	close:function(){							//CLOSE
		return require("../fns/close").apply(this,arguments);
	},
	ref:function(){								//REF
		return require("../fns/ref").apply(this,arguments);
	},
	slope:function(){							//SLOPE
		return require("../fns/slope").apply(this,arguments);
	},
	text:function(){							//TEXT
		return require("../fns/text").apply(this,arguments);
	}
});

module.exports = Model;