/*jslint node: true */
'use strict';
const async = require('async');
const request = require('request');
const eventBus = require('ocore/event_bus.js');
const network = require('ocore/network.js');

const symbols = ['USDT-BTC', 'BTC-GBYTE'];
const rates = {};

function updateBittrexRates(state, onDone) {
	const apiUri = 'https://bittrex.com/api/v1.1/public/getmarketsummaries';
	request(apiUri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let arrCoinInfos = JSON.parse(body).result;
			let prices = {};
			arrCoinInfos.forEach(coinInfo => {
				if (!coinInfo.Last)
					return;
				if (symbols.includes(coinInfo.MarketName)) {
					prices[coinInfo.MarketName] = coinInfo.Last;
					console.log("new exchange rate: " + coinInfo.MarketName + "=" + coinInfo.Last);
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
			console.log("Can't get currency rates from bittrex");
		}
		onDone();
	});
}

function updateFreebeRates(state, onDone) {
	const apiUri = 'http://freebe.byte-ball.com/last';
	request(apiUri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("freebe: ", body);
			let price;
			try{
				price = parseFloat(JSON.parse(body).price_bytes);
				console.log("GBB/GB = "+price);
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
			console.log("Can't get currency rates from freebe");
		}
		onDone();
	});
}

function updateFutureRates(state, onDone) {
	// transactions.json is more up-to-date than ticker.json
	const apiUri = 'https://cryptox.pl/api/FUTUREBTC/transactions.json';
	request(apiUri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("cryptox: ", body);
			let price;
			try{
				price = parseFloat(JSON.parse(body)[0].price);
				console.log("FUTURE/BTC = "+price);
			}
			catch(e){
				console.log('bad response from cryptox:', e);
				return onDone();
			}
			if (rates['BTC_USD'] && price) {
				rates['NMuNvOJRO2ZY9L17uKtsa7OYkgsV8LfSBIV9BUoVJPQ=_BTC'] = price;
				rates['NMuNvOJRO2ZY9L17uKtsa7OYkgsV8LfSBIV9BUoVJPQ=_USD'] = rates['BTC_USD'] * price;
				state.updated = true;
			}
			if (rates['GBYTE_BTC'] && price) {
				rates['NMuNvOJRO2ZY9L17uKtsa7OYkgsV8LfSBIV9BUoVJPQ=_GBYTE'] = price / rates['GBYTE_BTC'];
				state.updated = true;
			}
		}
		else {
			console.log("Can't get currency rates from cryptox");
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
			updateFreebeRates(state, cb);
		},
		function(cb){
			updateFutureRates(state, cb);
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
