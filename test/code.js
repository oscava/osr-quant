'use strict';
#include operate
#include log
#include math

var abs_close = yield math.abs( -(yield math.abs(CLOSE)) );

log.info(abs_close);

// log.info(abs_close);
// log.info("===",yield math.abs( CLOSE ));