var co = require("co");
var isFunction = function(obj){
    return "function" == typeof(obj);
}
// var abs = function ( express, index ){
    // var _this = this;
    // return function(cb){
        // if(isFunction(express)){
            // // console.log(express._method.())
            // middlewear.bind(_this)(express,index,cb);
        // }else{
            // cb(null, Math.abs(express));
        // }
    // }
// }

// var ma = function( express, number, index ){
    
    // var fn = function( cb ){
        // cb( null, express+number );
    // }
    
    // fn._args = arguments;
    // fn._method = ma;
    
    // return fn;
// }

var define = function( name, dealfn ,indexPosition ){
	indexPosition = indexPosition || 1;
	var _niminfn = function( express , index ){
		index = index || this.index || 1;
		var _this = this;
		var _args = Array.prototype.slice.call(arguments);
		var fn = function(cb){
			// dealfn.bind(this)(fn,cb)
			var args = Array.prototype.slice.call(fn._args);
			args[indexPosition] = index;
			if(isFunction(express)){
				middlewear.bind(_this)(express,index,function(err, mdresult){
					var result = dealfn.apply(_this,[mdresult,index]);
					cb(null,result);
				});
			}else{
				var result = dealfn.apply(_this,args);
				cb(null,result);
			}
		}
		fn._args = arguments;
		fn._method = _niminfn;
		fn._name = name;
		fn._indexposition = indexPosition;
		return fn;
	}
	return _niminfn;
}

var middlewear = function(express,index,callback){
    var args = Array.prototype.slice.apply(express._args);
	args[express._indexposition] = index;
    var method = express._method.apply(this,args);
    method(callback);
}

var abs = define( "abs", function( express, index ){
	return express+index;
},1);

var ma = define("ma", function( express, number, index){
	return number+number;
},2);

co(function *(){
    // var result = yield abs('CLOSE');
	var result = yield abs(ma(5,1));
	// var result = yield ma(5,1);
	return result;
}).then(function( msg ){
    console.log("ok",msg);
},function(err){
    console.log("err",err.stack);
})

