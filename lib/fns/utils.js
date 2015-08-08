module.exports.getKey = function(){
	var sub = "";
    for(var key in arguments){
        if(!arguments[key]){
            continue;
        }else if("function" == typeof(arguments[key])){
            sub += "@" + arguments[key]("@@key");
        }else{
            sub += "@" + arguments[key];
        }
    }
    return sub;
}