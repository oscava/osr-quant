var co = require("co");
var isFunction = function(obj){
    return "function" == typeof(obj);
}
var abs = function ( express, index ){
    var _this = this;
    return function(cb){
        if(isFunction(express)){
            // console.log(express._method.())
            middlewear.bind(_this)(express,index,function( err, result ){
                cb( null, Math.abs( result ));
            });
        }else{
            cb(null, Math.abs(express));
        }
    }
}

var ma = function( express, number, index ){
    
    var fn = function( cb ){
        cb( null, express+number );
    }
    
    fn._args = arguments;
    fn._method = ma;
    
    return fn;
}

var middlewear = function(express,index,callback){
    var args = Array.prototype.slice.apply(express._args);
    args.concat(index);
    var method = express._method.apply(this,args);
    method(callback);
}

co(function *(){
    var result = yield abs(ma(5,-8),1);
    console.log(result);
}).then(function( msg ){
    console.log("ok",msg);
},function(err){
    console.log("err",err);
})

