var log = function(){
	var array = Array.prototype.slice.call(arguments);
	// this.publish.apply(this,["log"].concat(array));
	this.messages.push( { method: "log", message: array.join(" ") } );
}

module.exports = exports = log;