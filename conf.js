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


exports.initial_witnesses = !process.env.testnet ? [
	'DXYWHSZ72ZDNDZ7WYZXKWBBH425C6WZN',
	'2TO6NYBGX3NF5QS24MQLFR7KXYAMCIE5',
	'FOPUBEUPBC6YLIQDLKL6EW775BMV7YOH',
	'GFK3RDAPQLLNCMQEVGGD2KCPZTLSG3HN',
	'JMFXY26FN76GWJJG7N36UI2LNONOGZJV',
	'I2ADHGP4HL6J37NQAD73J7E5SKFIXJOT',
	'4GDZSXHEFVFMHCUCSHZVXBVF5T2LJHMU',
	'JPQKPRI5FMTQRJF4ZZMYZYDQVRD55OTC',
	'APABTE2IBKOIHLS2UNK6SAR4T5WRGH2J',
	'FAB6TH7IRAVHDLK2AAWY5YBE6CEBUACF',
	'TKT4UESIKTTRALRRLWS4SENSTJX6ODCW',
	'UE25S4GRWZOLNXZKY4VWFHNJZWUSYCQC'
]
: [
	'2FF7PSL7FYXVU5UIQHCVDTTPUOOG75GX',
	'2GPBEZTAXKWEXMWCTGZALIZDNWS5B3V7',
	'4H2AMKF6YO2IWJ5MYWJS3N7Y2YU2T4Z5',
	'DFVODTYGTS3ILVOQ5MFKJIERH6LGKELP',
	'ERMF7V2RLCPABMX5AMNGUQBAH4CD5TK4',
	'F4KHJUCLJKY4JV7M5F754LAJX4EB7M4N',
	'IOF6PTBDTLSTBS5NWHUSD7I2NHK3BQ2T',
	'O4K4QILG6VPGTYLRAI2RGYRFJZ7N2Q2O',
	'OPNUXBRSSQQGHKQNEPD2GLWQYEUY5XLD',
	'PA4QK46276MJJD5DBOLIBMYKNNXMUVDP',
	'RJDYXC4YQ4AZKFYTJVCR5GQJF5J6KPRI',
	'WELOXP3EOA75JWNO6S5ZJHOO3EYFKPIR'
];

exports.initial_peers = [
	process.env.testnet ? 'wss://obyte.org/bb-test' : 'wss://obyte.org/bb'
];

exports.trustedRegistries = {
	'AM6GTUKENBYA54FYDAKX2VLENFZIMXWG': { name: 'market' },
	'O6H6ZIFI57X3PLTYHOCVYPP5A553CYFQ': { name: 'DTR', allow_updates: true },
};

exports.known_witnesses = process.env.testnet ? null : {
	'BVVJ2K7ENPZZ3VYZFWQWK7ISPCATFIW3': {
		name: "Founder's BVV witness and accredited investor attestor",
	},
	'DJMMI5JYA5BWQYSXDPRZJVLW3UGL3GJS': {
		name: "Founder's DJM witness",
	},
	'FOPUBEUPBC6YLIQDLKL6EW775BMV7YOH': {
		name: "Founder's FOPU witness and Bitcoin oracle",
	},
	'GFK3RDAPQLLNCMQEVGGD2KCPZTLSG3HN': {
		name: "Founder's GFK witness and flight delays oracle",
	},
	'H5EZTQE7ABFH27AUDTQFMZIALANK6RBG': {
		name: "Founder's H5 witness and email attestor",
	},
	'I2ADHGP4HL6J37NQAD73J7E5SKFIXJOT': {
		name: "Founder's IA2 witness and real name attestor",
	},
	'JEDZYC2HMGDBIDQKG3XSTXUSHMCBK725': {
		name: "Founder's JED witness and Steem attestor",
	},
	'JPQKPRI5FMTQRJF4ZZMYZYDQVRD55OTC': {
		name: "Founder's JPQ witness and price oracle",
	},
	'OYW2XTDKSNKGSEZ27LMGNOPJSYIXHBHC': {
		name: "Founder's OYW witness",
	},
	'S7N5FE42F6ONPNDQLCF64E2MGFYKQR2I': {
		name: "Founder's S7 witness",
	},
	'TKT4UESIKTTRALRRLWS4SENSTJX6ODCW': {
		name: "Founder's TKT witness and sport oracle",
	},
	'UENJPVZ7HVHM6QGVGT6MWOJGGRTUTJXQ': {
		name: "Founder's UEN witness and username attestor",
	},
	'MEJGDND55XNON7UU3ZKERJIZMMXJTVCV': {
		name: "byteball.fr",
	},
	'4GDZSXHEFVFMHCUCSHZVXBVF5T2LJHMU': {
		name: "Rogier Eijkelhof",
		url: "https://medium.com/obyte/first-decentralized-witness-candidate-rogier-eijkelhof-9e5619166334"
	},
	'FAB6TH7IRAVHDLK2AAWY5YBE6CEBUACF': {
		name: "Fabien Marino",
		url: "https://medium.com/obyte/second-independent-witness-candidate-fabien-marino-d4e8dccadee"
	},
	'2TO6NYBGX3NF5QS24MQLFR7KXYAMCIE5': {
		name: "Bosch Connectory Stuttgart",
		url: "https://medium.com/@stgtconnectory/autonomous-auctioneer-stuttgart-connectory-hackathon-e5a703c6217a#2cc1"
	},
	'DXYWHSZ72ZDNDZ7WYZXKWBBH425C6WZN': {
		name: "Bind Creative",
		url: "https://medium.com/obyte/bind-creative-announces-candidacy-to-become-obyte-witness-c06109bf8de1"
	},
	'4FIZC3KZ3ZQSSVOKFEUHKCTQWAWD6YMF': {
		name: "Raivo Malter",
		url: "https://medium.com/obyte/raivo-malter-announces-candidacy-to-become-obyte-witness-a7f7471cef4e"
	},
	'IMMP5FWQXY6IZ53OIYQ46PHSI5T3MAYQ': {
		name: "Demelza Hays",
	},
	'25XDFVFRP7BZ2SNSESFKUTF52W42JCSL': {
		name: "Brad Morrison",
	},
	'APABTE2IBKOIHLS2UNK6SAR4T5WRGH2J': {
		name: "PolloPollo",
		url: "https://medium.com/obyte/dlt-based-charity-platform-pollopollo-announces-candidacy-to-become-obyte-witness-7dc60480684f"
	},
	'UE25S4GRWZOLNXZKY4VWFHNJZWUSYCQC': {
		name: "Institute For the Future at University of Nicosia",
		url: "https://medium.com/@klitos/the-institute-for-the-future-iff-at-the-university-of-nicosia-announces-candidacy-to-become-an-ec5a3342070b"
	},
	'JMFXY26FN76GWJJG7N36UI2LNONOGZJV': {
		name: "Cryptoshare Studio",
		url: "https://bbfans.org/2020/04/27/a-brief-introduction-to-cryptoshare-studio/"
	},
	'FL3LIHRXYE6PS7AADJLDOYZKDO2UVVNS': {
		name: "Travin Keith",
		url: "https://medium.com/@TravinKeith/obyte-order-provider-candidacy-7b81e2860cd5"
	},
	'QR542JXX7VJ5UJOZDKHTJCXAYWOATID2': {
		name: "Bittrex",
	},
};

exports.arbstores = {'5OISSD4XXDPGDPKLEKKHABUHX5CXLM6H': 'https://testnet.arbstore.org'};

console.log('finished hub conf');
