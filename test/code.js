'use strict';
#include operate
#include log
#include math

[condition("buy",
	[function(){
		var time = Date.now();
		return time % 10 == 0;
	},
	function(){
		var time = Date.now();
		return time % 5 == 0;
	}]
)];

[condition("sell",[
	function(){
		var time = Date.now();
		return time % 10 == 0;
	},
	function(){
		var time = Date.now();
		return time % 3 == 0;
	}
])];

// var abs_close = yield math.abs( -(yield math.abs(CLOSE)) );

// log.info(abs_close,current);

// var close_5 = yield math.ABS( CLOSE );
// log.info("ABS_CLOSE_5\t",close_5);
// var ma_5 = yield math.MA(math.ABS( OPEN ),5);
// log.info("MA_CLOSE_5\t",ma_5);
// var ema_open_5 = yield math.EMA( math.ABS(OPEN), 5);
// log.info("EMA_OPEN_5\t",ema_open_5,'\t',current.open);
// log.info(abs_close);
// log.info("===",yield math.abs( CLOSE ));

// var hhv_5 = yield HHV(CLOSE,5);
// var llv_5 = yield LLV(CLOSE,5);
// var ref_1 = yield REF(CLOSE,1);
// var ref_close_5 = yield REF(HHV(CLOSE,5),1);
// log.info(hhv_5,"\t",llv_5,"\t",current.close,"\t",ref_1,"\t",ref_close_5);

// var mema_5 = yield MEMA(CLOSE,5);

// var sma_5 = yield SMA(CLOSE,5,1);

// var cross = yield CROSS(OPEN,CLOSE);

// log.info(current.close,"\t",mema_5,"\t",sma_5,"\t",cross,current.open,current.close);

var slope = yield SLOPE(CLOSE,5);

Me.BUY(1);
Me.SELL(1);
Me.CLOSE(1,-1);

// Log.info(slope);