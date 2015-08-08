var log = function(){
	var array = Array.prototype.slice.call(arguments);
	this.publish.apply(this,["log"].concat(array));
}

module.exports = exports = log;