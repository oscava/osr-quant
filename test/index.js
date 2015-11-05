var Quant = require("../");

var child = Quant.fork(__dirname+"/code.js",{ mQ:{ url: "redis://127.0.0.1/2", channel: "ZJS-CURRENT" }});
