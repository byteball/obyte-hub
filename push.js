var db = require('byteballcore/db');
var conf = require('byteballcore/conf');
var eventBus = require('byteballcore/event_bus.js');
var https = require('https');
var apn = require('apn');

var apnsOptions = {
  token: {
    key: conf.APNsAuthKey,
    keyId: conf.keyId,
    teamId: conf.teamId
  },
  production: false
};
var apnProvider = new apn.Provider(apnsOptions);

eventBus.on('peer_sent_new_message', function(ws, objDeviceMessage) {
	sendPushAboutMessage(objDeviceMessage.to);
});

eventBus.on("enableNotification", function(deviceAddress, params) {
	db.query("SELECT device_address FROM push_registrations WHERE device_address=? LIMIT 0,1", [deviceAddress], function(rows) {
		if (rows.length === 0) {
			db.query("INSERT "+db.getIgnore()+" INTO push_registrations (registrationId, device_address, platform) VALUES (?, ?, ?)", [params.registrationId, deviceAddress, params.platform], function() {

			});
		} else if (rows.length) {
			if (rows[0].registration_id !== registrationId) {
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

function sendRest(registrationIds) {
	var options = {
		host: 'android.googleapis.com',
		port: 443,
		path: '/gcm/send',
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
			"title": "Byteball",
			"vibrate": 1,
			"sound": 1
		}
	}));
	req.end();

	req.on('error', function(e) {
		console.error(e);
	});
}

function sendAPNS(registrationId) {
	var note = new apn.Notification();

	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = 1;
	note.sound = "ping.aiff";
	note.alert = "New message";
	note.payload = {'messageFrom': 'Byteball'};
	note.topic = "org.byteball.wallet";

	apnProvider.send(note, registrationId).then((result) => {
	}, function(err) {
		console.error(err);
    });
}

function sendPushAboutMessage(device_address) {
	db.query("SELECT registrationId, platform FROM push_registrations WHERE device_address=?", [device_address], function(rows) {
		if (rows.length > 0) {
			switch (rows[0].platform) {
				case "android":
					sendRest([rows[0].registrationId]);
					break;
				case "ios":
					sendAPNS(rows[0].registrationId);
					break;
			}
			
		}
	});
}

exports.sendPushAboutMessage = sendPushAboutMessage;