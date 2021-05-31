const db = require('ocore/db');
const conf = require('ocore/conf');
const eventBus = require('ocore/event_bus.js');

let arbstore_addresses = Object.keys(conf.arbstores);

// snipe for arbiter announces on arbstores
eventBus.on('mci_became_stable', async mci => {
	let rows = await db.query(
		`SELECT unit, payload, address
		FROM units
		JOIN messages USING(unit)
		JOIN unit_authors USING(unit)
		WHERE main_chain_index=? AND payload LIKE '{"address":%' AND address IN (?)`, [mci, arbstore_addresses]);
	rows.forEach(async row => {
		//let arbstore_url = conf.arbstores[row.address];
		let arbiter_address = row.payload.match(/"address":"([^"]+)"/);
		if (!arbiter_address)
			return;
		db.query("SELECT arbiter_address FROM arbiter_locations WHERE arbiter_address=?", [arbiter_address[1]], rows => {
			if (!rows.length)
				db.query("INSERT INTO arbiter_locations (arbiter_address, arbstore_address, unit) VALUES (?, ?, ?)", [arbiter_address[1], row.address, row.unit]);
			else
				db.query("UPDATE arbiter_locations SET arbstore_address = ?, unit = ? WHERE arbiter_address = ?", [row.address, row.unit, arbiter_address[1]]);
		});
	});
});
