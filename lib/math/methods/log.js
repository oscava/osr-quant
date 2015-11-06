var log = function(){
	var array = Array.prototype.slice.call(arguments);
	var temp = [];
	array.forEach(function(item,index){
		if("object" == typeof(item)){
			temp.push(JSON.stringify(item));
		}else{
			temp.push(item);
		}
	})
	this.messages.push( { method: "log", result : temp.join(" ") } );
}

module.exports = exports = log;