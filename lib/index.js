var ChildMain = require("osr-cluster/lib/core/process/childmain");
var Cluster = require("osr-cluster");
var Redis = require("redis");
var Quant = ChildMain.extends({
	init:function(config){
		this.host = config.host || "localhost";
		this.port = config.port || 6379;
		this.channel = config.channel;
		this.client = Redis.createClient( this.port, this.host );
		var _this = this;
		this.client.subscribe(this.channel);
		this.client.on("message",function( channel, datas){
			try{
				datas = JSON.parse( datas );
			}catch(e){
				datas = datas;
			}
			if(_this.myCode && _this.myCode.optdata){
				datas = _this.myCode.optdata( datas );
			}
			if(datas!=null){
				_this.receiveData( datas );
				_this.endSub( datas );
			}
		});
		var messages = {};
	},
	receiveData: function( datas ){
		if(this.myCode){
			this.myCode.receiveData( datas );
		}
	},
	endSub:function( datas ){
		if(this.myCode){
			this.myCode.endSub( datas );
		}
	}
});

Quant.Model = require("./model");

Quant.config = function(config){
	Quant._config = config;
}

Quant.Cluster = require("./cluster");

Quant.模型 = require("./model");

Quant.模型.继承 = Quant.Model.extends;

global.Quant = Quant;

global.量化 = Quant;

module.exports = exports = Quant;