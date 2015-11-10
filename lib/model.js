/**
	-------------------------------------------------------------
						Author:	cava.zhang
						Email:	admin@cavacn.com
						Date:	2015-11-10 14:17:343
	-------------------------------------------------------------
*/
var Class = require("osr-class");
var vm = require("vm");
var Script = require("vm").Script;
var fs = require("fs");

var Module = Class.extends({
	
	defaultInclude:function(){
		this.include("#include math");
		this.include("#include log");
		this.include("#include operate");
		this.include("#include globals");
	},
	$:function( name , file ){
		this.file = file;
		this.name = name;
		var filecontent = fs.readFileSync( this.file ).toString();
		var _this = this;
		var contents = filecontent.split("\r\n");
		var _script = [];
		// var _condition = [];
		this.kline = [];
		_script.push("co(function *(){");
		this.index = -1;
		this.datas = [];
		this.conditions = {};
		this.messages = [];
		this.defaultInclude();
		while(true){
			var item = contents.shift();
			if(null == item)break;
			if(0 == item.indexOf("#include")) this.include(item);
			// else if(0 == item.indexOf("condition")) _condition.push(item);
			else _script.push(item);
		}
		_script.push("}).catch(function(err){log.error(err.stack)})");
		this.script = new Script( _script.join("\r\n") , { filename: name +".vm" } );
	},
	include: function( include ){
		if(!this.includes) this.includes = { };
		var _module = include.split(" ")[1];
		this[_module] = require("./"+_module).apply(this);
		this.includes[_module] = this[_module];
	},
	condition:function( type, condition ){
		var _this = this;
		if(isFunction(condition)){
			condition = [condition];
		}
		if(!this.conditions[type]){
			this.conditions[type] = {};
		}
		condition.forEach(function(item,index){
			_this.conditions[type][item.toString()] = item;
		});
	},
	
	doCondition:function( type ){
		for(var key in this.conditions[type]){
			var f = this.conditions[type][key]( this.current );
			if(!f)return false;
		}
		return true;
	},
	
	onTick:function( current ){
		this.kline.push(current);
		this.datas.push({});
		this.includes.current = current;
		this.includes.$ = current;
		this.includes.condition = this.condition.bind(this);
		this.current = current;
		this.includes.co = require("co");
		this.index++;
		var sandbox = new vm.createContext(this.includes);
		this.script.runInContext(sandbox);
		this.endTick();
	},
	
	endTick:function(){
		console.log(this.messages);
	}
	
});

module.exports = Module;