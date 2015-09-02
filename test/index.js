var Quant = require("../");
var fs = require('fs');
var ocp = Quant.start( "IH1508", { code: fs.readFileSync("./code.js").toString(), subscribe: { url: "tcp://127.0.0.1:5112", channel: "demo" } });

ocp.on("event",function(type, msg){
	console.log("--->", type, msg);
	if(type=="childprocess"){
		console.log(JSON.parse(msg));
	}
	// ocp.stop();
})