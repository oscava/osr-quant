var Class = require("osr-class");
var Ocp = require("osr-childprocess");
var Script = require("vm").Script;
var zmq = require("zmq");
var Quant = Class.extends({
	$:function( name , cp){
		this.name = name;
		this.cp = cp ;
	},
	init:function(config){
		this.sub = zmq.socket("sub");
		this.config = config;
		this.subscribe = config.subscribe;
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
		this.sub.connect(this.subscribe.url);
		this.sub.subscribe(this.subscribe.channel);
	},
	publish:function(){
		// console.log(arguments);
		// this.cp.publish(message)
		this.cp.publish.apply(this.cp,arguments);
	}
});

Quant.start = function( name, config ){
	var ocp = new Ocp( name );
	ocp.start( __dirname, config );
	return ocp;
}

Quant.Model = require("./model");

global.Quant = Quant;

module.exports = exports = Quant;