var text = function(name,express,text,options){
	var value = 0;
	if("function" == typeof(express)){
		value = express();
	}else if("string" == typeof(express)){
		value = this.getValue(express,this.current);
	}else{
		value = express;
	}
	if(value){
		this.publish.apply(this,["text"].concat([name,text,options]));
	}
}

module.exports = exports = text;