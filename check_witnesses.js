/*jslint node: true */
"use strict";
var db = require('byteballcore/db.js');
var storage = require('byteballcore/storage.js');
var mail = require('byteballcore/mail.js');
var conf = require('byteballcore/conf.js');

function notifyAdmin(message){
	write(message);
	if (!conf.admin_email || !conf.from_email)
		return write('cannot notify admin as admin_email or from_email are not defined');
	mail.sendmail({
		to: conf.admin_email,
		from: conf.from_email,
		subject: message,
		body: 'Check witnesses:\n'+message
	});
}

function write(str){
	console.log(Date().toString()+': '+str);
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
			notifyAdmin('Missing witnesses: '+arrMissingWitnesses.join(', '));
			process.exit(0);
		}
	);
});
