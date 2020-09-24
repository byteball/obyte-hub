/*jslint node: true */
'use strict';
const async = require('async');
const request = require('request');
const eventBus = require('ocore/event_bus.js');
const network = require('ocore/network.js');
require("tls").DEFAULT_ECDH_CURVE = "auto"; // fix for Node 8

const symbols = ['USDT-BTC', 'BTC-GBYTE'];
const rates = {};

function updateBittrexRates(state, onDone) {
	const apiUri = 'https://bittrex.com/api/v1.1/public/getmarketsummaries';
	request(apiUri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let arrCoinInfos;
			try {arrCoinInfos = JSON.parse(body).result;} catch(e){}
			if (!arrCoinInfos) {
				console.log('bad rates from bittrex');
				return onDone();
			}
			let prices = {};
			arrCoinInfos.forEach(coinInfo => {
				if (!coinInfo.Last)
					return;
				if (symbols.includes(coinInfo.MarketName)) {
					prices[coinInfo.MarketName] = coinInfo.Last;
					console.log("new exchange rate: " + coinInfo.MarketName + " = " + coinInfo.Last);
				}
			});
			if (Object.keys(prices).length == symbols.length) {
				rates['BTC_USD'] = prices['USDT-BTC'];
				rates['GBYTE_BTC'] = prices['BTC-GBYTE'];
				rates['GBYTE_USD'] = prices['BTC-GBYTE'] * prices['USDT-BTC'];
				state.updated = true;
			}
		}
		else {
			console.error("Can't get currency rates from bittrex", error, body);
		}
		onDone();
	});
}

function updateOstableRates(state, onDone) {
	const apiUri = 'https://data.ostable.org/api/v1/summary';
	request(apiUri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let arrCoinInfos;
			try {arrCoinInfos = JSON.parse(body);} catch(e){}
			if (!arrCoinInfos) {
				console.log('bad rates from ostable');
				return onDone();
			}
			arrCoinInfos.forEach(coinInfo => {
				if (!coinInfo.last_price || coinInfo.quote_id !== 'base' || coinInfo.base_id === 'base')
					return;
				rates[coinInfo.base_id +'_GBYTE'] = coinInfo.last_price;
				console.log("new exchange rate: " + coinInfo.market_name + " = " + coinInfo.last_price);
				if (rates['GBYTE_BTC']) {
					rates[coinInfo.base_id +'_BTC'] = rates['GBYTE_BTC'] * coinInfo.last_price;
				}
				if (rates['GBYTE_USD']) {
					rates[coinInfo.base_id +'_USD'] = rates['GBYTE_USD'] * coinInfo.last_price;
				}
				state.updated = true;
			});
		}
		else {
			console.error("Can't get currency rates from ostable", error, body);
		}
		onDone();
	});
}

function updateFreebeRates(state, onDone) {
	const apiUri = 'https://blackbytes.io/last';
	request(apiUri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let price;
			try{
				price = parseFloat(JSON.parse(body).price_bytes);
				console.log("new exchange rate: GBB/GB = " + price);
			}
			catch(e){
				console.log('bad response from freebe:', e);
				return onDone();
			}
			if (rates['GBYTE_USD'] && price) {
				rates['GBB_GBYTE'] = price;
				rates['GBB_USD'] = rates['GBYTE_USD'] * price;
				state.updated = true;
			}
			if (rates['GBYTE_BTC'] && price) {
				rates['GBB_BTC'] = rates['GBYTE_BTC'] * price;
				state.updated = true;
			}
		}
		else {
			console.error("Can't get currency rates from freebe", error, body);
		}
		onDone();
	});
}

function updateBTC_20200701Rates(state, onDone) {
	// transactions.json is more up-to-date than ticker.json
	const apiUri = 'https://cryptox.pl/api/BTC_20200701BTC/transactions.json';
	request(apiUri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let price;
			try{
				price = parseFloat(JSON.parse(body)[0].price);
				console.log("new exchange rate: BTC_20200701/BTC = " + price);
			}
			catch(e){
				console.log('bad response from cryptox:', e);
				return onDone();
			}
			if (rates['BTC_USD'] && price) {
				rates['ZVuuh5oWAJnISvtOFdzHAa7QTl/CG7T2KDfAGB4qSxk=_BTC'] = price;
				rates['ZVuuh5oWAJnISvtOFdzHAa7QTl/CG7T2KDfAGB4qSxk=_USD'] = rates['BTC_USD'] * price;
				state.updated = true;
			}
			if (rates['GBYTE_BTC'] && price) {
				rates['ZVuuh5oWAJnISvtOFdzHAa7QTl/CG7T2KDfAGB4qSxk=_GBYTE'] = price / rates['GBYTE_BTC'];
				state.updated = true;
			}
		}
		else {
			console.error("Can't get currency rates from cryptox", error, body);
		}
		onDone();
	});
}

function updateRates(){
	let state = {updated: false};
	async.series([
		function(cb){
			updateBittrexRates(state, cb);
		},
		function(cb){
			updateOstableRates(state, cb);
		},
		function(cb){
			updateFreebeRates(state, cb);
		},
		function(cb){
			updateBTC_20200701Rates(state, cb);
		}
	], function(){
		console.log(rates);
		if (state.updated)
			broadcastNewRates();
	});
}

function broadcastNewRates(){
	network.sendAllInboundJustsaying('exchange_rates', rates);
}

eventBus.on('client_logged_in', function(ws){
	if (Object.keys(rates).length > 0)
		network.sendJustsaying(ws, 'exchange_rates', rates);
});

updateRates();
setInterval(updateRates, 1000 * 60 * 5);

exports.rates = rates;
