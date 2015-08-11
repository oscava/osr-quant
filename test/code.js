Quant.Model.extends({
    nextTick: function (current) {
        //this.llv("$.close",5)();
        //this.log(this.slope('$.close',5)(), current.close, current.open);
        this.log("-->" + this.slope('$.close', 5)()/*,current.close*/);
        //this.log("-->" + this.sma('$.close', 5,3)()/*,current.close*/);
        //this.log("++>" + this.mema('$.close', 5,1)()/*,current.close*/);
    }
});