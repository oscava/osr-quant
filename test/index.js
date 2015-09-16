var Quant = require("../");
var fs = require('fs');
var ocp = Quant.start( "IH1508", { code: fs.readFileSync("./code.js").toString(), mqurl: "redis://127.0.0.1:6379/2" , channel: "demo" } );

ocp.on("event",function(type, msg){
	console.log("--->", type, msg);
});

ocp.on("sys",function(type,msg){
	console.log("---+",type,msg);
})