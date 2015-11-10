##OSR-QUANT##
[![NPM](https://nodei.co/npm/osr-quant.png?mini=true)](https://nodei.co/npm/osr-quant/)
###How to use###
	npm install osr-quant

###Example###

	var Quant = require("osr-quant");

	var child = Quant.fork(__dirname+"/code.js",{ mQ:{ url:"redis://127.0.0.1",channel:'ZJS-CURRENT'},name:"CURRENT"});


###Document###

####Quant.fork( filepath, options );
> filepath : 文件名
> 
> options  : 参数

>>mQ
>>>url
>
>>>channel
>
>>name

####CODE格式####

	#include log		//表示引入log包
	#include operate	//表示引入operate包
	#include math		//表示引入math包

	var ...... 			//用JS格式写流程

####Test####

	cd test
	node --harmony server.js
	node --harmony index.js
	