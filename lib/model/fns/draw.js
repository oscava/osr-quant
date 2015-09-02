var draw = function(name,express,options){
	var value = 0;
	if("function" == typeof(express)){
		value = express();
	}else{
		value = this.getValue(express,this.current);
	}
	// this.publish.apply(this,["draw"].concat([name,options]));
	//value: value, name: name, options: options
	this.messages.push({ method: "draw" , result: { value: value, name: name, options: options } });
}

module.exports = exports = draw;