/*jslint node: true */
"use strict";

exports.clientName = 'byteball';
exports.minClientVersion = '3.3.1';
exports.minClientVersionForChat = '3.0.3';

// https://console.developers.google.com
exports.pushApiProjectNumber = 0;
exports.pushApiKey = '';

// iOS Push Notifications APNS config
exports.APNsAuthKey = ''; // *.p8 filepath or buffer with key itself
exports.keyId = '';
exports.teamId = '';

exports.port = 6611;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = true;
exports.bSaveJointJson = true;
exports.bLight = false;

// this is used by wallet vendor only, to redirect bug reports to developers' email
exports.bug_sink_email = ''; // 'admin@example.org';
exports.bugs_from_email = ''; // 'bugs@example.org';

exports.HEARTBEAT_TIMEOUT = 300*1000;

exports.storage = 'sqlite';


exports.initial_witnesses = [
	'ZQFHJXFWT2OCEBXF26GFXJU4MPASWPJT'
];

exports.trustedRegistries = [
    'ZQFHJXFWT2OCEBXF26GFXJU4MPASWPJT'
];

exports.arbstores = {'CLNGEQDVKE3IXZXPYARS4MJCQA4BKYPB': 'https://arbstore.org'};

console.log('finished hub conf');
