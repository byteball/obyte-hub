/*jslint node: true */
"use strict";
var check_daemon = require('byteballcore/check_daemon.js');

check_daemon.checkDaemonAndRestart('node start.js', 'node start.js > log');

