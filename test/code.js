'use strict';
#include operate
#include log
#include math

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

var hhv_5 = yield HHV(CLOSE,5);
var llv_5 = yield LLV(CLOSE,5);
log.info(hhv_5,"\t",llv_5,"\t",current.close);