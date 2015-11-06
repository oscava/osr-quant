var buy = function( number ){
	// this.publish("buy", { number : number , current: this.current } );
	if(!this.preDeal(this.current)){
		return;
	}
	this.messages.push( { method:"buy" , result: { number: number } } );
}
module.exports = exports = buy;