var close = function( direction, number ){
	// this.publish("close",{ direction: direction == "多单"?1:-1 ,number: number });
	this.messages.push({ method: "close" , result: { direction: direction, number :number } });
}
module.exports = close;
