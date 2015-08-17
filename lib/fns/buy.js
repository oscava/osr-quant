var buy = function( number ){
	// this.publish("buy", { number : number , current: this.current } );
	this.messages.push( {method:"buy", number: number } );
}
module.exports = exports = buy;