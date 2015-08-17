var ChildMain = require("osr-cluster/lib/core/process/childmain");
var EventEmitter = require("events").EventEmitter;
var Cluster = require("osr-cluster");
var Redis = require("redis");
var Quant = ChildMain.extends({
	init:function(config){
		this.host = config.host || "localhost";
		this.port = config.port || 6379;
		this.channel = config.channel;
		this.client = Redis.createClient( this.port, this.host );
		var _this = this;
		this.client.subscribe(this.channel,function( channel, datas){
			try{
				datas = JSON.parse( datas );
			}catch(e){
				datas = datas;
			}
			_this.receiveData( datas );
			_this.endSub();
		});
		var messages = {};
	},
	receiveData: function( datas ){
		if(this.myCode){
			this.myCode.receiveData( datas );
		}
	},
	endSub:function(){
		if(this.myCode){
			this.myCode.endSub();
		}
	}
});

Quant.Model = require("./model");

Quant.config = function(config){
	Quant._config = config;
}

Quant.模型 = require("./model");

Quant.模型.继承 = Quant.Model.extends;

global.Quant = Quant;

global.量化 = Quant;

module.exports = exports = Quant;