'use strict';
var expressApp=require('./expressApp.js').ini_express();

const debug = require('debug')('express-test:server');

var server;
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);

}


var port=3000;
server = require('http').createServer(expressApp);

server.listen(port);
//server.on('error', onError);
server.on('listening', onListening);
console.log('listening at:', port);



