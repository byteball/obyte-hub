const db = require('ocore/db');
const conf = require('ocore/conf');
const eventBus = require('ocore/event_bus.js');

let arbiter_addresses = Object.keys(conf.ArbRegistries);

// snipe for arbiter announces on ArbStores
eventBus.on('mci_became_stable', async mci => {
	let rows = await db.query(
		`SELECT unit, payload, address
		FROM units
		JOIN messages USING(unit)
		JOIN unit_authors USING(unit)
		WHERE main_chain_index=? AND payload LIKE '{"address":%' AND address IN (?)`, [mci, arbiter_addresses]);
	rows.forEach(async row => {
		//let arbstore_url = conf.ArbRegistries[row.address];
		let arbiter_address = row.payload.match(/"address":"([^"]+)"/);
		if (!arbiter_address)
			return;
		db.query("INSERT INTO arbiter_locations (arbiter_address, arbstore_address, unit) VALUES (?, ?, ?)", [arbiter_address, row.address, row.unit]);
	});
});
