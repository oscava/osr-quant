var publish = function(){
	var array = Array.prototype.slice.call(arguments);
	var channel = array.shift();
	var message = [];
	array.forEach(function(item,index){
		if("object" == typeof(item)){
			message.push(JSON.stringify(item));
		}else{
			message.push(item);
		}
	});
	this.process.publish.apply(this.process,[channel].concat(message));
}

module.exports = exports = publish;