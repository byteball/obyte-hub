const db = require('ocore/db');
const conf = require('ocore/conf');
const eventBus = require('ocore/event_bus.js');
const validationUtils = require('ocore/validation_utils.js');

const arbstore_addresses = Object.keys(conf.arbstores || {});
if (arbstore_addresses.length > 0) {
	// snipe for arbiter announces on arbstores
	async function checkForArbiterAnnouncements(mci) {
		const rows = await db.query(
			`SELECT unit, payload, address
			FROM units
			CROSS JOIN messages USING(unit)
			CROSS JOIN unit_authors USING(unit)
			WHERE main_chain_index=? AND app='data' AND payload LIKE '{"address":%' AND address IN (?)`,
			[mci, arbstore_addresses]
		);
		for (let { unit, payload, address: arbstore_address } of rows) {
			//let arbstore_url = conf.arbstores[arbstore_address];
			const matches = payload.match(/"address":"([^"]+)"/);
			if (!matches) {
				console.log('arbiter address not found in payload', payload, 'of unit', unit, 'from', arbstore_address);
				continue;
			}
			const arbiter_address = matches[1];
			if (!validationUtils.isValidAddress(arbiter_address)) {
				console.log('invalid arbiter address', arbiter_address, 'in', unit, 'from', arbstore_address);
				continue;
			}
			const [existing_record] = await db.query("SELECT arbiter_address FROM arbiter_locations WHERE arbiter_address=?", [arbiter_address]);
			if (!existing_record)
				await db.query("INSERT INTO arbiter_locations (arbiter_address, arbstore_address, unit) VALUES (?, ?, ?)", [arbiter_address, arbstore_address, unit]);
			else
				await db.query("UPDATE arbiter_locations SET arbstore_address = ?, unit = ? WHERE arbiter_address = ?", [arbstore_address, unit, arbiter_address]);
		}
	}
	eventBus.on('mci_became_stable', checkForArbiterAnnouncements);
}
