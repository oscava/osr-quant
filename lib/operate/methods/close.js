var close = function( direction , number ){
	this.messages.push({ method: "close", direction: direction, number: number });
}
module.exports = close;