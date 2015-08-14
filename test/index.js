var Cluster = require("osr-cluster");
var Quant = require("../");
var cluster = new Cluster("股指期货");

cluster.on("error",function(processname, message){
	console.log("[-ERROR]","[ FROM:",processname,"]",message);
});

cluster.on("sys",function(processname, message){
	console.log("[SYSTEM]","[ FROM:",processname,"]",message);
});

cluster.on("buy",function(processname, message){
	console.log("[--BUY-]","[ FROM:",processname,"]",message);
})

cluster.on("sell",function(processname, message){
	console.log("[-SELL-]","[ FROM:",processname,"]",message);
})

cluster.on("exit",function(processname, message){
	console.log("[-EXIT-]","[ FROM:",processname,"]",message);
})

cluster.on("log",function(processname, message){
	console.log("[--LOG-]","[ FROM:]",processname,"]",message);
})

cluster.run("IH1508-1M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-2M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-3M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-4M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-5M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-6M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-7M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-8M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-9M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
// cluster.run("IH1508-10M-RGR",__dirname+"/code.js",{ mqSubscribe: "ZJS-DAY", require:[ __dirname+"/../" ],childMain:[__dirname+"/../"]});
