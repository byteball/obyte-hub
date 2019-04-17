var db = require('ocore/db');
var conf = require('ocore/conf');
var eventBus = require('ocore/event_bus.js');
var https = require('https');
var apn = require('apn');

var push_enabled = {};
push_enabled['ios'] = !!conf.APNsAuthKey;
push_enabled['android'] = !!conf.pushApiProjectNumber;

var apnsOptions = {
	token: {
		key: conf.APNsAuthKey,
		keyId: conf.keyId,
		teamId: conf.teamId
	},
	production: true
};
if (push_enabled['ios'])
	var apnProvider = new apn.Provider(apnsOptions);

eventBus.on('peer_sent_new_message', function(ws, objDeviceMessage) {
	sendPushAboutMessage(objDeviceMessage.to);
});

eventBus.on("enableNotification", function(deviceAddress, params) {
	if (typeof params == "string") // old clients
		params = {registrationId: params};
	params.platform = params.platform || 'android';
	if (!push_enabled[params.platform])
		return;
	db.query("SELECT device_address FROM push_registrations WHERE device_address=? LIMIT 0,1", [deviceAddress], function(rows) {
		if (rows.length === 0) {
			db.query("INSERT "+db.getIgnore()+" INTO push_registrations (registrationId, device_address, platform) VALUES (?, ?, ?)", [params.registrationId, deviceAddress, params.platform], function() {

			});
		} else if (rows.length) {
			if (rows[0].registration_id !== params.registrationId) {
				db.query("UPDATE push_registrations SET registrationId = ? WHERE device_address = ?", [params.registrationId, deviceAddress], function() {

				})
			}
		}
	});
});

eventBus.on("disableNotification", function(deviceAddress, registrationId) {
	db.query("DELETE FROM push_registrations WHERE registrationId=? and device_address=?", [registrationId, deviceAddress], function() {
	});
});

function sendAndroidNotification(registrationIds) {
	var options = {
		host: 'fcm.googleapis.com',
		port: 443,
		path: '/fcm/send',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'key=' + conf.pushApiKey
		}
	};

	var req = https.request(options, function(res) {
		res.on('data', function(d) {
			if (res.statusCode !== 200) {
				console.log('Error push rest. code: ' + res.statusCode + ' Text: ' + d);
				console.log(registrationIds);
			}
		});
	});
	req.write(JSON.stringify({
		"registration_ids": registrationIds,
		"data": {
			"message": "New message",
			"title": "Obyte",
			"vibrate": 1,
			"sound": 1
		}
	}));
	req.end();

	req.on('error', function(e) {
		console.error(e);
	});
}

function sendiOSNotification(registrationId, msg_cnt) {
	var note = new apn.Notification();

	note.badge = msg_cnt;
	note.sound = "ping.aiff";
	note.alert = "New message";
	note.payload = {'messageFrom': 'Obyte'};
	note.topic = "org.byteball.wallet";

	apnProvider.send(note, registrationId).then((result) => {
	}, function(err) {
		console.error(err);
    });
}

function sendPushAboutMessage(device_address) {
	db.query("SELECT registrationId, platform, COUNT(1) AS `msg_cnt` FROM push_registrations \n\
		JOIN device_messages USING(device_address) \n\
		WHERE device_address=?", [device_address], function(rows) {
		if (rows[0].registrationId && push_enabled[rows[0].platform]) {
			switch (rows[0].platform) {
				case "android":
					sendAndroidNotification([rows[0].registrationId]);
					break;
				case "ios":
					sendiOSNotification(rows[0].registrationId, rows[0].msg_cnt);
					break;
			}
		}
	});
}

exports.sendPushAboutMessage = sendPushAboutMessage;