var Class = require("../");

var Person = Class.extends({
	_mustExtend:true,
	$:function( name, sex, age ){
		this._args = arguments;
	}
});

var Boy = Person.extends({
	$:function( name, sex, age ){
		this.boyname = name;
		this.boysex = sex;
		this.boyage = age;
	},
	sayHello:function(){
		console.log("Hi,My name is %s, I'm boy, %s years old",this.boyname,this.boyage);
		console.log(this._args);
	}
})

var boy = new Boy("Tom",1,18);

boy.sayHello();