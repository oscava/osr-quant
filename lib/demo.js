'use strict';
#include operate
#include log
#include math

var abs_close = yield math.abs( '$.close' );
// var mema_abs_close = yield math.mema(math.abs('$.close'));

log.info(abs_close);
// log.info(mema_abs_close);