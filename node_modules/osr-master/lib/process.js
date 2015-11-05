var Class = require("osr-class");
var CODE = require("./code");
var debug = require("debug")("osr:child:process\t");
var EventEmitter = require("events").EventEmitter;
var Emitter = Class.extends(EventEmitter);
var Process = Emitter.extends({
	$:function(){
		var _this = this;
		process.on("message",function( data ){
			debug(data);
			switch( data.event ){
				case CODE.START.CODE:
					_this.start();
					break;
				case CODE.EXIT.CODE:
					process.kill(process.pid);
					break;
				case CODE.CONFIG.CODE:
					if(_this.onConfig)_this.onConfig(data.result);
					break;
				default:
					_this.emit(data.event, data.result , data.handle );
					break;
			}
		});
	},
	send:function( event, msg , cb){
		var handle = event+"@"+Date.now();
		process.send({ event:event, result:msg , handle });
		if("function" == typeof(cb)){
			this.once(handle,cb);
		}
		
	},
	start:function(){
		debug(CODE.START.TEXT,process.pid,Date.now());
		this.emit(CODE.START.CODE,process.pid);
		if(this.onStart){
			this.onStart();
		}
	},
	exit:function(){
		process.kill(process.pid);
	}
});

module.exports = Process;