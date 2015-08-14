var sell = function( number ){
	this.publish("sell", { number : number , current: this.current } );
}
module.exports = exports = sell;