var redis = require("redis");

var client = redis.createClient();

var close = 0;
var open = 0;
var high = 0;
var low = 0;

var random = function( min, max ){
	return Number.parseFloat((min+Math.random()*(max-min)).toFixed(2));
}

setInterval(function(){
	if(!open){
		open = random(50,100);
	}else{
		open = close;
	}
	close = random(open-open*.1,open+open*.1);
	var high = random(open-open*.1,open+open*.1);
	var low = random(open-open*.1,open+open*.1);
	var min = Math.min.apply(null,[open,close,high,low]);
	var max = Math.max.apply(null,[open,close,high,low]);
	var item = { time:Date.now(), open: open, high: max, low: min, close: close };
	client.publish("ZJS-CURRENT",JSON.parse(item));
},1000);