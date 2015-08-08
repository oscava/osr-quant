var buy = function( number ){
	this.publish("buy", { number : number , current: this.current } );
}
module.exports = exports = buy;