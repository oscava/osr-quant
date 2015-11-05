###OSR-CHILD###

####How to use####

	npm install osr-master

####Example####
#####index.js#####

	var OsrMaster = require("../");

	var master = new OsrMaster();
	
	var child = master.fork(__dirname+"/demo.js");
	
	// child.send(OsrMaster.CODE.CONFIG.CODE,{
		// appid:"appid...",
		// appkey:"appkey...",
	// });
	
	child.send("config",{
		appid:"appid",
		appkey:"appkey"
	});

#####demo.js#####

	
	var Process = require("../").Process;
	var CODE = require("../").CODE;
	var Quant = Process.extends({
		onStart:function(){
			var _this = this;
			this.on("config",function(config){
				console.log("..config",config);
			});
			setTimeout(function(){
				_this.exit();
			},5000);
		}
	});
	
	module.exports = exports = new Quant;


####Console####

	..config { appid: 'appid', appkey: 'appkey' }