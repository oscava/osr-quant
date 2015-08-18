var Class = require("osr-class");
var Emitter = Class.extends(require("events").EventEmitter);

var Process = Emitter.extends({
	$:function(name){
		this.name = name;
	},
	run:function(){
		this.start();
	},
	exit:function(){
		this.emit("event","exit",this.name);
	},
	start:function(){
		this.emit("event","start",this.name);
	}
});

var Main = Emitter.extends({
	$:function(name){
		this.name = name;
		this.processes = {};
	},
	createProcess:function(name){
		var _this = this;
		if(!this.processes[name]){
			this.processes[name] = new Process(name);
			this.processes[name].on("event",function( event,name ){
				if("exit" == event){
					_this.processes[name] = null;
					delete _this.processes[name];
				}
				console.log("-->",event,name);
			})
			this.processes[name].run();
		}
	},
	killProcess:function(name){
		if(!!this.processes[name]){
			this.processes[name].exit();
		}
	}
});

var fn = function(cb){
	cb(null,"Hello");
};

var main = new Main("demo")

setInterval(function(){
	main.killProcess("hello");
	main.createProcess("hello");
	console.log("------");
},2000);