'use strict';
#include operate
#include log
#include math

// var abs_close = yield math.abs( -(yield math.abs(CLOSE)) );

// log.info(abs_close,current);

var close_ma5 = yield math.ma( CLOSE , 5 );

log.info(close_ma5);

// log.info(abs_close);
// log.info("===",yield math.abs( CLOSE ));