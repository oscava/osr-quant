var sell = function( number ){
	// this.publish("sell", { number : number , current: this.current } );
	this.messages.push({ method: "sell" , result: { number: number }});
}
module.exports = exports = sell;