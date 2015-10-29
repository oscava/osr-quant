var ioredis = require("ioredis");

var pub = new ioredis("redis://127.0.0.1:6379/2");

var index = 0;

setInterval(function(){
	index += 0.01
	pub.publish("demo",JSON.stringify({ high : index, low: index, open: index, close: index, volume: index }),console.log);
},1000)