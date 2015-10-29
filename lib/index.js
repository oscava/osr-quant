var Class = require("osr-class");
var Ocp = require("osr-childprocess");
var Script = require("vm").Script;
var ioredis = require("ioredis");
var Quant = Class.extends({
	$:function( cp ){
		this.cp = cp ;
	},
	init:function(config){
		this.sub = new ioredis( config.mqurl || "redis://127.0.0.1:6379/2" );
		this.config = config;
		var _this = this;
		if(!config.code){
			throw new Error("请提供执行代码");
		}
		this.code = "var MyCode = "+ config.code;
		this.script = new Script(this.code);
		this.script.runInThisContext();
		this.myCode = new MyCode( this );
		if(this.myCode instanceof Quant.Model){
			this.myCode.init( this.config );
		}else{
			throw new Error("代码容器不是继承于Quant.model的")
		}
		this.sub.on("message",function( channel, message ){
			_this.myCode.receiveData( JSON.parse(message) );
		});
		this.sub.subscribe(config.channel);
	},
	publish:function(result){
		// console.log(arguments);
		// this.cp.publish(message)
		// this.cp.publish.apply(this.cp,arguments);
		// this.cp.publish("::normal",{ method : "quant" , result: result});
		this.cp.publish("::normal",{method: "quant" ,result:result});
	}
});

Quant.start = function( name, config , basedir){
	var ocp = new Ocp( name ,{ basedir: basedir || __dirname + "/../tmp"});
	config.main = __dirname;
	config.name = "quant::"+ocp.name;
	ocp.start( config );
	return ocp;
}

Quant.Model = require("./model");

global.Quant = Quant;

module.exports = exports = Quant;