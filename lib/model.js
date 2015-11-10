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
		var _condition = [];
		this.kline = [];
		_script.push("co(function *(){");
		this.index = -1;
		this.datas = [];
		this.defaultInclude();
		while(true){
			var item = contents.shift();
			if(null == item)break;
			if(0 == item.indexOf("#include")) this.include(item);
			else if(0 == item.indexOf("condition")) _condition.push(item);
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
	condition:function( condition ){
		if(!this.conditions) this.conditions = [];
	},
	
	onTick:function( current ){
		this.kline.push(current);
		this.datas.push({});
		this.includes.current = current;
		this.current = current;
		this.includes.co = require("co");
		this.index++;
		var sandbox = new vm.createContext(this.includes);
		this.script.runInContext(sandbox);
		this.endTick();
	},
	
	endTick:function(){
		
	}
	
});

module.exports = Module;