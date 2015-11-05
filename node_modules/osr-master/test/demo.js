var Process = require("../").Process;
var CODE = require("../").CODE;
var Quant = Process.extends({
	onStart:function(){
		var _this = this;
		this.on("config",function(config,handle){
			if(handle){
				this.send(handle,"config-change"+handle);
				this.send("msg","mmmmm",function( data ){
					console.log(":...",data);
				});
			}
		});
		this.on("demo",function(config,handle){
			if(handle){
				this.send(handle,"demo"+handle);
			}
		})
		setTimeout(function(){
			_this.exit();
		},5000);
	}
});

module.exports = exports = new Quant;