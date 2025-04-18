var db = require('ocore/db');
var conf = require('ocore/conf');
var eventBus = require('ocore/event_bus.js');
var https = require('https');
var apn = require('apn');

var push_enabled = {};
push_enabled['ios'] = !!conf.APNsAuthKey;
push_enabled['android'] = !!conf.pushApiProjectNumber;
push_enabled['firebase'] = push_enabled['android'] && !!conf.pushApiBothFirebase;

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
	if (!params)
		return console.log("no params in enableNotification")
	if (typeof params == "string") // old clients
		params = {registrationId: params};
	else if (typeof params !== "object")
		return console.log("invalid params in enableNotification", params);
	params.platform = params.platform || 'android';
	if (typeof params.registrationId !== 'string' || typeof params.platform !== 'string')
		return console.log('invalid registrationId or platform in enableNotification', params);
	if (!push_enabled[conf.pushApiBothFirebase ? 'firebase' : params.platform])
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
	if (typeof registrationId !== 'string')
		return console.log('invalid registrationId in disableNotification', registrationId);
	db.query("DELETE FROM push_registrations WHERE registrationId=? and device_address=?", [registrationId, deviceAddress], function() {
	});
});

function sendFirebaseNotification(registrationIds, message, msg_cnt) {
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
			if (res.statusCode !== 200)
				console.log('Error push rest. code: ' + res.statusCode + ' Text: ' + d, registrationIds);
		});
	});
	var payload = {
		"registration_ids": registrationIds,
		"content_available": true, // wakes the app, needed for iOS
		//"collapse_key": "New message", // groups notification as one
		"data": {
			"message": "New message",
			"title": "Obyte",
			"vibrate": 1,
			"sound": 1
		}
	};
	if (message && message.pubkey) {
		payload.data.pubkey = message.pubkey;
	}
	if (conf.pushApiBothFirebase) {
		payload.notification = {
			"title": "Obyte", // not visible on iOS phones and tablets.
			"body": "New message",
			"badge": msg_cnt // iOS only
		};
	}
	req.write(JSON.stringify(payload));
	req.end();

	req.on('error', function(e) {
		console.log('firebase error', e);
	});
}

function sendiOSNotification(registrationId, message, msg_cnt) {
	console.log('sending ios push notification', registrationId, message, msg_cnt);
	var note = new apn.Notification();

	note.badge = msg_cnt;
	note.sound = "ping.aiff";
	note.alert = "New message";
	note.payload = {'messageFrom': 'Obyte'};
	if (message && message.pubkey) {
		note.payload.pubkey = message.pubkey;
	}
	note.topic = conf.bundleId || "org.byteball.wallet";

	apnProvider.send(note, registrationId).then((result) => {
		if (result.failed && result.failed.length)
			console.log('sending ios push: result failed', result.failed);
		else
			console.log('successfully sent ios push', result);
	}, function(err) {
		console.log('sending ios push failed', err);
    });
}

function sendPushAboutMessage(device_address) {
	db.query("SELECT registrationId, platform, message, COUNT(1) AS `msg_cnt` FROM push_registrations \n\
		JOIN device_messages USING(device_address) \n\
		WHERE device_address=?", [device_address], function(rows) {
		var platform = conf.pushApiBothFirebase ? 'firebase' : rows[0].platform;
		if (rows[0].registrationId && push_enabled[platform]) {
			var last_message;
			try {
				last_message = JSON.parse(rows[0].message);
			}
			catch (err) { }
			switch (platform) {
				case "firebase":
				case "android":
					sendFirebaseNotification([rows[0].registrationId], last_message, rows[0].msg_cnt);
					break;
				case "ios":
					sendiOSNotification(rows[0].registrationId, last_message, rows[0].msg_cnt);
					break;
			}
		}
		else
			console.log(`${device_address} not registered for push`);
	});
}

exports.sendPushAboutMessage = sendPushAboutMessage;