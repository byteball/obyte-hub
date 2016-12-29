/*jslint node: true */
"use strict";
require('byteball-relay');
var conf = require('./conf');
var network = require('byteballcore/network');
var eventBus = require('byteballcore/event_bus.js');

eventBus.on('peer_version', function (ws, body) {
	if (body.program == conf.clientName && conf.minClientVersion && compareVersions(body.program_version, conf.minClientVersion) == '<') {
		network.sendJustsaying(ws, 'new_version', {version: conf.minClientVersion});
	}
});


function compareVersions(currentVersion, minVersion) {
	if (currentVersion === minVersion) return '==';

	var cV = currentVersion.match(/([0-9])+/g);
	var mV = minVersion.match(/([0-9])+/g);
	var l = Math.min(cV.length, mV.length);
	var diff;

	for (var i = 0; i < l; i++) {
		diff = parseInt(cV[i], 10) - parseInt(mV[i], 10);
		if (diff > 0) {
			return '>';
		} else if (diff < 0) {
			return '<'
		}
	}

	diff = cV.length - mV.length;
	if (diff == 0) {
		return '==';
	} else if (diff > 0) {
		return '>';
	} else if (diff < 0) {
		return '<';
	}
}