/*jslint node: true */
"use strict";
var db = require('ocore/db.js');
var storage = require('ocore/storage.js');
var mail = require('ocore/mail.js');
var conf = require('ocore/conf.js');

function notifyAdmin(message, to){
	write(message);
	if (!conf.admin_email || !conf.from_email)
		return write('cannot notify admin as admin_email or from_email are not defined');
	mail.sendmail({
		to: to,
		from: conf.from_email,
		subject: message,
		body: 'Check witnesses:\n'+message
	});
}

function write(str){
	console.log(new Date().toISOString()+': '+str);
}


storage.readLastMainChainIndex(function(last_mci){
	db.query(
		"SELECT my_witnesses.address \n\
		FROM my_witnesses \n\
		LEFT JOIN ( \n\
			SELECT DISTINCT address \n\
			FROM units CROSS JOIN unit_authors USING(unit) CROSS JOIN my_witnesses USING(address) \n\
			WHERE main_chain_index>? OR main_chain_index IS NULL OR units.creation_date>"+db.addTime('-30 MINUTE')+" \n\
		) AS active_witnesses USING(address) \n\
		WHERE active_witnesses.address IS NULL",
		[last_mci - 100],
		function(rows){
			if (rows.length === 0)
				return process.exit(0);
			var arrMissingWitnesses = rows.map(row => row.address);
			notifyAdmin('Missing witnesses: '+arrMissingWitnesses.join(', '), conf.admin_email);
			for (let addr of arrMissingWitnesses)
				if (conf.witnessAdmins && conf.witnessAdmins[addr])
					notifyAdmin('Missing witness: ' + addr, conf.witnessAdmins[addr]);
			process.exit(0);
		}
	);
});
