var close = function( number ){
	this.publish("close", { number : number , current: this.current } );
}
module.exports = exports = close;