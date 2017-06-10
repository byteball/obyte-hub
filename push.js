var db = require('byteballcore/db');
var conf = require('byteballcore/conf');
var eventBus = require('byteballcore/event_bus.js');
var https = require('https');


eventBus.on('peer_sent_new_message', function(ws, objDeviceMessage) {
	sendPushAboutMessage(objDeviceMessage.to);
});

eventBus.on("enableNotification", function(deviceAddress, registrationId) {
	db.query("SELECT device_address FROM push_registrations WHERE device_address=? LIMIT 0,1", [deviceAddress], function(rows) {
		if (rows.length === 0) {
			db.query("INSERT "+db.getIgnore()+" INTO push_registrations (registrationId, device_address) VALUES (?, ?)", [registrationId, deviceAddress], function() {

			});
		} else if (rows.length) {
			if (rows[0].registration_id !== registrationId) {
				db.query("UPDATE push_registrations SET registrationId = ? WHERE device_address = ?", [registrationId, deviceAddress], function() {

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

function sendPushAboutMessage(device_address) {
	db.query("SELECT registrationId FROM push_registrations WHERE device_address=?", [device_address], function(rows) {
		if (rows.length > 0) {
			sendRest([rows[0].registrationId]);
		}
	});
}

exports.sendPushAboutMessage = sendPushAboutMessage;