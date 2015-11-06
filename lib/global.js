global.isType = function( name ){
	return function( obj ){
		return name === typeof( obj );
	}
}

global.isFunction = global.isType("function");

global.isArray = global.isType("array");

global.idObject = global.isType("object");