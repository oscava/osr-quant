var debug = require("debug")('osr-child:STATUS-CODE');
var CODE = {};

var index = 0;

var DISCONNECT  = "[disconnect]";
var EXIT		= "[exit      ]";
var CONNECT		= "[connect   ]";
var START 		= "[start     ]";
var CONFIG		= "[config    ]";

Object.defineProperty(CODE,"DISCONNECT",{
	get:function(){
		if(!this._disconnect){
			this._disconnect = ++index;
		}
		return { CODE: this._disconnect, TEXT: DISCONNECT }
	}
});

Object.defineProperty(CODE,"EXIT",{
	get:function(){
		if(!this._exit){
			this._exit = ++index;
		}
		return { CODE: this._exit , TEXT: EXIT }
	}
});

Object.defineProperty(CODE,"CONNECT",{
	get:function(){
		if(!this._connect){
			this._connect = ++index;
		}
		return { CODE: this._connect, TEXT: CONNECT}
	}
});

Object.defineProperty(CODE,"START",{
	get:function(){
		if(!this._start){
			this._start = ++index;
		}
		return { CODE: this._start, TEXT: START }
	}
});

Object.defineProperty(CODE,"CONFIG",{
	get:function(){
		if(!this._config){
			this._config = ++index;
		}
		return { CODE: this._config, TEXT: CONFIG };
	}
});

debug(CODE.DISCONNECT);
debug(CODE.EXIT);
debug(CODE.CONNECT);
debug(CODE.START);
debug(CODE.CONFIG);



module.exports = CODE;