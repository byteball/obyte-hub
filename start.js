/*jslint node: true */
"use strict";
require('byteball-relay');
var conf = require('./conf');
var network = require('byteballcore/network');
var eventBus = require('byteballcore/event_bus.js');
var fs = require('fs');

eventBus.on('justsaying', function (ws, data) {
	switch (data.subject) {
		case 'version':
			if (data.body.program == conf.clientName && compareVersions(data.body.program_version, conf.minClientVersion) == '<') {
				network.sendJustsaying(ws, 'newVersion', {});
			}
			break;
	}
});


function compareVersions(currentVersion, minVersion) {
	if (currentVersion === minVersion) return '==';

	var cV = currentVersion.replace(/(\.0+)+$/, '').split('.');
	var mV = minVersion.replace(/(\.0+)+$/, '').split('.');
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