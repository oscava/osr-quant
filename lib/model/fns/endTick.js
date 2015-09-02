var endTick = function( current ){
	var messages = this.messages || [];
	// messages.push({ method: "current" , value: current });
	messages.splice(0,0,{ method:"current", result : current });
	this.main.publish.call( this.main , JSON.stringify(messages) );
	this.messages = [];
}

module.exports = exports = endTick;