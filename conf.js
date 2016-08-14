/*jslint node: true */
"use strict";

//exports.port = 6611;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = true;
exports.bLight = false;

// this is used by wallet vendor only, to redirect bug reports to developers' email
exports.bug_sink_email = 'admin@example.org';
exports.bugs_from_email = 'bugs@example.org';


exports.storage = 'sqlite';


exports.initial_witnesses = [
	"I4Z7KFNIYTPHPJ5CA5OFC273JQFSZPOX",
	"IKSAOGAJOMQ3DBWEJ3RLGQH3CZJRWIMD",
	"MIUV2XGJWIFGRXJR63U4YXHCHNPAWIZ3",
	"MO7ZZIU5VXHRZGGHVSZWLWL64IEND5K2",
	"O5DGBG7G7E4DTTT6UQN3NAN5EJSEZ5SP",
	"OVOBPP6OBCFKOHO64WM3VTULS7SCFCU2",
	"T2J7GTIC5N4BTNT7CRN5QD2OK4CZOQHF",
	"VDPIDXY7QZ7CEICV3KSN3BZSRI4JXCPB",
	"VM7PQNEBINI3JDWSI4ECOFBYR7OCV4K4",
	"WHKHIP3S3P25MWWGXXNHF6UCZCCVVACY",
	"Z6GRORIFI4NTB6ANZAOSXVZGGGQCOSWW",
	"ZX3BFE6PA5INOAHLTFWQVB7KIKTXYDAY"
];

exports.initial_peers = [
	'wss://byteball.org/bb'
];

console.log('finished hub conf');
