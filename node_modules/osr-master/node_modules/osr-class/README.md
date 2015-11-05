##OSR-CLASS

###How to use

### osr-class 4 nodejs
####npm
	npm install osr-class

### osr-class 4 browser
####bower
	bower insall osr-class

>本Class库中，使用$作为构造函数

###Example
	
	var Class = require("osr-class");
	
	var Person = Class.extends({
		name:"person",
		sex:1,
		age:28,
		//构造函数
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

###Console
	Hello , My name is Tom, I'm 16 years old, I'm boy, I like playing football
	---> play
	I'm playing football
	Hello , My name is Marry, I'm 14 years old, I'm girl, I like singing
	---> sing
	I'm singing