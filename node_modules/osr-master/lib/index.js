var Class = require("osr-class");
var child_process = require("child_process");
var Child = require("./child");
var debug = require("debug")("osr-child:main\t");
var Process = require("./process");

var CODE = require("./code");

var OsrMaster = Class.extends({
	$:function(){
		this.childs = {};
		this.childNumber = 0;
	},
	fork:function( file ){
		var _this = this;
		var child = new Child( file );
		child.on("exit",function( process ){
			debug( CODE.EXIT.TEXT, this.pid, this.file );
			delete _this.childs[this.pid];
		});
		child.on("disconnect",function( process ){
			debug( CODE.DISCONNECT.TEXT, this.pid, this.file );
		});
		child.on("connect",function( process ){
			debug( CODE.CONNECT.TEXT, this.pid, this.file )
			_this.childs[this.pid] = this;
		});
		child.fork();
		return child;
	},
	kill:function( pid ){
		this.childs[pid].kill();
	}
});

OsrMaster.Process = Process;

OsrMaster.CODE = CODE;

module.exports = OsrMaster;
