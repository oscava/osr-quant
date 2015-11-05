var Class = require("../");
var EventEmitter = require("events").EventEmitter;

var Person = Class.extends({
	name:"person",
	sex:1,
	age:28,
	$:function(inobj,pm2){
		for(var key in inobj){
			this[key] = inobj[key];
		}
		this.pm2 = pm2
	},
	sayHello:function(msg){
		console.log("Hello , My name is %s, I'm %s years old, I'm %s, %s",this.name,this.age,this.sex == 0? "girl" : "boy" ,msg);
		console.log("--->",this.pm2)
	}
});

var Boy = Person.extends({
	name:"boy",
	sex:1,
	sayHello:function(){
		this.super("sayHello",arguments);
		this.play();
	},
	play:function(){
		console.log("I'm playing football")
	}
})

var Girl = Person.extends({
	name:"girl",
	sex:0,
	sayHello:function(){
		this.super("sayHello",arguments);
		this.sing();
	},
	sing:function(){
		console.log("I'm singing");
	}
})

var Tom = new Boy({
	name:"Tom",
	age:16
},"play")

Tom.sayHello("I like playing football");

var Marry = new Girl({
	name:"Marry",
	age:14
},"sing")

Marry.sayHello("I like singing");

var Emitter = Class.extends(EventEmitter);

var Emitter1 = Emitter.extends({
	$:function(){
		this.on("jj",function(){
			console.log(arguments);
		});
	},
	doJJ:function(){
		this.emit("jj",Date.now());
	}
});

var Emitter2 = Emitter1.extends({
	
});

var jj2 = new Emitter2();

jj2.doJJ();

// var CallMe = Emitter.extends({
	// ring:function(from){
		// this.emit("ring",from);
	// },
	// handUp:function(){
		// this.isAnswer = false;
		// this.emit("handup");
	// },
	// answer:function(msg){
		// this.emit("answer",msg);
	// }
// })

// var callme = new CallMe();
// callme.on("ring",function(from){
	// this.from = from;
	// if(from=="Tom"){
		// this.handUp();
	// }else{
		// this.isAnswer = true;
		// console.log("me->%s:Oh , Hello, %s",from,from);
	// }
// });

// callme.on("handup",function(){
	// console.log("me:Handup,Keep doing my thing.");
// })

// callme.on("answer",function(msg){
	// if(!this.isAnswer){
		// console.log("me->%s:Already hand up ~",this.from);
		// return;
	// }
	// if(msg=="Borrow money"){
		// this.handUp();
	// }else{
		// console.log("%s->me:%s",this.from,msg);
		// console.log("me->%s: Hello,%s",this.from,msg);
	// }
// })

// callme.ring("Tom");
// callme.answer("How are u !");
// callme.ring("Marry");
// callme.answer("How are u !");
// callme.answer("Borrow money");

