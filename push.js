var db = require('byteballcore/db');
var conf = require('byteballcore/conf');
var eventBus = require('byteballcore/event_bus.js');
var https = require('https');
var bReady = false;


eventBus.on('peer_sent_new_message', function(ws, objDeviceMessage) {
	sendPushAboutMessage(objDeviceMessage.to);
});

eventBus.on("enableNotification", function(ws, params) {
	db.query("SELECT address FROM push WHERE address=? LIMIT 0,1", [params.deviceAddress], function(rows) {
		if (rows.length === 0) {
			db.query("INSERT INTO push (registrationId, address) VALUES (?, ?)", [params.registrationId, params.deviceAddress], function() {

			});
		} else if (rows.length) {
			if (rows[0].registration_id !== params.registrationId) {
				db.query("UPDATE push SET registrationId = ? WHERE address = ?", [params.registrationId, params.deviceAddress], function() {

				})
			}
		}
	});
});

eventBus.on("disableNotification", function(ws, params) {
	db.query("DELETE FROM push WHERE registrationId=? and address=?", [params.registrationId, params.deviceAddress], function() {
		
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

function sendPushAboutMessage(address) {
	if (bReady) {
		db.query("SELECT registrationId FROM push WHERE address=?", [address], function(rows) {
			if (rows.length > 0) {
				sendRest(rows.map(function(row) {
					return row.registrationId;
				}));
			}
		});
	}
}

exports.sendPushAboutMessage = sendPushAboutMessage;

exports.init = function() {
	db.query("SELECT name FROM sqlite_master WHERE name='push' and type='table'", function(rows) {
		if (rows.length > 0) {
			bReady = true;
		} else {
			db.query("CREATE TABLE IF NOT EXISTS push (registrationId TEXT, address TEXT)", function() {
				db.query("CREATE INDEX byPushAddress ON push(address)", function() {
					bReady = true;
				});
			});
		}
	});
};