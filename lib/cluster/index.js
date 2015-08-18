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
			oauth: this.config.oauth
		};
		this.channels = {};
	},
	run:function( name, codes ){
		var _this = this;
		if(!this.clientPublish){
			this.clientPublish = Redis.createClient( this.mq.port, this.mq.host );
			if(this.mq.oauth){
				this.clientPublish.oauth( this.mq.oauth );
			}
		}
		if(!this.clientSubscirbe){
			this.clientSubscirbe = Redis.createClient( this.mq.port, this.mq.host );
			if(this.mq.oauth){
				this.clientSubscirbe.oauth( this.mq.oauth );
			}
			this.clientSubscirbe.on("message",function( channel, message ){
				var process = channel.substr(channel.indexOf(".")+1);
				message = JSON.parse( message );
				_this.emit( message.event, process, message.message );
			});
		}
		var data = { cmd: "process.new", name: name, codes: codes, config : { require: [ "osr-quant" ], childmain: "osr-quant", channel:"Hello" } };
		this.clientPublish.publish("clustermaster",JSON.stringify( { cmd: "process.kill", name:name } ));
		this.clientPublish.publish("clustermaster",JSON.stringify( data ));
		var channelname = "childprocess."+name;
		if(!this.channels[channelname]){
			this.clientSubscirbe.subscribe(channelname);
			this.channels[channelname] = true;
		}
		
	}
});

module.exports = exports = Cluster;