var endSub = function( current ){
	var messages = this.messages || [];
	// messages.push({ method: "current" , value: current });
	messages.splice(0,0,{ method:"current", value: current });
	this.process.publish.apply( this.process , ["messages"].concat( JSON.stringify({ records: messages }) ) );
	this.messages = [];
}

module.exports = exports = endSub;