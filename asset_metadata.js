/*jslint node: true */
'use strict';
const conf = require('byteballcore/conf.js');
const eventBus = require('byteballcore/event_bus.js');
const network = require('byteballcore/network.js');
const storage = require('byteballcore/storage.js');
const db = require('byteballcore/db.js');
const mail = require('byteballcore/mail.js');
const validationUtils = require('byteballcore/validation_utils.js');

const arrRegistryAddresses = Object.keys(conf.trustedRegistries);
network.setWatchedAddresses(arrRegistryAddresses);

function handlePotentialAssetMetadataUnit(unit){
	storage.readJoint(db, unit, {
		ifNotFound: function(){
			throw Error("unit "+unit+" not found");
		},
		ifFound: function(objJoint){
			let objUnit = objJoint.unit;
			let arrAuthorAddresses = objUnit.authors.map(author => author.address);
			if (arrAuthorAddresses.length !== 1)
				return console.log("ignoring multi-authored unit "+unit);
			let registry_address = arrAuthorAddresses[0];
			let registry_name = conf.trustedRegistries[registry_address];
			if (!registry_name)
				return console.log("not authored by registry: "+unit);
			let arrAssetMetadataPayloads = [];
			objUnit.messages.forEach(message => {
				if (message.app !== 'data')
					return;
				let payload = message.payload;
				if (!payload.asset || !payload.name)
					return console.log("found data payload that is not asset metadata");
				arrAssetMetadataPayloads.push(payload);
			});
			if (arrAssetMetadataPayloads.length === 0)
				return console.log("no asset metadata payload found");
			if (arrAssetMetadataPayloads.length > 1)
				return console.log("multiple asset metadata payloads not supported, found "+arrAssetMetadataPayloads.length);
			let payload = arrAssetMetadataPayloads[0];
			if ("decimals" in payload && !validationUtils.isNonnegativeInteger(payload.decimals))
				return console.log("invalid decimals in asset metadata of unit "+unit);
			let suffix = null;
			db.query("SELECT 1 FROM assets WHERE unit=?", [payload.asset], rows => {
				if (rows.length === 0)
					return console.log("asset "+payload.asset+" not found");
				db.query("SELECT 1 FROM asset_metadata WHERE name=? AND registry_address!=?", [payload.name, registry_address], rows => {
					if (rows.length > 0) // maybe more than one
						suffix = registry_name;
					db.query("SELECT asset FROM asset_metadata WHERE name=? AND registry_address=?", [payload.name, registry_address], rows => {
						if (rows.length > 0){ // maybe more than one
							let bSame = (rows[0].asset === payload.asset);
							if (bSame)
								return mail.sendBugEmail("asset "+payload.asset+" already registered by the same registry "+registry_address+" by the same name "+payload.name);
							else
								return mail.sendBugEmail("registry "+registry_address+" attempted to register the same name "+payload.name+" under another asset "+payload.asset+" while the name is already assigned to "+rows[0].asset);
						}
						db.query("SELECT name, registry_address FROM asset_metadata WHERE asset=?", [payload.asset], rows => {
							if (rows.length > 0)
								return mail.sendBugEmail("registry "+registry_address+" attempted to register asset "+payload.asset+" again, old name "+rows[0].name+" by "+rows[0].registry_address+", new name "+payload.name);
							db.query(
								"INSERT INTO asset_metadata (asset, metadata_unit, registry_address, suffix, name, decimals) VALUES (?,?,?, ?,?,?)", 
								[payload.asset, unit, registry_address, suffix, payload.name, payload.decimals]
							);
						});
					});
				});
			});
		}
	});
}

function scanPastMetadataUnits(){
	db.query("SELECT unit FROM unit_authors WHERE address IN(?)", [arrRegistryAddresses], rows => {
		let arrUnits = rows.map(row => row.unit);
		arrUnits.forEach(handlePotentialAssetMetadataUnit);
	});
}

eventBus.on('my_transactions_became_stable', function(arrUnits){
	console.log("units that affect watched addresses: "+arrUnits.join(', '));
	arrUnits.forEach(handlePotentialAssetMetadataUnit);
});

//scanPastMetadataUnits();

