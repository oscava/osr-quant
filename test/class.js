var Class = require("osr-class");

var ClassC = Class.extends({
	
})

var ClassA = Class.extends({
	sayHello:function(){
		
	}
});

var ClassB = ClassA.extends({
	sayHello2:function(){
		
	}
})

var b = new ClassB({});

console.log(typeof(b),b instanceof ClassB, b instanceof ClassA,b instanceof ClassC);