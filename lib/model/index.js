var Class = require("osr-class");

var Model = Class.extends({
	messages:[],
	datas:{},
	index: -1,
	kline:[],
	maxLength:2500,
	$:function( main ){
		this.main = main;
	},
	init:function( config ){
		this.config = config;
	},
	checkData:function(){
		if(this.kline.length>this.maxLength){
			var index = this.kline.length - this.maxLength;
			this.kline.splice(0,index);
			for(var key in this.datas){
				this.datas[key].splice(0,index);
			}
			this.index = this.index - index;
		}
	},
	receiveData:function( message ){
		this.messages = [];
		if(this.dataprocessing){
			message = this.dataprocessing( message );
		}
		if(message){
			this.kline.push(message);
			this.index ++ ;
			this.current = message;
			this.nextTick( this.current );
			this.endTick( this.current );
		}
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
	nextTick:function( current ){
		
	},
	endTick:function(){
		return require("./fns/endTick").apply(this,arguments);
	},
	log:function(){
		return require("./fns/log").apply(this,arguments);
	},
	abs:function(){
		return require("./fns/abs").apply(this,arguments);
	},
	buy:function(){
		return require("./fns/buy").apply(this,arguments);
	},
	close:function(){
		return require("./fns/close").apply(this,arguments);
	},
	cross:function(){
		return require("./fns/cross").apply(this,arguments);
	},
	draw:function(){
		return require("./fns/draw").apply(this,arguments);
	},
	ema:function(){
		return require("./fns/ema").apply(this,arguments);
	},
	hhv:function(){
		return require("./fns/hhv").apply(this,arguments);
	},
	llv:function(){
		return require("./fns/llv").apply(this,arguments);
	},
	ma:function(){
		return require("./fns/ma").apply(this,arguments);
	},
	mema:function(){
		return require("./fns/mema").apply(this,arguments);
	},
	ref:function(){
		return require("./fns/ref").apply(this,arguments);
	},
	sell:function(){
		return require("./fns/sell").apply(this,arguments);
	},
	slope:function(){
		return require("./fns/slope").apply(this,arguments);
	},
	sma:function(){
		return require("./fns/sma").apply(this,arguments);
	},
	sum:function(){
		return require("./fns/sum").apply(this,arguments);
	},
	text:function(){
		return require("./fns/text").apply(this,arguments);
	}
});

module.exports = exports = Model;