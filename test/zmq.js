var zmq = require("zmq");

var pub = zmq.socket("pub");

pub.bindSync("tcp://127.0.0.1:2223");

var index = 0;

setInterval(function(){
	index += 0.01
	pub.send(["demo",JSON.stringify({ high : index, low: index, open: index, close: index, volume: index })]);
},1000)