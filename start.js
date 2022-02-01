/*jslint node: true */
"use strict";
var fs = require('fs');
var desktopApp = require('ocore/desktop_app.js');
var appDataDir = desktopApp.getAppDataDir();
var path = require('path');

if (require.main === module && !fs.existsSync(appDataDir) && fs.existsSync(path.dirname(appDataDir)+'/byteball-hub')){
	console.log('=== will rename old hub data dir');
	fs.renameSync(path.dirname(appDataDir)+'/byteball-hub', appDataDir);
}
require('obyte-relay');
require('./arbregistry.js');
var conf = require('./conf');
var network = require('ocore/network');
var eventBus = require('ocore/event_bus.js');
var push = require('./push');
const price_feed = require('./exchange_price_feed');
const startWebserver = require('./webserver.js');

if (conf.trustedRegistries && Object.keys(conf.trustedRegistries).length > 0)
	require('./asset_metadata.js');

eventBus.on('peer_version', function (ws, body) {
	if (body.program == conf.clientName) {
		if (conf.minClientVersion && compareVersions(body.program_version, conf.minClientVersion) == '<')
			network.sendJustsaying(ws, 'new_version', {version: conf.minClientVersion});
		if (compareVersions(body.program_version, '3.0.1') == '<')
			ws.close(1000, "mandatory upgrade");
		if (conf.minClientVersionForChat && compareVersions(body.program_version, conf.minClientVersionForChat) === '<')
			ws.blockChat = true;
	}
});

eventBus.once('connected', function (ws) {
	if (conf.webServerPort) {
		startWebserver();
	}
});

if (conf.known_witnesses)
	eventBus.on('client_logged_in', function(ws){
		network.sendJustsaying(ws, 'known_witnesses', conf.known_witnesses);
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

