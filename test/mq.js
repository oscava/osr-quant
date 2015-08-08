var Redis = require("redis");

var client = Redis.createClient();

var data = require("./data");

setInterval(function(){
	var temp = data.shift();
	if(temp){
		client.publish("ZJS-DAY",JSON.stringify(temp),console.log);
	}
},100);