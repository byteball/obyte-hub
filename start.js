/*jslint node: true */
"use strict";
require('byteball-relay');
var conf = require('./conf');
var network = require('byteballcore/network');
var eventBus = require('byteballcore/event_bus.js');
var push = require('./push');
const price_feed = require('./exchange_price_feed');

if (conf.trustedRegistries && Object.keys(conf.trustedRegistries).length > 0)
	require('./asset_metadata.js');

eventBus.on('peer_version', function (ws, body) {
	if (body.program == conf.clientName) {
		if (conf.minClientVersion && compareVersions(body.program_version, conf.minClientVersion) == '<')
			network.sendJustsaying(ws, 'new_version', {version: conf.minClientVersion});
		if (compareVersions(body.program_version, '1.5.1') == '<')
			ws.close(1000, "mandatory upgrade");
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

