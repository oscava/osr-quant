// var co = require("co");
// var isFunction = function(obj){
    // return "function" == typeof(obj);
// }
// // var abs = function ( express, index ){
    // // var _this = this;
    // // return function(cb){
        // // if(isFunction(express)){
            // // // console.log(express._method.())
            // // middlewear.bind(_this)(express,index,cb);
        // // }else{
            // // cb(null, Math.abs(express));
        // // }
    // // }
// // }

// // var ma = function( express, number, index ){
    
    // // var fn = function( cb ){
        // // cb( null, express+number );
    // // }
    
    // // fn._args = arguments;
    // // fn._method = ma;
    
    // // return fn;
// // }

// var define = function( name, dealfn ,indexPosition ){
	// indexPosition = indexPosition || 1;
	// var _niminfn = function( express , index ){
		// index = index || this.index || 1;
		// var _this = this;
		// var _args = Array.prototype.slice.call(arguments);
		// var fn = function(cb){
			// // dealfn.bind(this)(fn,cb)
			// var args = Array.prototype.slice.call(fn._args);
			// args[indexPosition] = index;
			// if(isFunction(express)){
				// middlewear.bind(_this)(express,index,function(err, mdresult){
					// var result = dealfn.apply(_this,[mdresult,index]);
					// cb(null,result);
				// });
			// }else{
				// var result = dealfn.apply(_this,args);
				// cb(null,result);
			// }
		// }
		// fn._args = arguments;
		// fn._method = _niminfn;
		// fn._name = name;
		// fn._indexposition = indexPosition;
		// return fn;
	// }
	// return _niminfn;
// }

// var middlewear = function(express,index,callback){
    // var args = Array.prototype.slice.apply(express._args);
	// args[express._indexposition] = index;
    // var method = express._method.apply(this,args);
    // method(callback);
// }

// var abs = define( "abs", function( express, index ){
	// return express+index;
// },1);

// var ma = define("ma", function( express, number, index){
	// return number+number;
// },2);

// co(function *(){
    // // var result = yield abs('CLOSE');
	// var result = yield abs(ma(5,1));
	// // var result = yield ma(5,1);
	// return result;
// }).then(function( msg ){
    // console.log("ok",msg);
// },function(err){
    // console.log("err",err.stack);
// })

var _kline = [{
	open:12.5,
	close:-13.8,
	high:14.0,
	low:11.2
}];

var _index = 0;

var _current = _kline[_index];

var co = require("co");

var isFunction = function(obj){
	return "function" == typeof(obj);
}

var isString = function(obj){
	return "string" == typeof(obj);
}

var getValue = function( express, item ){
	var $ = item;
	var value = eval(express);
	return value;
}

var abs = function( express ){
	var key = "abs";
	return function(index,cb){
		if("@@key" == index){
			return key;
		}
		if(isFunction(index)){
			cb = index;
			index = _index;
		}else{
			index = index || _index;
		}
		var value;
		var current = _kline[index] || _current;
		if(isFunction(express)){
			return express( index, function( err, value ){
				cb( err, Math.abs(value));
			});
		}else if(isString(express)){
			value = getValue( express, current );
		}else{
			value = Math.abs(express);
		}
		return cb(null, value);
	}
}

var ma = function( express, number ){
	var key = "ma";
	var _this = this;
	return function( index ){
		var cb;
		if(isFunction(index)){
			cb = index;
			index = _this.index;
		}else{
			index = index || _this.index;
		}
		var value = 0;
		var _temp = index - number + 1;
		var array = _this.kline.slice( _temp < 0 ? 0 : _temp, index + 1 );
		var temp = 0;
		array.forEach(function(item,itemIndex){
			var sub = 0;
			if(isFunction(express)){
				sub = express( index - number + itemIndex + 1);
			}else{
				sub = getValue( express, item );
			}
			if(sub){
				temp += sub;
			}
		});
		value = temp / number;
		if(isNaN(value) || Infinity == value || -Infinity == value){
			value = temp;
		}
		if(cb){
			cb(null, value);
		}
		return value;
	}
}

co(function*(){
	
	var a = yield ma( abs('$.close'),5);
	console.log(a);
	
}).then(function( msg ){
	console.log("msg",msg);
},function(err){
	console.log(err.stack);
});
