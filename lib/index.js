/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var Master = require("osr-master");
var Process = Master.Process;
var debug = require("debug")("osr-quant:main\t");
var redis = require("redis");
var Model = require("./model");
var Quant = Process.extends({
	onStart: function(){
		var _this = this;
		this.config = null;
		this.on("config",function( config , handle ){
			this.config = config;
			this.client = redis.createClient(this.config.mQ.url);
			this.client.on("error",function(e){
				_this.send("error",e.message);
			});
			this.client.on("connect",function(){
				_this.send(handle);
			});
			this.model = new Model(this.config.name,config.file);
			debug("[create    ]",this.model.name);
		});
		this.on("start",function( start, handle ){
			this.client.on('message',function( channel, data ){
				// _this.onTick(JSON.parse(data));
				_this.onData( JSON.parse(data) );
			});
			this.client.subscribe(this.config.mQ.channel);
		});
	},
	
	onData:function( current ){
		if("function" == typeof(this.filterData)){
			this.current = this.filterData(current);
		}else{
			this.current = current;
		}
		if(this.current){
			this.onTick( this.current );
		}
	},
	onTick:function( current ){
		this.model.onTick( current );
	}
	
});

var master = null;

Quant.fork = function( file , config ){
	config = config || {};
	config.file = file;
	var child = master.fork( __dirname );
	child.send('config', config , function(){
		child.send('start');
	});
	child.on('tick',function( tick ){
		debug('tick',tick);
	});
	child.on('error',function( err ){
		debug('error',err);
	});
	child.on('exit',function( process ){
		debug('exit',this.pid);
	});
	child.on('connect',function( process ){
		debug('connect',this.pid);
	});
	child.on('disconnect',function( process ){
		debug('disconnect',this.pid);
	});
	child.on('close',function( process ){
		debug('close',this.pid);
	});
	return child;
}

module.exports = Quant;

global.Quant = Quant;

if(!module.parent){
	new Quant();
}else{
	master = new Master();
}