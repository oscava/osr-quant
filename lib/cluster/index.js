var OSRCluster = require("osr-cluster");
var Class = require("osr-class");
var Redis = require("redis");
var Emitter = Class.extends(require("events").EventEmitter);
var Cluster = Emitter.extends({
	$:function( config ){
		this.config = config || {};
		this.mq = {
			host: this.config.host || "127.0.0.1",
			port: this.config.port || 6379,
			auth: this.config.auth
		};
		this.channels = {};
	},
	
	stop:function( name ){
		var _this = this;
		if(!this.clientPublish){
			this.clientPublish = Redis.createClient( this.mq.port, this.mq.host );
			if(this.mq.auth){
				this.clientPublish.auth( this.mq.auth );
			}
		}
		if(!this.clientSubscirbe){
			this.clientSubscirbe = Redis.createClient( this.mq.port, this.mq.host );
			if(this.mq.auth){
				this.clientSubscirbe.auth( this.mq.auth );
			}
			this.clientSubscirbe.on("message",function( channel, message ){
				var process = channel.substr(channel.indexOf(".")+1);
				message = JSON.parse( message );
				_this.emit( message.event, process, message.message );
			});
		}
		var channelname = "childprocess."+name;
		if(!this.channels[channelname]){
			this.clientSubscirbe.subscribe(channelname);
			this.channels[channelname] = true;
		}
		this.clientPublish.publish("clustermaster",JSON.stringify( { cmd: "process.kill", name:name } ));
	},
	restart:function( name, codes, mq ){
		var _this = this;
		this.stop( name );
		setTimeout(function(){
			_this.run( name, codes, mq );
		},2000);
	},
	run:function( name, codes , mq){
		var _this = this;
		mq = mq || {};
		if(!this.clientPublish){
			this.clientPublish = Redis.createClient( this.mq.port, this.mq.host );
			if(this.mq.auth){
				this.clientPublish.auth( this.mq.auth );
			}
		}
		if(!this.clientSubscirbe){
			this.clientSubscirbe = Redis.createClient( this.mq.port, this.mq.host );
			if(this.mq.auth){
				this.clientSubscirbe.auth( this.mq.auth );
			}
			this.clientSubscirbe.on("message",function( channel, message ){
				var process = channel.substr(channel.indexOf(".")+1);
				message = JSON.parse( message );
				_this.emit( message.event, process, message.message );
			});
		}
		var channelname = "childprocess."+name;
		if(!this.channels[channelname]){
			this.clientSubscirbe.subscribe(channelname);
			this.channels[channelname] = true;
		}
		var data = { cmd: "process.new", name: name, codes: codes, config : { require: [ "osr-quant" ], childmain: "osr-quant", channel: mq.channel, host:mq.host, port:mq.port,auth:mq.auth } };
		_this.clientPublish.publish("clustermaster",JSON.stringify( data ));
	}
});

module.exports = exports = Cluster;