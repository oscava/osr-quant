var Redis = require("redis");

var client = Redis.createClient();

var data = require("./data");

setInterval(function(){
	var temp = data.shift();
	if(temp){
		client.publish("Hello",JSON.stringify(temp),console.log);
		// client.publish("ZJS-REALTIME-IH1508",JSON.stringify(temp),console.log);
	}
},500);