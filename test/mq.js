var Redis = require("redis");

// host:		"120.24.95.74",
	// port:		6379

var client = Redis.createClient(6379,"120.24.95.74");

var data = require("./data");

setInterval(function(){
	var temp = data.shift();
	if(temp){
		client.publish("demo1",JSON.stringify(temp),console.log);
		// client.publish("ZJS-REALTIME-IH1508",JSON.stringify(temp),console.log);
	}
},500);