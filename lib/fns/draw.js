var draw = function(name,express,options){
	var value = 0;
	if("function" == typeof(express)){
		value = express();
	}else{
		value = this.getValue(express,this.current);
	}
	this.publish.apply(this,["draw"].concat([name,options]));
}

module.exports = exports = draw;